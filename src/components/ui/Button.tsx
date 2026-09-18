import { type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cn } from "../../lib/cn";

type ButtonVariant = "primary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-b from-accent-strong to-accent text-on-accent shadow-cta hover:from-accent hover:to-accent-soft active:brightness-95",
  // foreground 불투명도는 테마와 함께 반전된다 — white/x 고정값은 라이트에서 사라진다.
  ghost:
    "border border-line-strong bg-foreground/5 text-body hover:border-foreground/25 hover:bg-foreground/10",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "h-9 rounded-full px-4 text-sm",
  md: "h-11 rounded-full px-6 text-sm",
  lg: "h-12 rounded-full px-7 text-base",
};

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** 전달하면 <a>로 렌더링한다(섹션 앵커, 다운로드 링크 등). */
  href?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<"button">, "children">;

export function Button({
  variant = "primary",
  size = "md",
  href,
  children,
  className,
  ...rest
}: ButtonProps) {
  const classes = cn(
    "inline-flex cursor-pointer items-center justify-center gap-2 font-semibold transition-all duration-200 select-none",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    className,
  );

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}
