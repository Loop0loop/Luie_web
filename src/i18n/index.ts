import en from "./locales/en";
import ja from "./locales/ja";
import ko, { type Dictionary } from "./locales/ko";

/** 지원 로케일. 첫 항목(ko)이 기본이며 `/`에 대응한다. */
export const LOCALES = ["ko", "en", "ja"] as const;
export type Locale = (typeof LOCALES)[number];

/** 언어 선택 UI에 표시하는 자기언어 이름. */
export const LOCALE_LABELS: Record<Locale, string> = {
  ko: "한국어",
  en: "English",
  ja: "日本語",
};

const DICTIONARIES: Record<Locale, Dictionary> = { ko, en, ja };

/**
 * 현재 로케일. 언어는 HTML 엔트리(index.html · en/ · ja/)의 <html lang>이
 * 결정하므로 마운트 시 한 번 읽으면 충분하다 — 전환은 페이지 이동이고
 * 런타임 반응성(컨텍스트·리렌더)이 필요 없다.
 */
export function getLocale(): Locale {
  const lang = document.documentElement.lang;
  return (LOCALES as readonly string[]).includes(lang) ? (lang as Locale) : "ko";
}

/** 로케일의 사전을 반환한다. 사전은 모듈 상수라 참조가 항상 고정이다. */
export function useI18n(): Dictionary {
  return DICTIONARIES[getLocale()];
}

/** 로케일별 페이지 경로. ko는 루트, 나머지는 /{locale}/ 디렉터리 엔트리다. */
export function localePath(locale: Locale): string {
  return locale === "ko" ? "/" : `/${locale}/`;
}

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}
