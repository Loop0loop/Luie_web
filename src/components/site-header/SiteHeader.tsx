import { useEffect, useState, type RefObject } from "react";
import { motion } from "motion/react";
import { useScrollProgress } from "../../hooks/useScrollProgress";
import { HeaderBar } from "./HeaderBar";

/** 플로팅 필이 화면 좌우 여백과 거리를 두는 간격(px). */
const EDGE_GAP = 16;
/** 플로팅 상태에서의 필 최대 너비(px). */
const PILL_MAX_WIDTH = 720;
/** 히어로 런웨이에서 이 진행도를 지나면 헤더가 분리된다. */
const DETACH_PROGRESS = 0.9;

/** 상태별 시각 값 — motion이 두 상태 사이를 spring으로 보간한다. */
const STYLE = {
  bar: {
    height: 64,
    borderRadius: 0,
    backgroundColor: "rgba(26, 26, 28, 0.55)",
    boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
  },
  pill: {
    height: 52,
    borderRadius: 999,
    backgroundColor: "rgba(33, 33, 35, 0.72)",
    boxShadow: "0 12px 40px -12px rgba(0, 0, 0, 0.5)",
  },
} as const;

/** 물방울이 떨어지듯 히어로 아래에서 필이 성큼 떨어지는 spring. */
const DETACH_SPRING = { type: "spring", stiffness: 320, damping: 24, mass: 0.9 } as const;

type SiteHeaderProps = {
  /** 히어로 섹션 ref. 런웨이 진행도 측정에 쓰인다. */
  heroRef: RefObject<HTMLElement | null>;
};

/**
 * 단일 fixed 헤더. 최상단에서는 100% 너비 + 반투명 배경의 일반 바,
 * 히어로를 지나면 물방울 떨어지듯 spring에 이끌려 중앙 플로팅 필로 변형된다.
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
          height: floating ? STYLE.pill.height : STYLE.bar.height,
          borderRadius: floating ? STYLE.pill.borderRadius : STYLE.bar.borderRadius,
          backgroundColor: floating
            ? STYLE.pill.backgroundColor
            : STYLE.bar.backgroundColor,
          boxShadow: floating ? STYLE.pill.boxShadow : STYLE.bar.boxShadow,
        }}
        transition={DETACH_SPRING}
        className="border border-line backdrop-blur-xl"
      >
        <HeaderBar floating={floating} />
      </motion.div>
    </motion.header>
  );
}
