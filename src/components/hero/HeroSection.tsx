import type { RefObject } from "react";
import { useScrollProgress } from "../../hooks/useScrollProgress";
import { smoothstep } from "../../lib/math";
import { ChevronDownIcon } from "../ui/icons";
import { HeroCopy } from "./HeroCopy";
import { SunCanvas } from "./SunCanvas";

/** 스크롤 런웨이 길이. 220vh = 뷰포트 1장 + 스크롤 여유 1.2장. */
const RUNWAY_HEIGHT = "h-[220vh]";

type HeroSectionProps = {
  /** App이 소유하는 런웨이 ref. 헤더의 분리 시점 계산에도 쓰인다. */
  runwayRef: RefObject<HTMLElement | null>;
};

/**
 * 히어로. 스티키 뷰포트 안에 태양 캔버스와 복문을 띄우고,
 * 런웨이 진행도에 따라 빛이 아래에서 위로 차오른다.
 */
export function HeroSection({ runwayRef }: HeroSectionProps) {
  const progress = useScrollProgress(runwayRef);

  const copyOpacity = 1 - smoothstep(0.3, 0.75, progress);
  const hintOpacity = 1 - smoothstep(0.0, 0.12, progress);

  return (
    <section ref={runwayRef} id="top" aria-label="Luie 소개" className={`relative ${RUNWAY_HEIGHT}`}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* 태양은 페이드하지 않는다 — 빛 채움(uLight)이 전부다.
            런웨이 끝에서 sticky가 풀리며 화면 위로 흘러간다. */}
        <div className="absolute inset-0">
          <SunCanvas progress={progress} />
        </div>

        <div
          style={{
            opacity: copyOpacity,
            transform: `translateY(${(1 - copyOpacity) * -28}px)`,
          }}
          className="relative z-10 h-full"
        >
          <HeroCopy />
        </div>

        <div
          style={{ opacity: hintOpacity }}
          className="absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-1.5 text-subtle"
        >
          <span className="text-[11px] font-medium tracking-[0.3em] uppercase">Scroll</span>
          <ChevronDownIcon className="size-4 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
