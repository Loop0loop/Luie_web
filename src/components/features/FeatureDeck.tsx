import { lazy, Suspense, useState } from "react";
import { motion } from "motion/react";
import { useI18n } from "../../i18n";
import { cn } from "../../lib/cn";
import { DemoStage } from "./DemoStage";
import { LuieDemoGate } from "./LuieDemoGate";

/* 데모는 실제 Luie renderer 코드(무겁다)라 활성 카드에 처음 마운트될 때 로드 —
   히어로 초기 로드에는 영향이 없다. */
const SnapshotDemo = lazy(() => import("./demos/SnapshotDemo"));
const SmartLinkDemo = lazy(() => import("./demos/SmartLinkDemo"));
const ResearchDemo = lazy(() => import("./demos/ResearchDemo"));
const StorylineDemo = lazy(() => import("./demos/StorylineDemo"));

const CARDS = [
  { id: "snapshot", Demo: SnapshotDemo },
  { id: "smartLink", Demo: SmartLinkDemo },
  { id: "research", Demo: ResearchDemo },
  { id: "storyline", Demo: StorylineDemo },
] as const;

/** 뒤에 겹치는 카드 — 데모를 내리지 않고 앱 창 실루엣만 보여준다. */
function CardBackdrop() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-12 shrink-0 items-center gap-2 border-b border-border bg-panel px-4">
        <span className="size-2.5 rounded-full bg-element" />
        <span className="size-2.5 rounded-full bg-element" />
        <span className="size-2.5 rounded-full bg-element" />
      </div>
      <div className="flex-1 bg-app p-8">
        <div className="h-3 w-2/3 rounded-full bg-element" />
        <div className="mt-6 space-y-3">
          <div className="h-2.5 w-full rounded-full bg-element" />
          <div className="h-2.5 w-5/6 rounded-full bg-element" />
          <div className="h-2.5 w-4/6 rounded-full bg-element" />
        </div>
      </div>
    </div>
  );
}

/**
 * 02 기능 쇼케이스 — 좌측 기능별 빅 폰트 카피, 우측 4장 카드 덱(활성 카드만
 * 실제 Luie renderer UI 마운트), 하단 세그먼트 토글. 뒷카드를 클릭해도 앞으로 온다.
 */
export function FeatureDeck() {
  const t = useI18n();
  const [active, setActive] = useState(0);
  const activeCard = CARDS[active];

  return (
    <div className="grid w-full max-w-[1240px] items-center gap-10 lg:grid-cols-[minmax(300px,4fr)_minmax(0,6fr)] lg:gap-16">
      {/* 좌측 — 기능별로 교체되는 빅 폰트 + 서브 카피.
          AnimatePresence의 exit가 간헐적으로 완료되지 않아 텍스트가 멈추는
          (motion v13) 문제가 있어 key 리마운트 + 페이드인으로 전환한다. */}
      <div className="order-2 lg:order-1">
        <p className="text-sm font-medium tracking-[0.2em] text-accent-soft">
          {t.showcase.overline}
        </p>
        <div className="mt-4 min-h-[2.3em]">
          <motion.h2
            key={activeCard.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-[clamp(2.4rem,4.6vw,4rem)] font-bold leading-[1.1] tracking-[-0.02em] text-foreground"
          >
            {t.showcase.tabs[activeCard.id]}
          </motion.h2>
        </div>
        <motion.p
          key={`${activeCard.id}-sub`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.06 }}
          className="mt-4 max-w-[380px] text-base leading-relaxed text-muted"
        >
          {t.showcase.sub[activeCard.id]}
        </motion.p>
      </div>

      {/* 우측 — 4장 카드 덱 + 토글 */}
      <div className="order-1 lg:order-2">
        <div className="relative aspect-[16/10] w-full">
          {CARDS.map((card, i) => {
            const offset = (i - active + CARDS.length) % CARDS.length;
            const Demo = card.Demo;
            return (
              <motion.div
                key={card.id}
                onClick={() => setActive(i)}
                animate={{
                  x: offset * 22,
                  y: offset * -22,
                  scale: 1 - offset * 0.045,
                  opacity: 1 - offset * 0.14,
                }}
                transition={{ type: "spring", stiffness: 240, damping: 28 }}
                style={{ zIndex: CARDS.length - offset }}
                className="absolute inset-0 cursor-pointer overflow-hidden rounded-2xl border border-border bg-panel shadow-panel"
              >
                {offset === 0 ? (
                  <LuieDemoGate>
                    <DemoStage>
                      <Suspense fallback={null}>
                        <Demo />
                      </Suspense>
                    </DemoStage>
                  </LuieDemoGate>
                ) : (
                  <CardBackdrop />
                )}
              </motion.div>
            );
          })}
          {/* 실제 화면 배지 — 덱 프레임에 고정(카드 전환과 무관) */}
          <span className="pointer-events-none absolute -top-3 left-5 z-50 rounded-full border border-line bg-surface px-3 py-1 text-[11px] font-medium text-muted shadow-panel">
            {t.showcase.badge}
          </span>
        </div>

        {/* 세그먼트 토글 */}
        <div className="mt-7 flex justify-center">
          <div
            role="tablist"
            aria-label={t.showcase.overline}
            className="flex gap-1 rounded-full border border-line bg-surface p-1"
          >
            {CARDS.map((card, i) => (
              <button
                key={card.id}
                type="button"
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className={cn(
                  "relative rounded-full px-4 py-1.5 text-sm transition-colors duration-200",
                  i === active
                    ? "text-on-accent"
                    : "text-muted hover:text-foreground",
                )}
              >
                {i === active && (
                  <motion.span
                    layoutId="featureDeckTab"
                    className="absolute inset-0 rounded-full bg-accent"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative font-medium">
                  {t.showcase.tabs[card.id]}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
