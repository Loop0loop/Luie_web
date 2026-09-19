import {
  LOCALES,
  LOCALE_LABELS,
  getLocale,
  isLocale,
  localePath,
  useI18n,
} from "../../i18n";
import { ChevronDownIcon } from "./icons";

/**
 * 언어 선택. 로케일은 URL 경로(/, /en/, /ja/)가 결정하므로
 * 전환은 전체 페이지 이동으로 처리한다 — 런타임 i18n 상태가 없다.
 */
export function LanguageSwitcher() {
  const t = useI18n();

  return (
    <div className="relative">
      <select
        aria-label={t.lang.selectAria}
        value={getLocale()}
        onChange={(event) => {
          const next = event.target.value;
          if (isLocale(next)) window.location.assign(localePath(next));
        }}
        className="h-9 cursor-pointer appearance-none rounded-full bg-transparent pr-6 pl-2 text-sm text-muted transition-colors duration-200 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        {LOCALES.map((locale) => (
          <option key={locale} value={locale}>
            {LOCALE_LABELS[locale]}
          </option>
        ))}
      </select>
      {/* appearance-none 셀렉트의 시각 어포던스 — 네이티브 화살표가 없어도
          선택 가능함이 보이게 한다. */}
      <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-2 size-3.5 -translate-y-1/2 text-muted" />
    </div>
  );
}
