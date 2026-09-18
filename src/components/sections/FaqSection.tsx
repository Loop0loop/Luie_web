import { useI18n } from "../../i18n";
import { SectionStub } from "../home/SectionStub";

/** 06 Q&A · 커뮤니티 섹션 — 자주 묻는 질문과 소통 채널이 들어갈 자리. */
export function FaqSection() {
  const t = useI18n();

  return (
    <SectionStub
      id="faq"
      number="06"
      title={t.sections.faq.title}
      hint={t.sections.faq.hint}
    />
  );
}
