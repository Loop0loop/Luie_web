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

  // 광구 — 부드러운 방사형 그라데이션 + 미세 입자.
  // 스크롤이 X축 구름(표면이 아래에서 위로 흐름), 시간이 Y축 자전을 만든다.
  if (dist < R) {
    float z = sqrt(R * R - dist * dist);
    vec3 n = vec3(d.x, d.y, z) / R;

    float ca = cos(uSpin);
    float sa = sin(uSpin);
    vec3 nSpin = vec3(n.x * ca + n.z * sa, n.y, -n.x * sa + n.z * ca);

    float cp = cos(uPitch);
    float sp = sin(uPitch);
    vec3 nr = vec3(nSpin.x, nSpin.y * cp - nSpin.z * sp, nSpin.y * sp + nSpin.z * cp);

    float lon = atan(nr.z, nr.x);
    float lat = asin(clamp(nr.y, -1.0, 1.0));
    vec2 sp = vec2(lon * 1.8, lat * 2.4);

    // 도메인 워핑한 입자 — 낮은 진폭으로 질감만 만든다
    vec2 drift = vec2(uTime * 0.012, uTime * 0.005);
    float warp = fbm(sp * 2.0 + drift);
    float grain = fbm(sp * 4.2 + warp * 1.4 - drift * 1.6);
    float filament = fbm(vec2(sp.x * 1.1, sp.y * 3.8) + warp);

    vec3 core = vec3(0.155, 0.052, 0.030);
    vec3 mid = vec3(0.110, 0.038, 0.024);
    vec3 edge = vec3(0.055, 0.024, 0.018);

    vec3 body = mix(core, mid, smoothstep(0.15, 0.62, t));
    body = mix(body, edge, smoothstep(0.55, 1.0, t));
    body *= 1.0 + (grain - 0.5) * 0.14;
    body *= 1.0 + (filament - 0.5) * 0.08;

    // 드문 태양점
    float spots = fbm(sp * 1.0 + 41.0);
    body *= 1.0 - smoothstep(0.40, 0.28, spots) * 0.30;

    // 림 다어케닝 후 얇은 금색 대기선과 그 아래 은은한 온기
    body *= 1.0 - smoothstep(0.80, 1.0, t) * 0.30;
    body += vec3(0.90, 0.55, 0.30) * smoothstep(0.90, 1.0, t) * 0.10;
    float limbLine = smoothstep(0.984, 0.996, t) * (1.0 - smoothstep(0.999, 1.0, t));
    body += vec3(1.0, 0.78, 0.52) * limbLine * 0.55;

    col += body;
  }

  // 비네트(뉴트럴) + 디더링(밴딩 방지)
  float vig = smoothstep(1.4, 0.4, length(p * vec2(0.9, 1.15)));
  col *= mix(0.62, 1.0, vig);
  col += (hash(frag + fract(uTime) * 100.0) - 0.5) / 255.0;

  gl_FragColor = vec4(col, 1.0);
}
`;
