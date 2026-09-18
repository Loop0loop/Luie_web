import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const root = (path: string) => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // 언어별 정적 엔트리(/, /en/, /ja/) — SPA 폴백을 끊고 각 경로가
  // 자기 index.html을 서빙하게 한다(dev·preview·정적 호스팅 모두 동일 규칙).
  appType: "mpa",
  build: {
    rollupOptions: {
      input: {
        main: root("index.html"),
        en: root("en/index.html"),
        ja: root("ja/index.html"),
      },
      output: {
        // three(600KB+)와 react/motion을 별도 청크로 분리해
        // 앱 코드 수정 시에도 캐시가 살아있게 한다.
        manualChunks(id) {
          if (id.includes("node_modules/three")) return "three";
          if (
            /[\\/]node_modules[\\/](react|react-dom|motion|motion-dom|motion-utils|scheduler)[\\/]/.test(
              id,
            )
          ) {
            return "vendor";
          }
          return undefined;
        },
      },
    },
  },
});
