import { useRef } from "react";
import { HeroSection } from "./components/hero/HeroSection";
import { SectionStub } from "./components/home/SectionStub";
import { SiteHeader } from "./components/site-header/SiteHeader";

/**
 * TODO: 섹션 2~7 구현 예정.
 * 02 기능 소개(UI → 기능 번호), 03 레이아웃 4종 라이브 프리뷰,
 * 04 캔버스 & 그래프(반반 그리드), 05 나머지 기능 그리드, 06 Q&A · 커뮤니티.
 */
const SECTIONS = [
  { id: "features", number: "02", title: "Luie의 기능들", hint: "UI와 기능을 번호로 소개합니다" },
  { id: "layouts", number: "03", title: "4가지 레이아웃", hint: "기본 · 구글 독스 · 스크리브너 · 에디터" },
  { id: "canvas", number: "04", title: "캔버스 & 그래프", hint: "마크업 에디터 캔버스와 세계관 그래프" },
  { id: "more", number: "05", title: "그 밖의 기능들", hint: "메모리 엔진 · 스냅샷 · 내보내기 · AI · 스마트 링크" },
  { id: "faq", number: "06", title: "Q&A · 커뮤니티", hint: "자주 묻는 질문과 소통 채널" },
];

export default function App() {
  const heroRef = useRef<HTMLElement>(null);

  return (
    <div className="relative">
      <SiteHeader heroRef={heroRef} />
      <main>
        <HeroSection runwayRef={heroRef} />
        {SECTIONS.map((section) => (
          <SectionStub key={section.id} {...section} />
        ))}
      </main>
    </div>
  );
}
