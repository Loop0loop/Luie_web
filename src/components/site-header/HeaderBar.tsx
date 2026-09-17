import { cn } from "../../lib/cn";
import { Logo } from "../brand/Logo";
import { Button } from "../ui/Button";

const NAV_LINKS = [
  { href: "#features", label: "기능" },
  { href: "#layouts", label: "레이아웃" },
  { href: "#canvas", label: "캔버스 · 그래프" },
  { href: "#faq", label: "Q&A" },
] as const;

/**
 * 헤더의 실제 내용(로고 · 네비게이션 · CTA).
 * 부모가 높이를 결정하므로 이 컴포넌트는 가로 배치만 담당한다.
 */
export function HeaderBar({ floating = false }: { floating?: boolean }) {
  return (
    <div
      className={cn(
        "flex h-full items-center justify-center gap-6 px-6 md:gap-10",
        floating && "md:gap-9",
      )}
    >
      <Logo />
      <nav
        aria-label="주요 메뉴"
        className="hidden items-center gap-8 text-sm text-muted md:flex"
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
      <Button size="sm" href="#download">
        다운로드
      </Button>
    </div>
  );
}
