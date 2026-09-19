import { Sparkles } from "lucide-react";
import { useI18n } from "../../../i18n";

/** 스토리 라인은 아직 구현 전 — 데모 자리 표시. */
export default function StorylineDemo() {
  const t = useI18n();

  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 bg-app px-10">
      {/* 준비 중 타임라인 스케치 — 세로 점선 위에 흐린 노드 */}
      <div className="relative flex flex-col gap-8" aria-hidden="true">
        <div className="absolute bottom-3 left-[7px] top-3 w-px border-l border-dashed border-border-strong" />
        {[0, 1, 2].map((i) => (
          <div key={i} className="relative flex items-center gap-4">
            <span className="size-[15px] shrink-0 rounded-full border border-border-strong bg-panel" />
            <span
              className="h-2.5 rounded-full bg-element"
              style={{ width: 180 - i * 42 }}
            />
          </div>
        ))}
      </div>
      <p className="flex items-center gap-2 text-sm text-muted">
        <Sparkles className="size-4 text-accent-soft" />
        {t.showcase.storyline.comingSoon}
      </p>
    </div>
  );
}
