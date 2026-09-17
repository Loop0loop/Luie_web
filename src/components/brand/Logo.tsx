import { cn } from "../../lib/cn";

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <a
      href="#top"
      aria-label="Luie 홈으로 이동"
      className={cn(
        "flex items-center gap-2 rounded-full text-foreground transition-colors hover:text-accent-strong focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
        className,
      )}
    >
      <img src="/luie.png" alt="" className="size-7" />
      <span className="text-lg font-semibold tracking-tight">Luie</span>
    </a>
  );
}
