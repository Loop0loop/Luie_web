/**
 * 프로젝트 공용 상수 — 둘 이상의 모듈에서 공유되는 값만 여기 둔다.
 * i18n 사전(src/i18n)과 한 파일에서만 쓰는 지역 상수는 대상에서 제외.
 */

/* ── 히어로 태양(SunCanvas) ── */

/** 셰이더가 무거워 DPR 상한을 둔다. */
export const SUN_MAX_PIXEL_RATIO = 1.25;
/** 런웨이 전체 스크롤에 대응하는 X축 구름각(라디안). */
export const SUN_MAX_PITCH_RAD = 1.2;
/** 시간 기반 Y축 자전 속도(라디안/초). */
export const SUN_SPIN_RAD_PER_SEC = 0.03;
/** 빛 채움 구간(런웨이 진행도) — 이 범위에서 아래→위로 밝아져 완등한다. */
export const SUN_LIGHT_START = 0.05;
export const SUN_LIGHT_END = 0.8;
/** 밤 페이드 구간 — 캔버스 하단이 어둠에 잠겨 잘리는 면을 묻는다. */
export const SUN_NIGHT_START = 0.82;
export const SUN_NIGHT_END = 0.98;
/**
 * 빛 채움 완등(끝자락)의 최소 시간(초). 채움은 스크롤을 그대로 따라가다가
 * 이 구간(SUN_FILL_TAIL_START부터 1.0, 마지막 25%)에서만 속도 상한을 받는다 —
 * 급스크롤로 진행도가 점프해도 완등 순간이 항상 눈에 보이는 속도로 마무리된다.
 * 다크 채움·라이트 일식(같은 uLight) 모두 적용, 테마 무관.
 */
export const SUN_FILL_TAIL_START = 0.75;
export const SUN_FILL_TAIL_MIN_DURATION_S = 0.6;

/* ── 사이트 헤더(SiteHeader) ── */

/** 플로팅 필이 화면 좌우 여백과 두는 간격(px). */
export const HEADER_EDGE_GAP_PX = 16;
/** 플로팅 상태 필 최대 너비(px). */
export const HEADER_PILL_MAX_WIDTH_PX = 720;
/** 히어로 런웨이에서 이 진행도를 지나면 헤더가 분리된다. */
export const HEADER_DETACH_PROGRESS = 0.9;
/** 바→플로팅 필 모프의 최소 시간(초). 급스크롤로 트리거돼도 이보다 빨리 줄어들지 않는다. */
export const HEADER_MORPH_MIN_DURATION_S = 0.6;

/* ── 테마 저장 키 ── */

/** ThemeToggle과 각 언어 HTML의 프리페인트 스크립트가 공유하는 localStorage 키. */
export const THEME_STORAGE_KEY = "luie-theme";
