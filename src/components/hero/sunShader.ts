/**
 * 히어로 태양 셰이더 v4 — 화면 폭보다 가로로 살짝 큰 타원의 행성.
 *
 * 거대 행성의 완만한 곡률 + 림 금빛 + 코로나로 macOS 야간 지구 배경화면 톤을 낸다.
 * 표면은 3D 구면 노이즈로 샘플링한다(경도 atan 이음새 크랙 제거). 런웨이 끝에는
 * 캔버스 하단이 밤에 잠겨 섹션 배경과 이어지고, uTheme으로 다크/라이트 우주를 전환한다.
 * - 광구: 심홍 방사형 그라데이션 + 도메인 워핑 미세 입자
 * - 필라멘트: 완만한 비등방 노이즈 결
 * - 림: 가장자리 다어케닝 후 얇은 금색 대기선
 * - 코로나: 금색, 넓고 낮은 강도로 천천히 숨쉬기
 * - 라이트: 금환일식(annular eclipse) 진행형 — 달이 아래에서 떠올라 태양을
 *   물어 덮고 완식에서 얇은 백열 금환이 남는다. 무광 달 실루엣 + 3단 블룸,
 *   하드 외곽선 없음.
 */
export const SUN_VERTEX = /* glsl */ `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

export const SUN_FRAGMENT = /* glsl */ `
varying vec2 vUv;

uniform vec2 uResolution; // 캔버스 픽셀 크기
uniform float uTime;
uniform float uSpin;
uniform float uPitch;
uniform float uLight; // 0=아래쪽만 밝음 → 1=림까지 전부 밝음
uniform float uNight; // 0=밤 페이드 없음 → 1=캔버스 하단부가 어둠에 잠김
uniform float uTheme; // 0=다크 우주 → 1=라이트 우주(JS가 부드럽게 보간)

float hash(vec2 p) {
  p = fract(p * vec2(234.34, 435.345));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

const mat2 ROT = mat2(0.8, 0.6, -0.6, 0.8);

float fbm(vec2 p) {
  float v = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 5; i++) {
    v += amp * noise(p);
    p = ROT * p * 2.02;
    amp *= 0.55;
  }
  return v;
}

float hash3(vec3 p) {
  p = fract(p * 0.3183099 + vec3(0.1, 0.2, 0.3));
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}

float noise3(vec3 x) {
  vec3 i = floor(x);
  vec3 f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(hash3(i), hash3(i + vec3(1.0, 0.0, 0.0)), f.x),
        mix(hash3(i + vec3(0.0, 1.0, 0.0)), hash3(i + vec3(1.0, 1.0, 0.0)), f.x), f.y),
    mix(mix(hash3(i + vec3(0.0, 0.0, 1.0)), hash3(i + vec3(1.0, 0.0, 1.0)), f.x),
        mix(hash3(i + vec3(0.0, 1.0, 1.0)), hash3(i + vec3(1.0, 1.0, 1.0)), f.x), f.y),
    f.z);
}

float fbm3(vec3 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise3(p);
    p = p * 2.03 + vec3(11.5, 7.3, 4.9);
    a *= 0.55;
  }
  return v;
}

void main() {
  vec2 frag = vUv * uResolution;
  vec2 p = (frag - 0.5 * uResolution) / uResolution.y;

  // 거대 행성의 타원 — 세로 반경 R(뷰포트 높이 정규화). 가로는 접합선(캔버스 하단)에서
  // 좌우 끝까지 꽉 차는 스트레치를 종횡비에서 역산해, 하단 코너의 공백 없이 꽉 찬다.
  float limbAboveSeam = 0.36;
  float R = 0.51 * (uResolution.x / uResolution.y);
  vec2 center = vec2(0.0, limbAboveSeam - 0.5 - R);
  vec2 d = p - center;
  float chordHalf = sqrt(max(R * R - (R - limbAboveSeam) * (R - limbAboveSeam), 1e-4));
  float stretch = max(0.56 * (uResolution.x / uResolution.y) / chordHalf, 1.15);
  d.x /= stretch;
  float dist = length(d);
  float t = dist / R; // 0 중심 → 1 림

  // 심우주 — 다크는 뉴트럴 블랙, 라이트는 종이빛
  vec3 col = mix(vec3(0.043, 0.043, 0.047), vec3(0.945, 0.945, 0.952), uTheme);

  float aboveLimb = max(dist - R, 0.0);
  float glowMask = exp(-aboveLimb * 2.4);

  // 별 — 뉴트럴 화이트, 코로나에서 멀어질수록 선명. 라이트에서는 거의 숨긴다.
  vec2 cell = floor(frag / 2.5);
  float h = hash(cell);
  float twinkle = 0.55 + 0.45 * sin(uTime * (0.4 + h * 0.4) + h * 60.0);
  float star = smoothstep(0.9978, 0.9995, h) * twinkle * (1.0 - smoothstep(0.0, 0.3, glowMask));
  col += vec3(0.92) * star * 0.5 * (1.0 - uTheme * 0.85);

  // 빛 채움 — 중심→접합선 거리(seamDist)에서 시작해 림 바깥까지 완등하는
  // 동심원 호. uLight=0에서도 접합선 아래 슬리버가 살짝 밝다.
  float seamDist = R - limbAboveSeam;
  float rLine = mix(seamDist + 0.08, R + 0.06, uLight);

  float ang = atan(d.y, d.x);
  vec2 dir = vec2(cos(ang), sin(ang));

  // 코로나는 림 바깥에만 존재한다(원반 내부는 순수한 광구 색을 유지).
  float outside = smoothstep(R - 0.004, R, dist);

  // 코로나 — 금색, 저주파 노이즈로 천천히 숨쉰다.
  // 다크에서는 가산, 라이트(일식)에서는 더 밝고 넓게 번지는 주인공.
  float breath = fbm(dir * 1.8 + vec2(uTime * 0.02, -uTime * 0.012));
  float wideDecay = mix(2.2, 1.25, uTheme);
  float coronaTight = exp(-aboveLimb * 9.0) * (0.30 + 0.22 * breath);
  float coronaWide = exp(-aboveLimb * wideDecay) * (0.05 + 0.035 * breath);
  vec3 coronaCol = mix(
    vec3(0.80, 0.55, 0.33),
    vec3(1.0, 0.82, 0.55),
    clamp(coronaTight * 2.2, 0.0, 1.0)
  );
  float coronaS = clamp(coronaTight + coronaWide * 0.8, 0.0, 1.0) * outside;
  // 라이트에서도 처음부터 은은한 온기가 있고, 채움이 진행되며 코로나가 만개한다.
  float coronaStrength = mix(1.0, mix(0.7, 2.2, uLight), uTheme);
  col = mix(col, coronaCol, clamp(coronaS * coronaStrength, 0.0, 1.0));

  // 광구 — 구면 좌표로 샘플링. 빛이 닿은 영역만 살아나고
  // 나머지는 어두운 실루엣(자전 전 표면)으로 남는다.
  if (dist < R) {
    float z = sqrt(R * R - dist * dist);
    vec3 n = vec3(d.x, d.y, z) / R;

    float cSpin = cos(uSpin);
    float sSpin = sin(uSpin);
    vec3 nSpin = vec3(n.x * cSpin + n.z * sSpin, n.y, -n.x * sSpin + n.z * cSpin);

    float cPitch = cos(uPitch);
    float sPitch = sin(uPitch);
    vec3 nr = vec3(nSpin.x, nSpin.y * cPitch - nSpin.z * sPitch, nSpin.y * sPitch + nSpin.z * cPitch);

    // 3D 구면 샘플링 — 경도 atan의 ±π 이음새에서 생기는 크랙이 없다.
    vec3 sp3 = nr * 2.6;
    vec3 drift = vec3(uTime * 0.012, uTime * 0.005, -uTime * 0.008);
    float warp = fbm3(sp3 * 1.4 + drift);
    float grain = fbm3(sp3 * 3.2 + warp * 1.2 - drift * 1.6);
    // 완만한 비등방 필라멘트 — 가늘고 긴 streak가 크랙처럼 읽히지 않게 완화했다.
    float filament = fbm3(vec3(sp3.x * 0.7, sp3.y * 1.9, sp3.z * 0.7) + warp * 0.8);

    // 어두운 실루엣 — 빛이 닿기 전 표면
    vec3 dark = vec3(0.075, 0.028, 0.018);

    // 빛이 닿은 표면 — 홍염 그라데이션. 보이는 부분이 림 근처(t≈1)에 몰려 있으므로
    // edge 톤도 충분히 밝게 유지해야 '채워짐'이 읽힌다.
    vec3 core = vec3(0.34, 0.12, 0.05);
    vec3 mid = vec3(0.26, 0.09, 0.036);
    vec3 edge = vec3(0.15, 0.058, 0.028);

    vec3 litBody = mix(core, mid, smoothstep(0.10, 0.50, t));
    litBody = mix(litBody, edge, smoothstep(0.60, 0.98, t));
    litBody *= 1.0 + (grain - 0.5) * 0.16;
    litBody *= 1.0 + (filament - 0.5) * 0.10;

    // 태양점 — 노이즈 등고선의 얇은 밴드(크랙처럼 보임)가 아니라 부드러운 얼룩으로.
    float spots = fbm3(sp3 * 0.9 + 41.0);
    litBody *= 1.0 - smoothstep(0.52, 0.70, spots) * 0.38;

    float lit = 1.0 - smoothstep(rLine - 0.05, rLine + 0.05, dist);
    vec3 body = mix(dark, litBody, lit);

    body *= 1.0 - smoothstep(0.80, 1.0, t) * 0.30;
    body += vec3(0.90, 0.55, 0.30) * smoothstep(0.90, 1.0, t) * 0.10;

    float limbLine = smoothstep(0.980, 0.998, t) * (1.0 - smoothstep(0.996, 1.0, t));
    body += vec3(1.0, 0.80, 0.50) * limbLine
      * mix(0.55, mix(0.30, 0.95, uLight), uTheme);

    // 다크는 우주색 위 가산, 라이트는 행성색으로 대체(밝은 배경 위 클리핑 방지).
    col = mix(col + body, body, uTheme);
  }

  // 채움 경계선 — 빛이 올라가는 동안 경계에 금빛이 따라붙는다(다크 전용 —
  // 라이트는 아래 금환일식 블록이 col을 대체한다). 원반 내부로만 클리핑해서
  // 경계선이 행성 밖 우주 배경까지 가로지르지 않는다.
  float midFill = 1.0 - smoothstep(0.30, 0.70, abs(uLight * 2.0 - 1.0));
  float terminator = exp(-abs(dist - rLine) * 22.0) * midFill * (1.0 - outside);
  col = mix(col, vec3(1.0, 0.70, 0.40), terminator * 0.30);

  // 라이트 금환일식 — 스크롤에 따라 달이 아래에서 떠올라 태양을 물어 덮고,
  // 완식에서 얇은 백열 금환(ring of fire)이 남는다. 달 궤도가 항상 태양 원반
  // 안쪽이라 하늘로 검은 원반이 드러나는 일은 없고, 외곽은 전부 지수 감쇠
  // 블룸으로 마감해 하드 외곽선을 남기지 않는다.
  float moonScale = 0.965; // 달/태양 반경비 — 금환 두께를 정한다
  float moonRise = R * (1.0 - moonScale) - limbAboveSeam - 0.015; // 화면 하단 아래 시작점
  float moonOffset = mix(moonRise, 0.0, uLight);
  vec2 moonD = d - vec2(0.0, moonOffset);
  float moonDist = length(moonD);

  // 화면상 법선 거리 — 타원 좌우에서도 림 빛 두께가 일정하다.
  float sunEdge = (dist - R) / max(length(vec2(dir.x / stretch, dir.y)), 1e-3);
  vec2 moonDir = moonD / max(moonDist, 1e-3);
  float moonEdge = (moonDist - moonScale * R)
    / max(length(vec2(moonDir.x / stretch, moonDir.y)), 1e-3);
  float edgeAA = max(fwidth(sunEdge), 1.0 / uResolution.y);
  float sunMask = 1.0 - smoothstep(-edgeAA, edgeAA, sunEdge);
  float moonMask = 1.0 - smoothstep(-edgeAA, edgeAA, moonEdge);

  // 하늘 — 크림. 원반 주변에 항상 옅은 황혼 틴트를 깔고, 금환에 가까워질수록
  // 하늘이 살짝 가라앉아 고리의 백열을 받쳐낸다(실제 금환일식도 하늘은 밝다).
  float sunOuter = max(sunEdge, 0.0);
  float sway = fbm(dir * 1.3 + vec2(uTime * 0.015, -uTime * 0.01));
  vec3 sky = vec3(0.945, 0.945, 0.952);
  sky = mix(sky, sky * vec3(0.968, 0.948, 0.918), exp(-sunOuter / 0.18));
  sky = mix(sky, sky * vec3(0.94, 0.925, 0.90), uLight * exp(-sunOuter / 0.12) * 0.8);

  // 백열 광구 — 테이트 헤일로·미드 블룸·와이드 워시 3단 감쇠.
  vec3 blaze = vec3(1.0, 0.96, 0.87);
  float halo = exp(-sunOuter / 0.009) * 0.62;
  float bloom = exp(-sunOuter / 0.035) * (0.34 + 0.08 * sway);
  float wash = exp(-sunOuter / 0.13) * 0.10;
  sky = mix(sky, vec3(1.0, 0.90, 0.70), clamp(halo + bloom, 0.0, 1.0));
  sky += blaze * wash * (1.0 - uLight * 0.35);

  // 원반 — 백열 태양과 그 위에 물리는 에스프레소 달. 금환 안쪽 가장자리는
  // 흰 것에 가깝게 달아오르고, 달 림으로는 그 빛이 살짝 감겨 들어온다.
  vec3 moonCol = vec3(0.12, 0.09, 0.075);
  moonCol += vec3(1.0, 0.80, 0.55) * exp(moonEdge / 0.012) * 0.22 * uLight;
  vec3 disk = blaze * (0.975 + 0.025 * sway);
  disk += vec3(0.05, 0.042, 0.025) * exp(-max(moonEdge, 0.0) / 0.022) * sunMask;
  disk *= 1.0 - smoothstep(-0.10, 0.0, sunEdge) * 0.05;
  vec3 eclipse = mix(sky, mix(disk, moonCol, moonMask), sunMask);

  // 다이아몬드 링 — 초승달이 닳는 마지막 구간, 달 림 위로 스치는 빛 한 점.
  float beadPhase = smoothstep(0.70, 0.92, uLight) * (1.0 - smoothstep(0.985, 1.0, uLight));
  float bead = beadPhase * exp(-abs(moonEdge) / 0.007) * pow(max(moonDir.y, 0.0), 10.0);
  eclipse += vec3(1.0, 0.97, 0.90) * bead * (sunMask * 0.9 + 0.25);

  col = mix(col, eclipse, uTheme);

  // 비네트(테마별 강도) + 디더링(밴딩 방지)
  float vigFloor = mix(0.62, 1.0, uTheme);
  float vig = smoothstep(1.4, 0.4, length(p * vec2(0.9, 1.15)));
  col *= mix(vigFloor, 1.0, vig);
  col += (hash(frag + fract(uTime) * 100.0) - 0.5) / 255.0;

  // 밤 페이드 — 런웨이 끝으로 갈수록 캔버스 하단부가 어둠에 잠긴다.
  // 행성이 위로 떠나며 잘리는 면이 어둠 속에 묻혀, 평평한 섹션 배경과 이어진다.
  vec3 pageBg = mix(vec3(0.102, 0.102, 0.11), vec3(0.965, 0.965, 0.968), uTheme);
  col = mix(col, pageBg, uNight * smoothstep(0.55, 1.0, 1.0 - vUv.y));

  gl_FragColor = vec4(col, 1.0);
}
`;
