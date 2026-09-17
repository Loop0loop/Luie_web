import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/** 사용자가 동작 감소 설정을 켰는지 추적한다. 애니메이션(타이핑, 태양 소용돌이) 분기에 사용. */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia(QUERY).matches,
  );

  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
