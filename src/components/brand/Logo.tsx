import { cn } from "../../lib/cn";
import { FleurDeLis } from "./FleurDeLis";

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
      <FleurDeLis className="size-5 text-accent" />
      <span className="text-lg font-semibold tracking-tight">Luie</span>
    </a>
  );
}
