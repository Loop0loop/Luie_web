import { useRef } from "react";
import { HeroSection } from "./components/hero/HeroSection";
import { CanvasGraphSection } from "./components/sections/CanvasGraphSection";
import { FaqSection } from "./components/sections/FaqSection";
import { FeaturesSection } from "./components/sections/FeaturesSection";
import { LayoutsSection } from "./components/sections/LayoutsSection";
import { MoreSection } from "./components/sections/MoreSection";
import { SiteHeader } from "./components/site-header/SiteHeader";

/**
 * 각 섹션의 실제 구현은 sections/ 아래 파일별로 진행한다.
 * 02 기능 소개(UI → 기능 번호), 03 레이아웃 4종 라이브 프리뷰,
 * 04 캔버스 & 그래프(반반 그리드), 05 나머지 기능 그리드, 06 Q&A · 커뮤니티.
 */
export default function App() {
  const heroRef = useRef<HTMLElement>(null);

  return (
    <div className="relative">
      <SiteHeader heroRef={heroRef} />
      <main>
        <HeroSection runwayRef={heroRef} />
        <FeaturesSection />
        <LayoutsSection />
        <CanvasGraphSection />
        <MoreSection />
        <FaqSection />
      </main>
    </div>
  );
}
