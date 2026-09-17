import { useEffect, useState, type RefObject } from "react";

/**
 * 히어로 런웨이의 스크롤 픽셀 구간(0 → range)을 측정한다.
 * useScroll({ target })의 오프셋 계산이 환경에 따라 불안정하므로
 * 창 scrollY와 픽셀 범위만으로 진행도를 만든다. 레이아웃 변화에 재측정한다.
 */
export function useHeroRunwayRange(ref: RefObject<HTMLElement | null>): number {
  const [range, setRange] = useState(1);

  useEffect(() => {
    const measure = () => {
      const el = ref.current;
      if (!el) return;
      setRange(Math.max(1, el.offsetHeight - window.innerHeight));
    };
    measure();
    const resizeObserver = new ResizeObserver(measure);
    if (ref.current) resizeObserver.observe(ref.current);
    window.addEventListener("resize", measure);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [ref]);

  return range;
}
