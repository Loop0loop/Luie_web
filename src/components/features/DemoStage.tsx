import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

/**
 * 데모를 실제 앱 창 크기(현재 뷰포트와 동일한 논리 좌표)로 렌더하고 컨테이너에
 * 맞춰 축소하는 스테이지. Luie의 레이아웃 루트가 h-screen 기준이라 논리 크기를
 * 실제 뷰포트와 일치시킨다 — 그래야 잘림 없이, 실제 앱과 같은 밀도로 보인다.
 */
type DemoStageProps = {
  children: ReactNode;
};

export function DemoStage({ children }: DemoStageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewport, setViewport] = useState(() => ({
    w: window.innerWidth,
    h: window.innerHeight,
  }));
  const [scale, setScale] = useState(0);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      setViewport({ w: window.innerWidth, h: window.innerHeight });
      const { width, height } = el.getBoundingClientRect();
      if (width === 0 || height === 0) return;
      setScale(Math.min(width / window.innerWidth, height / window.innerHeight));
    };
    update();
    const observer = new ResizeObserver(update);
    window.addEventListener("resize", update);
    observer.observe(el);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden bg-app"
    >
      <div
        className="absolute left-1/2 top-1/2"
        style={{
          width: viewport.w,
          height: viewport.h,
          transform: `translate(-50%, -50%) scale(${scale})`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
