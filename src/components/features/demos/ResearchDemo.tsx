import { useState } from "react";
import { CalendarClock, Flag, User } from "lucide-react";
import type { Event, Faction, Character } from "@shared/types";
import { EntityGallery } from "@renderer/features/research/components/wiki/EntityGallery";
import { useCharacterStore } from "@renderer/features/research/stores/characterStore";
import { useEventStore } from "@renderer/features/research/stores/eventStore";
import { useFactionStore } from "@renderer/features/research/stores/factionStore";
import { useI18n } from "../../../i18n";

type ResearchTab = "character" | "event" | "faction";

const noop = () => {};

/** 실제 자료 매니저의 핵심 UI(EntityGallery)를 미리보기 데이터로 서빙한다. */
export default function ResearchDemo() {
  const t = useI18n();
  const [tab, setTab] = useState<ResearchTab>("character");

  const characters = useCharacterStore((s) => s.items) as Character[];
  const events = useEventStore((s) => s.items) as Event[];
  const factions = useFactionStore((s) => s.items) as Faction[];

  const tabs: Array<{ id: ResearchTab; label: string; icon: typeof User }> = [
    { id: "character", label: t.showcase.research.tabs.character, icon: User },
    { id: "event", label: t.showcase.research.tabs.event, icon: CalendarClock },
    { id: "faction", label: t.showcase.research.tabs.faction, icon: Flag },
  ];

  const groupsByTab: Record<ResearchTab, Record<string, Array<Character | Event | Faction>>> = {
    character: { [t.showcase.research.groups.character]: characters },
    event: { [t.showcase.research.groups.event]: events },
    faction: { [t.showcase.research.groups.faction]: factions },
  };

  return (
    <div className="flex h-full flex-col bg-app">
      {/* 자료 탭 스트립 */}
      <div className="flex shrink-0 items-center gap-1 border-b border-border bg-panel px-4 py-2">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`flex items-center gap-1.5 rounded-control px-3 py-1.5 text-sm transition-colors ${
              tab === id
                ? "bg-element font-semibold text-fg"
                : "text-muted hover:bg-hover hover:text-fg"
            }`}
          >
            <Icon className="size-4" />
            {label}
          </button>
        ))}
      </div>

      <div className="min-h-0 flex-1">
        {tab === "character" && (
          <EntityGallery
            key="character"
            groups={groupsByTab.character}
            title={t.showcase.research.tabs.character}
            noDescriptionLabel={t.showcase.research.noDescription}
            icon={User}
            onSelect={noop}
          />
        )}
        {tab === "event" && (
          <EntityGallery
            key="event"
            groups={groupsByTab.event}
            title={t.showcase.research.tabs.event}
            noDescriptionLabel={t.showcase.research.noDescription}
            icon={CalendarClock}
            onSelect={noop}
          />
        )}
        {tab === "faction" && (
          <EntityGallery
            key="faction"
            groups={groupsByTab.faction}
            title={t.showcase.research.tabs.faction}
            noDescriptionLabel={t.showcase.research.noDescription}
            icon={Flag}
            onSelect={noop}
          />
        )}
      </div>
    </div>
  );
}
