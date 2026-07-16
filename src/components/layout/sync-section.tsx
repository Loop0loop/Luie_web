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
    <section id="sync" className="bg-[#111216] py-24 sm:py-32 lg:py-40">
      <div className="container px-6">
        <ScrollReveal
          direction="up"
          className="mx-auto grid max-w-5xl items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24"
        >
          <div className="flex flex-col items-start">
            <span className="text-xs font-medium tracking-[0.04em] text-primary">
              {dictionary.eyebrow}
            </span>
            <h2 className="mt-5 text-4xl font-medium leading-[1.04] tracking-[-0.065em] text-balance text-foreground sm:text-5xl lg:text-6xl whitespace-pre-line">
              {dictionary.title}
            </h2>
            <p className="mt-7 max-w-md text-base leading-8 text-muted-foreground sm:text-lg">
              {dictionary.description}
            </p>
          </div>
          <div className="grid min-h-[300px] grid-cols-3 border-y border-foreground/15 sm:min-h-[360px]">
            {["Mac", "iPad", "iPhone"].map((device) => (
              <div
                key={device}
                className="flex items-center justify-center border-r border-foreground/15 last:border-r-0"
              >
                <span className="text-lg font-medium tracking-[-0.04em] text-foreground">
                  {device}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
