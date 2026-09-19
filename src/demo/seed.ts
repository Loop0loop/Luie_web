import { useEditorStore } from "@renderer/domains/editor";
import { useProjectStore } from "@renderer/domains/project";
import { setChapterContent } from "@renderer/features/manuscript/stores/chapterContentStore";
import { useChapterStore } from "@renderer/features/manuscript/stores/chapterStore";
import {
  PREVIEW_CHAPTERS,
  PREVIEW_CHAPTER_CONTENTS,
  PREVIEW_CHARACTERS,
  PREVIEW_EVENTS,
  PREVIEW_FACTIONS,
  PREVIEW_PROJECT,
  PREVIEW_TERMS,
} from "@renderer/features/startup/constants/previewData";
import { initI18n } from "@renderer/i18n";
import { useCharacterStore } from "@renderer/features/research/stores/characterStore";
import { useEventStore } from "@renderer/features/research/stores/eventStore";
import { useFactionStore } from "@renderer/features/research/stores/factionStore";
import { useTermStore } from "@renderer/features/research/stores/termStore";
import { useUIStore } from "@renderer/features/workspace/stores/uiStore";

let bootstrapPromise: Promise<void> | null = null;

/**
 * 02 섹션 데모는 Luie 앱의 실제 renderer 컴포넌트를 그대로 렌더하므로 앱과 같은
 * i18n·전역 스토어가 필요하다. 데모 문서(iframe)마다 첫 렌더 전 1회 초기화한다.
 *
 * - electron IPC는 지연 Proxy가 PRELOAD_API_UNAVAILABLE 실패 응답으로 처리하므로
 *   브라우저에서 안전하고, 컴포넌트는 아래에서 setState로 심은 데이터만 렌더한다.
 * - 시딩 패턴은 Luie의 LayoutLivePreview와 동일 — CRUD 슬라이스의 별칭 키를
 *   함께 채워야 모든 구독자가 같은 값을 본다.
 */
export function ensureLuieDemoReady(lang: string): Promise<void> {
  bootstrapPromise ??= (async () => {
    // Luie i18next가 랜딩 경로(/, /en/, /ja/)와 같은 언어로 렌더되게 한다.
    // LanguageDetector의 캐시 키와 동일하다.
    localStorage.setItem("i18nextLng", lang);
    await initI18n();

    useProjectStore.setState({
      items: [PREVIEW_PROJECT],
      projects: [PREVIEW_PROJECT],
      currentItem: PREVIEW_PROJECT,
      currentProject: PREVIEW_PROJECT,
    });
    useChapterStore.setState({
      items: PREVIEW_CHAPTERS,
      chapters: PREVIEW_CHAPTERS,
      currentItem: PREVIEW_CHAPTERS[0] ?? null,
      currentChapter: PREVIEW_CHAPTERS[0] ?? null,
    });
    Object.entries(PREVIEW_CHAPTER_CONTENTS).forEach(([id, content]) => {
      setChapterContent(id, content);
    });
    useCharacterStore.setState({
      items: PREVIEW_CHARACTERS,
      characters: PREVIEW_CHARACTERS,
      currentItem: PREVIEW_CHARACTERS[0] ?? null,
      currentCharacter: PREVIEW_CHARACTERS[0] ?? null,
    });
    useEventStore.setState({
      items: PREVIEW_EVENTS,
      events: PREVIEW_EVENTS,
      currentItem: PREVIEW_EVENTS[0] ?? null,
      currentEvent: PREVIEW_EVENTS[0] ?? null,
    });
    useFactionStore.setState({
      items: PREVIEW_FACTIONS,
      factions: PREVIEW_FACTIONS,
      currentItem: PREVIEW_FACTIONS[0] ?? null,
      currentFaction: PREVIEW_FACTIONS[0] ?? null,
    });
    useTermStore.setState({
      items: PREVIEW_TERMS,
      terms: PREVIEW_TERMS,
      currentItem: PREVIEW_TERMS[0] ?? null,
      currentTerm: PREVIEW_TERMS[0] ?? null,
    });

    // 데모는 기본 레이아웃 하나로 고정 — 오른쪽 패널·부가 패널을 닫아 둔다.
    useEditorStore.setState({ uiMode: "default" });
    useUIStore.setState((state) => ({
      regions: {
        ...state.regions,
        rightPanel: {
          ...state.regions.rightPanel,
          open: false,
          activeTab: null,
        },
      },
      panels: [],
    }));
  })();
  return bootstrapPromise;
}
