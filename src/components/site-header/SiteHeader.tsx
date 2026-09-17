import { useEffect, useState, type RefObject } from "react";
import { motion } from "motion/react";
import { useScrollProgress } from "../../hooks/useScrollProgress";
import { cn } from "../../lib/cn";
import { HeaderBar } from "./HeaderBar";

/** 플로팅 필이 화면 좌우 여백과 거리를 두는 간격(px). */
const EDGE_GAP = 16;
/** 플로팅 상태에서의 필 최대 너비(px). */
const PILL_MAX_WIDTH = 720;
/** 히어로 런웨이에서 이 진행도를 지나면 헤더가 분리된다. */
const DETACH_PROGRESS = 0.9;

/** 물방울이 떨어지듯 히어로 아래에서 필이 성큼 떨어지는 spring. */
const DETACH_SPRING = { type: "spring", stiffness: 320, damping: 24, mass: 0.9 } as const;

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
  const floating = progress >= DETACH_PROGRESS;
  const [viewportWidth, setViewportWidth] = useState(() => window.innerWidth);

  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const width = floating
    ? Math.min(PILL_MAX_WIDTH, viewportWidth - EDGE_GAP * 2)
    : viewportWidth;

  return (
    <motion.header
      initial={false}
      animate={{ y: floating ? EDGE_GAP : 0 }}
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
