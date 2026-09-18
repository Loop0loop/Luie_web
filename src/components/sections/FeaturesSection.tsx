import { useI18n } from "../../i18n";
import { SectionStub } from "../home/SectionStub";

/**
 * 02 기능 소개 섹션. 히어로 행성은 캔버스 하단에서 밤에 잠기며 사라지고
 * (SunCanvas의 스크롤 연동 하단 페이드), 이 섹션은 평평한 배경으로 이어진다.
 * 실제 콘텐츠로 교체될 자리.
 */
export function FeaturesSection() {
  const t = useI18n();

  return (
    <SectionStub
      id="features"
      number="02"
      title={t.sections.features.title}
      hint={t.sections.features.hint}
    />
  );
}
