import "server-only";

const dictionaries = {
  en: () => import("@/dictionaries/en").then((module) => module.en),
  ko: () => import("@/dictionaries/ko").then((module) => module.ko),
  ja: () => import("@/dictionaries/ja").then((module) => module.ja),
};

export const getDictionary = async (locale: string) => {
  if (dictionaries[locale as keyof typeof dictionaries]) {
    return dictionaries[locale as keyof typeof dictionaries]();
  }
  return dictionaries.en();
};
