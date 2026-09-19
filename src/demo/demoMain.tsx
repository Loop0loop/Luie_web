import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { DndContext } from "@dnd-kit/core";
import { DialogProvider } from "@shared/ui/DialogProvider";
import { ToastProvider } from "@shared/ui/Toast";
import ResearchDemo from "../components/features/demos/ResearchDemo";
import SmartLinkDemo from "../components/features/demos/SmartLinkDemo";
import SnapshotDemo from "../components/features/demos/SnapshotDemo";
import StorylineDemo from "../components/features/demos/StorylineDemo";
import { ensureLuieDemoReady } from "./seed";
import "./demo.css";

const DEMOS = {
  snapshot: SnapshotDemo,
  smartLink: SmartLinkDemo,
  research: ResearchDemo,
  storyline: StorylineDemo,
} as const;

type DemoCard = keyof typeof DEMOS;

const params = new URLSearchParams(window.location.search);
const card = (params.get("card") ?? "snapshot") as DemoCard;
const lang = params.get("lang") ?? "ko";
const Demo = DEMOS[card] ?? SnapshotDemo;

// 랜딩 i18n(getLocale)과 Luie i18n이 같은 언어를 쓰게 문서에 심는다.
document.documentElement.lang = lang;

// 테마는 랜딩 페이지의 data-theme을 따라간다(같은 오리진이라 직접 구독).
const parentHtml =
  window.parent !== window ? window.parent.document.documentElement : null;
if (parentHtml) {
  const syncTheme = () => {
    document.documentElement.dataset.theme =
      parentHtml.dataset.theme === "light" ? "light" : "dark";
  };
  syncTheme();
  new MutationObserver(syncTheme).observe(parentHtml, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
}

ensureLuieDemoReady(lang).then(() => {
  createRoot(document.getElementById("demo-root")!).render(
    <StrictMode>
      <ToastProvider>
        <DialogProvider>
          <DndContext>
            <Demo />
          </DndContext>
        </DialogProvider>
      </ToastProvider>
    </StrictMode>,
  );
});
