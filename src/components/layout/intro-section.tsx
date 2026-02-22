import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface IntroSectionProps {
  dictionary: {
    eyebrow: string;
    title: string;
    description: string;
    imageAlt: string;
  };
}

export function IntroSection({ dictionary }: IntroSectionProps) {
  return (
    <section
      id="intro"
      className="flex flex-col justify-center min-h-[100dvh] snap-start snap-always bg-muted/30"
    >
      <div className="container px-6 w-full py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
          {/* Editor mockup — glass card (Moved to Left) */}
          <ScrollReveal direction="left" delay={0.15} className="order-2 lg:order-1">
            <div
              className="rounded-2xl overflow-hidden
                bg-background/80
                backdrop-blur-3xl
                border border-border
                shadow-[0_16px_48px_rgba(0,0,0,0.06)] dark:shadow-[0_16px_48px_rgba(0,0,0,0.4)]"
              role="img"
              aria-label={dictionary.imageAlt}
            >
              {/* Window chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/50">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                </div>
                <span className="ml-auto text-[10px] text-muted-foreground/50 font-mono tracking-wider">
                  novel-chapter-01.luie
                </span>
              </div>

              {/* Editor layout */}
              <div className="grid grid-cols-[120px_1fr] divide-x divide-border min-h-[320px]">
                {/* Sidebar */}
                <div className="bg-muted/30 p-3 flex flex-col gap-1">
                  <div className="text-[10px] font-semibold text-muted-foreground/50 uppercase tracking-wider mb-2 px-2">
                    Outline
                  </div>
                  {["1장. 시작", "2장. 전개", "3장. 위기", "4장. 절정"].map((ch, i) => (
                    <div
                      key={ch}
                      className={`rounded-md px-2 py-1.5 text-xs font-medium transition-colors truncate ${
                        i === 0
                          ? "bg-accent text-foreground"
                          : "text-muted-foreground hover:bg-accent/50"
                      }`}
                    >
                      {ch}
                    </div>
                  ))}
                </div>

                {/* Content */}
                <div className="p-8 space-y-4 bg-background">
                  <div className="text-sm font-medium text-muted-foreground/40 mb-6 font-serif tracking-wide">
                    1장. 시작
                  </div>
                  {[76, 100, 88, 60, 0, 92, 100, 74, 52].map((w, i) =>
                    w === 0 ? (
                      <div key={i} className="h-3" />
                    ) : (
                      <div
                        key={i}
                        className="h-2 rounded-sm bg-muted"
                        style={{ width: `${w}%` }}
                      />
                    )
                  )}
                  {/* Cursor blink */}
                  <div className="flex items-center gap-1 mt-2">
                    <div
                      className="h-2 rounded-sm bg-muted"
                      style={{ width: "30%" }}
                    />
                    <div className="w-0.5 h-3.5 bg-blue-500 dark:bg-blue-400 rounded-full animate-blink" />
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Text (Moved to Right) */}
          <ScrollReveal direction="right" className="flex flex-col gap-6 order-1 lg:order-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-foreground/40">
              {dictionary.eyebrow}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight whitespace-pre-line text-foreground text-balance">
              {dictionary.title}
            </h2>
            <p className="text-muted-foreground leading-loose whitespace-pre-line text-base text-balance">
              {dictionary.description}
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
