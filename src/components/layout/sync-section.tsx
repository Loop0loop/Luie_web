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
        <ScrollReveal
          direction="up"
          className="flex flex-col gap-6 items-center text-center max-w-2xl mx-auto"
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
      </div>
    </section>
  );
}
