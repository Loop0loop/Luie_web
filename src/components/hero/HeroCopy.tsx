import { motion, useReducedMotion } from "motion/react";
import { useI18n } from "../../i18n";
import { Button } from "../ui/Button";
import { DownloadIcon } from "../ui/icons";
import { TypingText } from "./TypingText";

/** 페이지 진입 시 위→아래 순차 등장. */
const CONTAINER_VARIANTS = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
} as const;

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] },
  },
} as const;

export function HeroCopy() {
  const t = useI18n();
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      variants={CONTAINER_VARIANTS}
      initial={reducedMotion ? "show" : "hidden"}
      animate="show"
      className="flex h-full flex-col items-center justify-center px-6 pb-[22vh] text-center"
    >
      <motion.h1
        variants={ITEM_VARIANTS}
        className="text-[clamp(2.5rem,6vw,4.75rem)] leading-[1.1] font-bold tracking-[-0.03em] text-foreground"
      >
        {t.hero.headline}
      </motion.h1>

      <motion.p variants={ITEM_VARIANTS} className="mt-5 flex h-8 items-center text-lg text-muted">
        {/* 사전의 배열은 모듈 상수라 참조가 고정된다 — 이펙트가 재시작되지 않는다. */}
        <TypingText phrases={t.hero.typingPhrases} />
      </motion.p>

      <motion.p variants={ITEM_VARIANTS} className="mt-3 text-sm text-subtle">
        {t.hero.sub}
      </motion.p>

      <motion.div
        variants={ITEM_VARIANTS}
        className="mt-8 flex flex-col items-center gap-3 sm:flex-row"
      >
        <Button size="lg" href="#download">
          <DownloadIcon />
          {t.actions.download}
        </Button>
        <Button size="lg" variant="ghost" href="#features">
          {t.actions.explore}
        </Button>
      </motion.div>
    </motion.div>
  );
}
