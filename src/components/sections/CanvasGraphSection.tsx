import { useI18n } from "../../i18n";
import { SectionStub } from "../home/SectionStub";

/** 04 캔버스 & 그래프 섹션 — 마크업 에디터 캔버스와 세계관 그래프가 들어갈 자리. */
export function CanvasGraphSection() {
  const t = useI18n();

  return (
    <SectionStub
      id="canvas"
      number="04"
      title={t.sections.canvas.title}
      hint={t.sections.canvas.hint}
    />
  );
}
