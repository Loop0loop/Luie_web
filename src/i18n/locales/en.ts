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
