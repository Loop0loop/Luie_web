import { use, type ReactNode } from "react";
import { DndContext } from "@dnd-kit/core";
import { DialogProvider } from "@shared/ui/DialogProvider";
import { ToastProvider } from "@shared/ui/Toast";
import { ensureLuieDemoReady } from "./luieDemoBootstrap";

/**
 * Luie renderer UI는 initI18n(i18next 리소스 로딩)이 끝나야 올바른 언어로
 * 그려지고, Sidebar·MainLayout·AI 패널이 앱과 같은 컨텍스트를 요구한다 —
 * 실제 앱(main.tsx + 워크스페이스 셸)과 동일한 프로바이더 트리로 감싼다.
 */
export function LuieDemoGate({ children }: { children: ReactNode }) {
  use(ensureLuieDemoReady());
  return (
    <ToastProvider>
      <DialogProvider>
        <DndContext>{children}</DndContext>
      </DialogProvider>
    </ToastProvider>
  );
}
