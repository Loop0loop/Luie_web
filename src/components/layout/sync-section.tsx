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
      className="min-h-screen flex items-center py-20 bg-[hsl(40,8%,96%)] dark:bg-[hsl(240,3%,12%)]"
    >
      <div className="container px-6 w-full">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-center">
          {/* Device visual */}
          <SyncVisual />

          {/* Text */}
          <ScrollReveal
            direction="right"
            delay={0.15}
            className="flex flex-col gap-6"
          >
            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-foreground/35">
              {dictionary.eyebrow}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight whitespace-pre-line text-foreground">
              {dictionary.title}
            </h2>
            <p className="text-muted-foreground leading-loose text-base">
              {dictionary.description}
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
