import { cn } from "../../lib/cn";
import { useI18n } from "../../i18n";

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  const t = useI18n();

  return (
    <a
      href="#top"
      aria-label={t.brand.homeAria}
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
