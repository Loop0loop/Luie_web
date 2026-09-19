import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { getLocale, useI18n } from "../../i18n";
import { cn } from "../../lib/cn";

const CARDS = [
  { id: "snapshot" },
  { id: "smartLink" },
  { id: "research" },
  { id: "storyline" },
] as const;

type CardId = (typeof CARDS)[number]["id"];

/** 데모가 렌더되는 고정 논리 창 — 해상도와 무관하게 항상 같은 UI를 서빙한다.
 * 1440×900(16:10)은 카드의 aspect 비율과 정확히 일치해 폭 기준 스케일이
 * 꽉 차게 맞아떨어진다. */
const DEMO_LOGICAL_WIDTH = 1440;
const DEMO_LOGICAL_HEIGHT = 900;

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
 * 활성 카드 하나만 실제 Luie renderer 데모를 iframe(/demo 엔트리)으로 서빙한다.
 * iframe은 고정 논리 창(1440×900)으로 렌더하고 컨테이너 폭에 맞춰 스케일한다 —
 * 어떤 해상도에서도 동일한 UI 비율이 보인다. 테마·언어는 쿼리로 전달되고
 * 테마 변경은 iframe이 부모 속성을 구독해 따라간다.
 */
function DemoFrame({ card }: { card: CardId }) {
  const t = useI18n();
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const { width } = el.getBoundingClientRect();
      if (width === 0) return;
      setScale(width / DEMO_LOGICAL_WIDTH);
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative h-full w-full overflow-hidden bg-app">
      <iframe
        title={t.showcase.tabs[card]}
        src={`/demo/?card=${card}&lang=${getLocale()}`}
        className="absolute left-0 top-0 origin-top-left border-0 bg-app"
        style={{
          width: DEMO_LOGICAL_WIDTH,
          height: DEMO_LOGICAL_HEIGHT,
          transform: `scale(${scale})`,
        }}
      />
    </div>
  );
}

/**
 * 02 기능 쇼케이스 — 좌측 기능별 빅 폰트 카피, 우측 4장 카드 덱(활성 카드만
 * 실제 Luie renderer UI 마운트), 하단 세그먼트 토글. 뒷카드를 클릭해도 앞으로 온다.
 * 텍스트와 화면은 넉넉히 떨어뜨리고(30:70 + 넓은 gap), 화면이 주인공이다.
 */
export function FeatureDeck() {
  const t = useI18n();
  const [active, setActive] = useState(0);
  const activeCard = CARDS[active];
  // 큰 화면에서 카드가 커지는 만큼 덱 오프셋도 비례 확대 (적응형 스텝).
  const [spread, setSpread] = useState(
    () => (window.matchMedia("(min-width: 1536px)").matches ? 30 : 22),
  );

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1536px)");
    const onChange = () => setSpread(mq.matches ? 30 : 22);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <div className="grid w-full max-w-[1240px] items-center gap-10 lg:grid-cols-[minmax(280px,3fr)_minmax(0,7fr)] lg:gap-24 2xl:max-w-[1560px] 2xl:gap-32 min-[2300px]:max-w-[1840px]">
      {/* 좌측 — 기능별로 교체되는 빅 폰트 + 서브 카피.
          AnimatePresence의 exit가 간헐적으로 완료되지 않아 텍스트가 멈추는
          (motion v13) 문제가 있어 key 리마운트 + 페이드인으로 전환한다. */}
      <div className="order-2 lg:order-1">
        <p className="text-sm font-medium tracking-[0.2em] text-accent-soft 2xl:text-base">
          {t.showcase.overline}
        </p>
        <div className="mt-4 min-h-[2.3em]">
          <motion.h2
            key={activeCard.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-[clamp(2.4rem,4.6vw,6.75rem)] font-bold leading-[1.1] tracking-[-0.02em] text-foreground"
          >
            {t.showcase.tabs[activeCard.id]}
          </motion.h2>
        </div>
        <motion.p
          key={`${activeCard.id}-sub`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.06 }}
          className="mt-4 max-w-[380px] text-base leading-relaxed text-muted 2xl:max-w-[460px] 2xl:text-lg"
        >
          {t.showcase.sub[activeCard.id]}
        </motion.p>
      </div>

      {/* 우측 — 4장 카드 덱 + 토글 */}
      <div className="order-1 lg:order-2">
        <div className="relative aspect-[16/10] w-full">
          {CARDS.map((card, i) => {
            const offset = (i - active + CARDS.length) % CARDS.length;
            return (
              <motion.div
                key={card.id}
                onClick={() => setActive(i)}
                animate={{
                  x: offset * spread,
                  y: offset * -spread,
                  scale: 1 - offset * 0.045,
                  opacity: 1 - offset * 0.14,
                }}
                transition={{ type: "spring", stiffness: 240, damping: 28 }}
                style={{ zIndex: CARDS.length - offset }}
                className="absolute inset-0 cursor-pointer overflow-hidden rounded-2xl border border-border bg-panel shadow-panel"
              >
                {offset === 0 ? <DemoFrame card={card.id} /> : <CardBackdrop />}
              </motion.div>
            );
          })}
          {/* 실제 화면 배지 — 덱 프레임에 고정(카드 전환과 무관) */}
          <span className="pointer-events-none absolute -top-3 left-5 z-50 rounded-full border border-line bg-surface px-3 py-1 text-[11px] font-medium text-muted shadow-panel 2xl:text-xs">
            {t.showcase.badge}
          </span>
        </div>

        {/* 세그먼트 토글 */}
        <div className="mt-7 flex justify-center">
          <div
            role="tablist"
            aria-label={t.showcase.overline}
            className="flex gap-1 rounded-full border border-line bg-surface p-1 2xl:gap-1.5 2xl:p-1.5"
          >
            {CARDS.map((card, i) => (
              <button
                key={card.id}
                type="button"
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className={cn(
                  "relative rounded-full px-4 py-1.5 text-sm transition-colors duration-200 2xl:px-5 2xl:py-2 2xl:text-base",
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
