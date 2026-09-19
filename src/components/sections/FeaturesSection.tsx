import { Suspense, lazy } from "react";

/**
 * 02 기능 소개 — 실제 Luie renderer UI를 카드 덱으로 서빙하는 쇼케이스.
 * 히어로 이후 스크롤로 진입하는 섹션이라 FeatureDeck(= Luie renderer 청크)은
 * lazy 로드해 초기 번들에서 뺀다.
 */
const LazyFeatureDeck = lazy(() =>
  import("../features/FeatureDeck").then((m) => ({ default: m.FeatureDeck })),
);

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="relative flex h-screen items-center justify-center overflow-hidden px-6"
    >
      <Suspense fallback={null}>
        <LazyFeatureDeck />
      </Suspense>
    </section>
  );
}
