import { cn } from "../../lib/cn";
import { Logo } from "../brand/Logo";
import { Button } from "../ui/Button";
import { ThemeToggle } from "../ui/ThemeToggle";

const NAV_LINKS = [
  { href: "#features", label: "기능" },
  { href: "#layouts", label: "레이아웃" },
  { href: "#canvas", label: "캔버스 · 그래프" },
  { href: "#faq", label: "Q&A" },
] as const;

type HeaderBarProps = {
  /** 플로팅 상태에서는 필 안에 맞춰 한 덩어리로 모인다. */
  floating?: boolean;
};

/**
 * 헤더의 실제 내용(로고 · 네비게이션 · 테마 토글 · CTA).
 * 전체 바 상태에서는 콘텐츠가 중앙 70% 안에만 존재한다 — 외곽 30%는
 * safe-area로 어떤 요소도 들어가지 못하는 여백이다. 플로팅 필에서는
 * 간격을 좁혀 한 덩어리로 중앙에 모인다.
 */
export function HeaderBar({ floating = false }: HeaderBarProps) {
  return (
    <div
      className={cn(
        "flex h-full items-center",
        floating
          ? "justify-center gap-6 px-6"
          : "mx-auto w-[max(70%,340px)] justify-between px-[max(0.5rem,env(safe-area-inset-left))]",
      )}
    >
      <Logo />
      <nav
        aria-label="주요 메뉴"
        className={cn(
          "hidden items-center text-sm text-muted md:flex",
          floating ? "gap-8" : "gap-12 xl:gap-16",
        )}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="transition-colors duration-200 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            {link.label}
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-1.5">
        <ThemeToggle />
        <Button size="sm" href="#download">
          다운로드
        </Button>
      </div>
    </div>
  );
}
