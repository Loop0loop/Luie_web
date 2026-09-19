/**
 * Luie 앱 소스(02 섹션 데모에서 alias 임포트)는 electron-vite의 preload
 * 브리지(window.api)와 빌드 타임 define(__APP_*)을 전제로 한다. 랜딩은
 * 브라우저에서 데모만 렌더하므로 실제로는 지연 Proxy(Luie shared/api)의
 * PRELOAD_API_UNAVAILABLE 실패 경로가 쓰인다 — 타입만 맞춰준다.
 */
declare global {
  interface Window {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    api: any;
  }
  const __APP_NAME__: string | undefined;
  const __APP_VERSION__: string | undefined;
}

export {};
