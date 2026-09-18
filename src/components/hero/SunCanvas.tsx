import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useAnimationFrame, useReducedMotion } from "motion/react";
import {
  SUN_FILL_TAIL_MIN_DURATION_S,
  SUN_FILL_TAIL_START,
  SUN_LIGHT_END,
  SUN_LIGHT_START,
  SUN_MAX_PITCH_RAD,
  SUN_MAX_PIXEL_RATIO,
  SUN_NIGHT_END,
  SUN_NIGHT_START,
  SUN_SPIN_RAD_PER_SEC,
} from "../../lib/constants";
import { smoothstep } from "../../lib/math";
import { SUN_PALETTE, SUN_PALETTE_ORDER } from "./sunPalette";
import { SUN_FRAGMENT, SUN_VERTEX } from "./sunShader";

/**
 * 프래그먼트 셰이더가 픽셀당 FBM 5옥타브를 수 회 호출하는 무거운 재질이므로
 * DPR 상한을 두고, 화면 밖·탭 비활성일 때 렌더를 건너뛴다.
 * 스크롤 구간·속도 상수는 lib/constants.ts에 있다.
 */

type SunCanvasProps = {
  /** 0~1 히어로 런웨이 진행도. 빛 채움·밤 페이드·구름각·렌더 게이트로 쓰인다. */
  progress: number;
  className?: string;
};

type SunContext = {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.OrthographicCamera;
  uniforms: {
    uResolution: { value: THREE.Vector2 };
    uTime: { value: number };
    uSpin: { value: number };
    uPitch: { value: number };
    uLight: { value: number };
    uNight: { value: number };
    uTheme: { value: number };
    uPal: { value: THREE.Vector3[] };
  };
  elapsed: number;
  /** 0(다크)~1(라이트)로 보간되는 현재 테마 값. */
  theme: number;
  /** 채움 꼬리(마지막 25%)의 현재 값 — 기저는 스크롤 즉시 반영, 꼬리만 속도 제한(아래). */
  lightTail: number;
  visible: boolean;
};

export function SunCanvas({ progress, className }: SunCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<SunContext | null>(null);
  const progressRef = useRef(progress);
  progressRef.current = progress;
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      powerPreference: "high-performance",
    });
    // 셰이더 상수를 디스플레이 값 그대로 쓴다(sRGB 변환 시 어두운 색이 2~3배 밝아져 워시됨).
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, SUN_MAX_PIXEL_RATIO));

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const uniforms = {
      uResolution: { value: new THREE.Vector2(1, 1) },
      uTime: { value: 0 },
      uSpin: { value: 0 },
      uPitch: { value: 0 },
      uLight: { value: 0 },
      uNight: { value: 0 },
      uTheme: { value: 0 },
      // 색 팔레트 — 값은 고정이라 생성 시 한 번만 채운다(sunPalette.ts가 소스).
      uPal: {
        value: SUN_PALETTE_ORDER.map(
          (key) => new THREE.Vector3(...SUN_PALETTE[key]),
        ),
      },
    };
    const material = new THREE.ShaderMaterial({
      vertexShader: SUN_VERTEX,
      fragmentShader: SUN_FRAGMENT,
      uniforms,
    });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);

    const ctx: SunContext = {
      renderer,
      scene,
      camera,
      uniforms,
      elapsed: 0,
      theme: document.documentElement.dataset.theme === "light" ? 1 : 0,
      lightTail: 0,
      visible: true,
    };
    ctxRef.current = ctx;

    const resize = () => {
      const { clientWidth, clientHeight } = canvas;
      if (clientWidth === 0 || clientHeight === 0) return;
      // DPR은 매번 다시 읽는다 — 마운트 시점 값에 고정하면 웹뷰 배율이
      // 바뀐 뒤 버퍼/CSS 크기가 어긋나 가장자리에 렌더 찌꺼기가 생긴다.
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, SUN_MAX_PIXEL_RATIO));
      renderer.setSize(clientWidth, clientHeight, false);
      const dpr = renderer.getPixelRatio();
      uniforms.uResolution.value.set(clientWidth * dpr, clientHeight * dpr);
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        ctx.visible = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    intersectionObserver.observe(canvas);

    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      ctxRef.current = null;
      mesh.geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  useAnimationFrame((_, deltaMs) => {
    const ctx = ctxRef.current;
    if (!ctx || !ctx.visible || document.hidden) return;
    const p = progressRef.current;
    const deltaSec = deltaMs / 1000;
    // 동작 감소 설정에서는 시간 기반 끓음·자전을 멈춘다(정적 프레임 유지).
    const reduced = reducedMotion ?? false;
    if (!reduced) ctx.elapsed += deltaSec;
    // 테마 전환은 색 크로스페이드라 reduced-motion에서도 부드럽게 따라가게 한다.
    const themeTarget =
      document.documentElement.dataset.theme === "light" ? 1 : 0;
    ctx.theme += (themeTarget - ctx.theme) * Math.min(1, deltaSec * 7);
    // 빛 채움 — 기저(0→SUN_FILL_TAIL_START)는 스크롤 진행도를 그대로 따라간다
    // (느린·보통 스크롤에서 원래 속도 그대로). 마지막 25% 꼬리만 프레임당 이동량을
    // tail길이/SUN_FILL_TAIL_MIN_DURATION_S로 상한한다 — 급스크롤로 진행도가 점프해도
    // 완등 순간은 항상 최소한 이 시간에 걸쳐 보이게 마무리된다(다크 채움·라이트
    // 일식이 같은 uLight를 쓰므로 테마 무관). 위로 스크롤해 꼬리가 빠질 때도 대칭.
    const lightTarget = smoothstep(SUN_LIGHT_START, SUN_LIGHT_END, p);
    if (reduced) {
      ctx.lightTail = Math.max(lightTarget - SUN_FILL_TAIL_START, 0);
    } else {
      const tailTarget = Math.max(lightTarget - SUN_FILL_TAIL_START, 0);
      const tailRate = (1 - SUN_FILL_TAIL_START) / SUN_FILL_TAIL_MIN_DURATION_S;
      const maxStep = deltaSec * tailRate;
      ctx.lightTail += Math.min(
        maxStep,
        Math.max(-maxStep, tailTarget - ctx.lightTail),
      );
    }
    ctx.uniforms.uTime.value = ctx.elapsed;
    ctx.uniforms.uSpin.value = reduced ? 0 : ctx.elapsed * SUN_SPIN_RAD_PER_SEC;
    ctx.uniforms.uPitch.value = reduced ? 0 : p * SUN_MAX_PITCH_RAD;
    ctx.uniforms.uLight.value = Math.min(lightTarget, SUN_FILL_TAIL_START) + ctx.lightTail;
    ctx.uniforms.uNight.value = smoothstep(SUN_NIGHT_START, SUN_NIGHT_END, p);
    ctx.uniforms.uTheme.value = ctx.theme;
    ctx.renderer.render(ctx.scene, ctx.camera);
  });

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className ?? "h-full w-full"}
    />
  );
}
