/**
 * 히어로 태양 셰이더 v2 — 절제된 프리미엄 톤.
 *
 * macOS 야간 지구 배경화면의 구도(화면 아랫절을 덮는 거대한 천체 + 위쪽 검은
 * 우주 + 림 빛)를 유지하되, v1의 고채도 용암 룩을 걷어냈다.
 * - 광구: 부드러운 심홍 방사형 그라데이션 바탕 + 도메인 워핑한 미세 입자(±10%)
 * - 필라멘트: 비등방 노이즈로 표면에 결을 만든다
 * - 림: 가장자리 다어케닝 후 얇은 금색 대기선
 * - 코로나: 금색, 넓고 낮은 강도로 천천히 숨쉬기
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

uniform vec2 uResolution;
uniform float uTime;
uniform float uSpin;
uniform float uPitch;
uniform float uLight; // 0=아래쪽만 밝음 → 1=림까지 전부 밝음

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

void main() {
  vec2 frag = vUv * uResolution;
  vec2 p = (frag - 0.5 * uResolution) / uResolution.y;

  // 지평선 59% 지점. 넓게 휘어진 거대한 구체만 보이게 화면 아래로 물린다.
  vec2 center = vec2(0.0, -1.66);
  float R = 1.48;
  vec2 d = p - center;
  float dist = length(d);
  float t = dist / R; // 0 중심 → 1 림

  // 뉴트럴 심우주
  vec3 col = vec3(0.043, 0.043, 0.047);

  float aboveLimb = max(dist - R, 0.0);
  float glowMask = exp(-aboveLimb * 2.4);

  // 별 — 뉴트럴 화이트, 코로나에서 멀어질수록 선명
  vec2 cell = floor(frag / 2.5);
  float h = hash(cell);
  float twinkle = 0.55 + 0.45 * sin(uTime * (0.4 + h * 0.4) + h * 60.0);
  float star = smoothstep(0.9978, 0.9995, h) * twinkle * (1.0 - smoothstep(0.0, 0.3, glowMask));
  col += vec3(0.92) * star * 0.5;

  // 빛 채움 — 경계를 행성 중심 동심원 반경(rLine)으로 정의해 빛이 림과 같은
  // 곡률의 호를 그리며 아래에서 림까지 올라온다. 직선 경계는 원반 밖까지 퍼진다.
  float yLine = mix(-0.44, -0.08, uLight);
  float rLine = yLine - center.y;

  float ang = atan(d.y, d.x);
  vec2 dir = vec2(cos(ang), sin(ang));

  // 코로나는 림 바깥에만 존재한다(원반 내부는 순수한 광구 색을 유지).
  float outside = smoothstep(R - 0.004, R, dist);

  // 코로나 — 금색, 좁고 낮게. 저주파 노이즈로 천천히 숨쉰다.
  float breath = fbm(dir * 1.8 + vec2(uTime * 0.02, -uTime * 0.012));
  float coronaTight = exp(-aboveLimb * 9.0) * (0.30 + 0.22 * breath);
  float coronaWide = exp(-aboveLimb * 2.2) * (0.05 + 0.035 * breath);
  col += vec3(1.0, 0.76, 0.45) * coronaTight * outside;
  col += vec3(0.80, 0.55, 0.33) * coronaWide * outside;

  // 광구 — 구면 좌표로 샘플링. 빛이 닿은 영역만 홍염으로 살아나고
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

    float lon = atan(nr.z, nr.x);
    float lat = asin(clamp(nr.y, -1.0, 1.0));
    vec2 sp = vec2(lon * 1.8, lat * 2.4);

    // 도메인 워핑한 미세 입자 — 절제된 질감(이전 버전 수준)
    vec2 drift = vec2(uTime * 0.012, uTime * 0.005);
    float warp = fbm(sp * 2.0 + drift);
    float grain = fbm(sp * 4.2 + warp * 1.4 - drift * 1.6);
    float filament = fbm(vec2(sp.x * 1.1, sp.y * 3.8) + warp);

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
    litBody *= 1.0 + (filament - 0.5) * 0.08;

    // 드문 태양점
    float spots = fbm(sp * 1.0 + 41.0);
    litBody *= 1.0 - smoothstep(0.40, 0.28, spots) * 0.35;

    float lit = 1.0 - smoothstep(rLine - 0.05, rLine + 0.05, dist);
    vec3 body = mix(dark, litBody, lit);

    // 림 다어케닝 후 얇은 금색 대기선과 그 아래 은은한 온기 (항상 켜져 있다)
    body *= 1.0 - smoothstep(0.80, 1.0, t) * 0.30;
    body += vec3(0.90, 0.55, 0.30) * smoothstep(0.90, 1.0, t) * 0.10;
    float limbLine = smoothstep(0.984, 0.996, t) * (1.0 - smoothstep(0.999, 1.0, t));
    body += vec3(1.0, 0.78, 0.52) * limbLine * 0.55;

    col += body;
  }

  // 채움 경계선 — 빛이 올라가는 동안 경계에 금빛이 따라붙는다.
  // 원반 내부로만 클리핑해서 경계선이 행성 밖 우주 배경까지 가로지르지 않는다.
  float midFill = 1.0 - smoothstep(0.30, 0.70, abs(uLight * 2.0 - 1.0));
  float terminator = exp(-abs(dist - rLine) * 22.0) * midFill * (1.0 - outside);
  col += vec3(1.0, 0.70, 0.40) * terminator * 0.30;

  // 비네트(뉴트럴) + 디더링(밴딩 방지)
  float vig = smoothstep(1.4, 0.4, length(p * vec2(0.9, 1.15)));
  col *= mix(0.62, 1.0, vig);
  col += (hash(frag + fract(uTime) * 100.0) - 0.5) / 255.0;

  // 캔버스 하단 시임 페이드는 없다 — 행성이 잘린 채로 끝난다. 다음 섹션 상단의
  // PlanetNightfall이 같은 톤의 몸체로 이어받아 어두워지므로 절단면은 노출되지 않고,
  // 웜톤 그대로 이어진다.

  gl_FragColor = vec4(col, 1.0);
}
`;
