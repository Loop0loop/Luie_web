import { SmartLinkTooltip } from "@renderer/features/editor/components/SmartLinkTooltip";
import { MainLayout, Sidebar } from "@renderer/features/workspace/components/layout/rootShell";
import { useI18n } from "../../../i18n";

const noop = () => {};

/** 스마트링크가 박힌 원고 본문. 하이라이트는 실제 에디터와 동일한
 * .smart-link-highlight(data-type/data-id) 마크업 — SmartLinkTooltip이
 * 문서 전역 리스너로 잡아 실제 툴팁을 띄운다. */
function ManuscriptBody() {
  const t = useI18n();
  const link = (
    type: "character" | "event" | "faction" | "term",
    id: string,
    name: string,
  ) => (
    <span className="smart-link-highlight" data-type={type} data-id={id}>
      {name}
    </span>
  );

  return (
    <div className="flex h-full justify-center overflow-hidden bg-app">
      <div className="flex w-full max-w-[680px] flex-col px-10 py-10">
        <div className="mb-6 flex items-baseline justify-between">
          <h3 className="text-lg font-bold text-fg">1장. 첫눈</h3>
          <span className="text-xs text-muted">녹는 항구</span>
        </div>
        <div className="space-y-5 text-[15px] leading-[1.95] text-fg">
          <p>
            첫눈은 항구의 등대를 가장 먼저 덮었다. {link("term", "wizard-preview-term-1", "오로라호")}의
            뱃머리 위에서 {link("character", "wizard-preview-character-1", "강세연")}은 얼어붙은
            침묵 항로를 바라보았다. 10년 전, 등대선이 사라진 바로 그 방향이었다.
          </p>
          <p>
            「북위 65도, 해빙 개시.」 {link("character", "wizard-preview-character-2", "서도진")}이
            쇄빙 뱃고동을 울렸다. {link("faction", "wizard-preview-faction-1", "백야 항해 길드")}의
            선단이 하나둘 불빛을 밝혀 나갔다. 내일이면
            {link("event", "wizard-preview-event-1", "북부 해빙제")}의 첫 출항 의식이 시작된다.
          </p>
          <p>
            성도 나침반이 손바닥 안에서 미세하게 떨렸다. 세연은 침묵했다. 나침반은 이미
            북쪽을 가리키고 있었으니까.
          </p>
        </div>
        <p className="mt-8 border-t border-border pt-4 text-xs text-muted">
          {t.showcase.smartLink.hint}
        </p>
      </div>
    </div>
  );
}

/** 실제 앱의 기본 레이아웃(MainLayout) + 실제 스마트링크 툴팁. */
export default function SmartLinkDemo() {
  return (
    <>
      <MainLayout
        sidebar={
          <Sidebar onOpenSettings={noop} onSelectResearchItem={noop} />
        }
      >
        <ManuscriptBody />
      </MainLayout>
      <SmartLinkTooltip />
    </>
  );
}
