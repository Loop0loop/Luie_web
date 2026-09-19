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

/**
 * 런웨이 진행도가 threshold를 넘었는지의 파생 boolean만 구독한다.
 * 연속 진행도를 구독하는 것(rerender-derived-state 위반)과 달리
 * 임계값을 통과할 때만 리렌더한다 — 헤더 플로팅 전환용.
 */
export function useScrolledPast(
  ref: RefObject<HTMLElement | null>,
  threshold: number,
): boolean {
  const [past, setPast] = useState(false);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const total = el.offsetHeight - window.innerHeight;
      const next = total > 0 ? window.scrollY / total >= threshold : false;
      setPast((prev) => (prev === next ? prev : next));
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
  }, [ref, threshold]);

  return past;
}
