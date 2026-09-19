import { useState } from "react";
import { Camera, ChevronRight, FileText } from "lucide-react";
import { SnapshotDiffModal } from "@renderer/features/snapshot/components/SnapshotDiffModal";
import { useI18n } from "../../../i18n";

/** 데모용 원고 — 실제 앱의 스냅샷 비교 UX를 그대로 보여주기 위한 최소 목업. */
const CURRENT_MANUSCRIPT = [
  "첫눈은 항구의 등대를 가장 먼저 덮었다.",
  "강세연은 오로라호의 뱃머리에 서서 얼어붙은 침묵 항로를 바라보았다. 10년 전, 등대선이 사라진 바로 그 방향이었다.",
  "「북위 65도, 해빙 개시.」 서도진이 쇄빙 뱃고동을 울렸다. 백야 항해 길드의 선단이 하나둘 불빛을 밝혀 나갔다.",
  "성도 나침반이 손바닥 안에서 미세하게 떨렸다. 세연은 침묵했다. 나침반은 이미 북쪽을 가리키고 있었으니까.",
].join("\n\n");

const SNAPSHOT_MANUSCRIPT = [
  "첫눈은 항구를 가장 먼저 덮었다.",
  "강세연은 오로라호의 뱃머리에 서서 얼어붙은 침묵 항로를 바라보았다. 등대선이 사라진 바로 그 방향이었다.",
  "「북위 65도, 해빙 개시.」 서도진이 쇄빙 뱃고동을 울렸다. 선단이 하나둘 불빛을 밝혀 나갔다.",
].join("\n\n");

export default function SnapshotDemo() {
  const t = useI18n();
  const [diffOpen, setDiffOpen] = useState(false);

  return (
    <div className="flex h-full flex-col bg-app">
      {/* 문서 헤더 — 실제 편집기 상단바 구조 */}
      <div className="flex h-12 shrink-0 items-center justify-between border-b border-border bg-panel px-5">
        <div className="flex items-center gap-2 text-sm text-fg">
          <FileText className="size-4 text-muted" />
          <span className="font-semibold">1장. 첫눈</span>
        </div>
        <span className="text-xs text-muted">녹는 항구 · 원고</span>
      </div>

      <div className="flex min-h-0 flex-1">
        {/* 원고 본문 */}
        <div className="flex min-w-0 flex-1 justify-center overflow-hidden px-10 py-8">
          <div className="max-w-[560px] whitespace-pre-wrap text-[15px] leading-[1.9] text-fg">
            {CURRENT_MANUSCRIPT}
          </div>
        </div>

        {/* 스냅샷 패널 — 목록에서 골라 비교하는 실제 UX */}
        <div className="flex w-[280px] shrink-0 flex-col border-l border-border bg-panel">
          <div className="flex items-center gap-2 border-b border-border px-4 py-3 text-sm font-semibold text-fg">
            <Camera className="size-4 text-muted" />
            {t.showcase.snapshot.panelTitle}
          </div>
          {(
            [
              { label: t.showcase.snapshot.autoSave, time: t.showcase.snapshot.time2h, content: SNAPSHOT_MANUSCRIPT },
              { label: t.showcase.snapshot.manualSave, time: t.showcase.snapshot.time3d, content: SNAPSHOT_MANUSCRIPT },
            ] as const
          ).map((snapshot) => (
            <button
              key={snapshot.time}
              type="button"
              onClick={() => setDiffOpen(true)}
              className="flex items-center justify-between px-4 py-3 text-left transition-colors hover:bg-hover"
            >
              <span className="flex flex-col gap-0.5">
                <span className="text-sm text-fg">{snapshot.label}</span>
                <span className="text-xs text-muted">{snapshot.time}</span>
              </span>
              <ChevronRight className="size-4 text-muted" />
            </button>
          ))}
        </div>
      </div>

      <SnapshotDiffModal
        isOpen={diffOpen}
        onClose={() => setDiffOpen(false)}
        originalContent={CURRENT_MANUSCRIPT}
        snapshotContent={SNAPSHOT_MANUSCRIPT}
        snapshotDate={new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)}
      />
    </div>
  );
}
