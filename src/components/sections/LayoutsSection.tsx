import { useI18n } from "../../i18n";
import { SectionStub } from "../home/SectionStub";

/** 03 레이아웃 섹션 — 기본 · 구글 독스 · 스크리브너 · 에디터 라이브 프리뷰가 들어갈 자리. */
export function LayoutsSection() {
  const t = useI18n();

  return (
    <SectionStub
      id="layouts"
      number="03"
      title={t.sections.layouts.title}
      hint={t.sections.layouts.hint}
    />
  );
}
