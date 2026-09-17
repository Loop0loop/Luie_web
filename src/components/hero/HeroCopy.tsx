import { motion, useReducedMotion } from "motion/react";
import { Button } from "../ui/Button";
import { DownloadIcon } from "../ui/icons";
import { TypingText } from "./TypingText";

const TYPING_PHRASES = ["새로운 집필을 시작해보세요."] as const;
// 렌더마다 새 배열이 만들어지면 TypingText 이펙트가 재시작하므로 참조를 고정한다.
const PHRASES: string[] = [...TYPING_PHRASES];

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
        이야기를 시작해보세요
      </motion.h1>

      <motion.p variants={ITEM_VARIANTS} className="mt-5 flex h-8 items-center text-lg text-muted">
        <TypingText phrases={PHRASES} />
      </motion.p>

      <motion.p variants={ITEM_VARIANTS} className="mt-3 text-sm text-subtle">
        macOS · Windows 무료 — 원고는 언제나 내 컴퓨터에
      </motion.p>

      <motion.div
        variants={ITEM_VARIANTS}
        className="mt-8 flex flex-col items-center gap-3 sm:flex-row"
      >
        <Button size="lg" href="#download">
          <DownloadIcon />
          다운로드
        </Button>
        <Button size="lg" variant="ghost" href="#features">
          Luie 살펴보기
        </Button>
      </motion.div>
    </motion.div>
  );
}
