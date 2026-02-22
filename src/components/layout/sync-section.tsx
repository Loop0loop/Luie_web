import { SyncVisual } from "@/components/ui/sync-visual";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface SyncSectionProps {
  dictionary: {
    eyebrow: string;
    title: string;
    description: string;
  };
}

export function SyncSection({ dictionary }: SyncSectionProps) {
  return (
    <section
      id="sync"
      className="flex flex-col justify-center min-h-[100dvh] snap-start snap-always bg-background"
    >
      <div className="container px-6 w-full py-24">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-center">
          {/* Text (Moved to Left) */}
          <ScrollReveal
            direction="left"
            delay={0.15}
            className="flex flex-col gap-6 order-1"
          >
            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-foreground/40">
              {dictionary.eyebrow}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight whitespace-pre-line text-foreground text-balance">
              {dictionary.title}
            </h2>
            <p className="text-muted-foreground leading-loose text-base text-balance">
              {dictionary.description}
            </p>
          </ScrollReveal>

          {/* Device visual (Moved to Right) */}
          <div className="order-2">
            <SyncVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
