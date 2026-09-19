import type { Dictionary } from "./ko";

/** English dictionary — 초안 번역, 후속 다듬기 대상. */
const en: Dictionary = {
  meta: {
    title: "Luie — The writing workspace for web novelists",
    description:
      "Manuscripts, worldbuilding, snapshots and export in one flow. Luie, a word processor built for web novelists.",
  },
  nav: {
    menuAria: "Main menu",
    features: "Features",
    layouts: "Layouts",
    canvas: "Canvas · Graph",
    faq: "Q&A",
  },
  actions: {
    download: "Download",
    explore: "Explore Luie",
  },
  hero: {
    ariaLabel: "Introducing Luie",
    headline: "Start your story",
    typingPhrases: ["Start your next manuscript."],
    sub: "Free on macOS & Windows — your manuscripts always stay on your computer",
    scroll: "Scroll",
  },
  sections: {
    features: {
      title: "What Luie does",
      hint: "A tour of the UI and features, one number at a time",
    },
    layouts: {
      title: "Four layouts",
      hint: "Default · Google Docs · Scrivener · Editor",
    },
    canvas: {
      title: "Canvas & graph",
      hint: "Markup editor canvas and a worldbuilding graph",
    },
    more: {
      title: "And there's more",
      hint: "Memory engine · Snapshots · Export · AI · Smart links",
    },
    faq: {
      title: "Q&A · Community",
      hint: "Frequently asked questions and community channels",
    },
  },
  /** 02 feature showcase — a card deck serving the real Luie renderer UI. */
  showcase: {
    overline: "Luie's features",
    badge: "Actual Luie screen",
    tabs: {
      snapshot: "Snapshots",
      smartLink: "Smart Links",
      research: "Research",
      storyline: "Story Line",
    },
    sub: {
      snapshot:
        "Manuscripts you can always return to. Roll back to any save point and compare changed sentences at a glance.",
      smartLink:
        "Characters, events, factions and terms live inside your manuscript. Hover the underlined names.",
      research:
        "Characters, events, factions — your worldbuilding is always at your fingertips.",
      storyline: "The whole arc on one canvas. Story Line is coming soon.",
    },
    snapshot: {
      panelTitle: "Snapshots",
      autoSave: "Auto save",
      manualSave: "Manual save",
      time2h: "2 hours ago",
      time3d: "3 days ago",
    },
    smartLink: {
      hint: "Hover the underlined names — these are the real editor's smart links.",
    },
    research: {
      tabs: {
        character: "Characters",
        event: "Events",
        faction: "Factions",
      },
      groups: {
        character: "Cast",
        event: "Event records",
        faction: "Factions",
      },
      noDescription: "No description",
    },
    storyline: {
      comingSoon: "Story Line is coming soon",
    },
  },
  brand: {
    homeAria: "Go to the Luie home page",
  },
  theme: {
    toLight: "Switch to the light theme",
    toDark: "Switch to the dark theme",
  },
  lang: {
    selectAria: "Select language",
  },
};

export default en;
