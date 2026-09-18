/**
 * 히어로 태양 셰이더의 색 팔레트 — GLSL에 박혀 있던 색 리터럴을 데이터로 옮긴 것.
 * 키의 선언 순서가 그대로 uPal 유니폼 배열의 인덱스가 되고, sunShader.ts는 이
 * 순서에서 PAL_* 인덱스 상수를 코드 생성해 주입한다 — 셰이더와 이 파일의
 * 동기화가 사람 손을 거치지 않는다. 색을 조정할 때는 이 파일만 고친다.
 *
 * 값은 셰이더가 기대하는 디스플레이 공간(선형 변환 없음) 그대로다.
 */
export const SUN_PALETTE = {
  /** 심우주 배경 — 다크(뉴트럴 블랙) / 라이트(종이빛). */
  spaceDark: [0.043, 0.043, 0.047],
  spaceLight: [0.945, 0.945, 0.952],
  /** 별빛 — 뉴트럴 화이트. */
  star: [0.92, 0.92, 0.92],
  /** 코로나 램프 양끝 — 어두운 동색 → 밝은 금색. */
  coronaLo: [0.8, 0.55, 0.33],
  coronaHi: [1.0, 0.82, 0.55],
  /** 광구 — 빛이 닿기 전 실루엣과 홍염 코어/미드/엣지 그라데이션. */
  bodyDark: [0.075, 0.028, 0.018],
  bodyCore: [0.34, 0.12, 0.05],
  bodyMid: [0.26, 0.09, 0.036],
  bodyEdge: [0.15, 0.058, 0.028],
  /** 림 직전 온기와 림 금색 대기선. */
  rimGlow: [0.9, 0.55, 0.3],
  limbGold: [1.0, 0.8, 0.5],
  /** 빛 채움 경계(terminator)의 금빛. */
  terminatorGold: [1.0, 0.7, 0.4],
  /** 라이트(일식) 하늘 — 크림 바탕과 황혼 틴트·어스름 곱셈 램프. */
  skyCream: [0.945, 0.945, 0.952],
  duskTint: [0.968, 0.948, 0.918],
  duskDim: [0.94, 0.925, 0.9],
  /** 백열 광구와 헤일로 금색. */
  blaze: [1.0, 0.96, 0.87],
  haloGold: [1.0, 0.9, 0.7],
  /** 잉크빛 달 — 바탕색과 림에 감기는 빛. */
  moonInk: [0.115, 0.12, 0.145],
  moonRim: [1.0, 0.8, 0.55],
  /** 태양 원반이 달 접근에 받는 온기. */
  diskWarm: [0.07, 0.056, 0.032],
  /** 다이아몬드 빛과 완식의 백열 고리. */
  bead: [1.0, 0.97, 0.9],
  ringWhite: [1.0, 0.94, 0.82],
  /** 밤 페이드가 캔버스를 잠그는 페이지 배경 — 다크/라이트. */
  pageBgDark: [0.102, 0.102, 0.11],
  pageBgLight: [0.965, 0.965, 0.968],
  /** 일식 극대의 지평선 황혼 — 어두워진 하늘의 림을 도는 주황 빛. */
  horizonGlow: [1.0, 0.62, 0.35],
} as const;

export type SunPaletteKey = keyof typeof SUN_PALETTE;

/** 유니폼 배열 순서 — Object.keys는 선언 순서를 보장한다. */
export const SUN_PALETTE_ORDER = Object.keys(SUN_PALETTE) as SunPaletteKey[];

/** camelCase 키 → PAL_SNAKE_CASE GLSL 상수명. */
function glslConstName(key: string): string {
  return `PAL_${key.replace(/[A-Z]/g, (c) => `_${c}`).toUpperCase()}`;
}

/**
 * 셰이더에 주입할 `const int PAL_*` 선언 블록. 인덱스 상수를 코드 생성하므로
 * 팔레트 순서를 바꿔도 셰이더 쪽 정의를 수동으로 고칠 일이 없다.
 */
export const SUN_PALETTE_GLSL: string = SUN_PALETTE_ORDER.map(
  (key, index) => `const int ${glslConstName(key)} = ${index};`,
).join("\n");
