import { useI18n } from "../../i18n";
import { SectionStub } from "../home/SectionStub";

/** 05 기타 기능 섹션 — 메모리 엔진 · 스냅샷 · 내보내기 · AI · 스마트 링크가 들어갈 자리. */
export function MoreSection() {
  const t = useI18n();

  return (
    <SectionStub
      id="more"
      number="05"
      title={t.sections.more.title}
      hint={t.sections.more.hint}
    />
  );
}
