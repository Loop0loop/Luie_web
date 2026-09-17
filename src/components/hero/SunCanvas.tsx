import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useAnimationFrame, useReducedMotion } from "motion/react";
import { SUN_FRAGMENT, SUN_VERTEX } from "./sunShader";

/**
 * 프래그먼트 셰이더가 픽셀당 FBM 5옥타브를 수 회 호출하는 무거운 재질이므로
 * DPR 상한을 두고, 화면 밖·탭 비활성·페이드 완료 시 렌더를 건너뛴다.
 */
const MAX_PIXEL_RATIO = 1.25;
/** 히어로 페이드가 끝나는 진행도. 이후 프레임은 투명하므로 그릴 필요가 없다. */
const FADE_DONE_PROGRESS = 0.96;
/** 런웨이 전체 스크롤에 대응하는 X축 구름각(라디안) — 표면이 아래에서 위로 흐른다. */
const MAX_PITCH = 1.2;
/** 시간 기반 Y축 자전 속도(라디안/초). 천천히, 배경 정도로만 움직인다. */
const SPIN_RAD_PER_SEC = 0.03;

type SunCanvasProps = {
  /** 0~1 히어로 런웨이 진행도. 구름각과 렌더 게이트로 쓰인다. */
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
  };
  elapsed: number;
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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, MAX_PIXEL_RATIO));

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const uniforms = {
      uResolution: { value: new THREE.Vector2(1, 1) },
      uTime: { value: 0 },
      uSpin: { value: 0 },
      uPitch: { value: 0 },
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
      visible: true,
    };
    ctxRef.current = ctx;

    const resize = () => {
      const { clientWidth, clientHeight } = canvas;
      if (clientWidth === 0 || clientHeight === 0) return;
      renderer.setSize(clientWidth, clientHeight, false);
      uniforms.uResolution.value.set(
        clientWidth * renderer.getPixelRatio(),
        clientHeight * renderer.getPixelRatio(),
      );
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
    if (!ctx) return;
    if (!ctx.visible || document.hidden) return;
    const p = progressRef.current;
    if (p >= FADE_DONE_PROGRESS) return;
    // 동작 감소 설정에서는 시간 기반 끓음·구름을 멈춘다(정적 프레임 유지).
    const reduced = reducedMotion ?? false;
    if (!reduced) ctx.elapsed += deltaMs / 1000;
    ctx.uniforms.uTime.value = ctx.elapsed;
    ctx.uniforms.uSpin.value = reduced ? 0 : ctx.elapsed * SPIN_RAD_PER_SEC;
    ctx.uniforms.uPitch.value = reduced ? 0 : p * MAX_PITCH;
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
