import { useEffect, useState, type RefObject } from "react";

const EPSILON = 0.0005;

/**
 * ref 요소가 스크롤 런웨이인 동안의 진행도(0~1)를 반환한다.
 * 런웨이 = 요소 높이 - 뷰포트 높이. 스크롤을 rAF로 스로틀하고,
 * 변화량이 임계값 이하면 리렌더를 생략한다.
 */
export function useScrollProgress(ref: RefObject<HTMLElement | null>): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) {
        setProgress(0);
        return;
      }
      const next = Math.min(1, Math.max(0, window.scrollY / total));
      setProgress((prev) => (Math.abs(prev - next) < EPSILON ? prev : next));
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref]);

  return progress;
}
