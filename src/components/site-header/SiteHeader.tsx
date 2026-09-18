import { useEffect, useState, type RefObject } from "react";
import { motion } from "motion/react";
import { useScrollProgress } from "../../hooks/useScrollProgress";
import {
  HEADER_DETACH_PROGRESS,
  HEADER_EDGE_GAP_PX,
  HEADER_MORPH_MIN_DURATION_S,
  HEADER_PILL_MAX_WIDTH_PX,
} from "../../lib/constants";
import { cn } from "../../lib/cn";
import { HeaderBar } from "./HeaderBar";

/**
 * 바→플로팅 필 모프 spring. duration 파라미터 스프링이라 급스크롤로 트리거가
 * 점프해도 모프는 최소 HEADER_MORPH_MIN_DURATION_S에 걸쳐 진행된다.
 */
const DETACH_SPRING = {
  type: "spring",
  duration: HEADER_MORPH_MIN_DURATION_S,
  bounce: 0.3,
} as const;

type SiteHeaderProps = {
  /** 히어로 섹션 ref. 런웨이 진행도 측정에 쓰인다. */
  heroRef: RefObject<HTMLElement | null>;
};

/**
 * 단일 fixed 헤더. 최상단에서는 100% 너비 + 반투명 배경의 일반 바,
 * 히어로를 지나면 물방울 떨어지듯 spring에 이끌려 리퀴드 글래스 플로팅 필로 변형된다.
 */
export function SiteHeader({ heroRef }: SiteHeaderProps) {
  const progress = useScrollProgress(heroRef);
  const floating = progress >= HEADER_DETACH_PROGRESS;
  const [viewportWidth, setViewportWidth] = useState(() => window.innerWidth);

  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const width = floating
    ? Math.min(HEADER_PILL_MAX_WIDTH_PX, viewportWidth - HEADER_EDGE_GAP_PX * 2)
    : viewportWidth;

  return (
    <motion.header
      initial={false}
      animate={{ y: floating ? HEADER_EDGE_GAP_PX : 0 }}
      transition={DETACH_SPRING}
      className="fixed inset-x-0 top-0 z-50 flex justify-center"
    >
      <motion.div
        initial={false}
        animate={{
          width,
          height: floating ? 52 : 64,
          borderRadius: floating ? 999 : 0,
        }}
        transition={DETACH_SPRING}
        className={cn(
          "relative overflow-hidden transition-[background-color,box-shadow,border-color] duration-300",
          "backdrop-blur-xl backdrop-saturate-150",
          floating ? "glass-pill" : "border-b border-line bg-background/55",
        )}
      >
        {/* 글래스 상단 specular — 리퀴드 글래스의 빛 굴절 하이라이트 */}
        {floating && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent"
          />
        )}
        <HeaderBar floating={floating} />
      </motion.div>
    </motion.header>
  );
}
