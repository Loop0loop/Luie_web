import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { TypewriterHeading } from "@/components/ui/typewriter-heading";

interface HeroProps {
  dictionary: {
    appName: string;
    tagline: string;
    description: string;
    ctaDownload: string;
    ctaLearnMore: string;
  };
}

const TYPEWRITER_PHRASES = [
  "작가의 흐름을 방해하지 않는",
  "집중할 수 있도록 설계된",
  "이야기를 완성하도록 돕는",
];

export function Hero({ dictionary }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center overflow-hidden min-h-[100dvh] snap-start snap-always pt-14"
    >
      {/* Neutral paper background */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-background"
      />
      {/* Very subtle warm depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: [
            "radial-gradient(ellipse 80% 60% at 15% 40%, rgba(200,185,165,0.05) 0%, transparent 60%)",
            "radial-gradient(ellipse 60% 50% at 85% 70%, rgba(180,170,155,0.03) 0%, transparent 55%)",
          ].join(", "),
        }}
      />

      <div className="container px-6 w-full">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20 items-center">
          {/* Left — text */}
          <ScrollReveal direction="up" className="flex flex-col gap-8">
            {/* Eyebrow */}
            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-foreground/40">
              Word Processor · for Writers
            </span>

            {/* Typewriter heading */}
            <div className="flex flex-col gap-2">
              <div className="text-balance">
                <TypewriterHeading phrases={TYPEWRITER_PHRASES} />
              </div>
              <p className="font-serif text-xl sm:text-2xl text-foreground/30 font-normal italic mt-2">
                워드프로세서, Luie
              </p>
            </div>

            {/* Description */}
            <p className="text-base text-muted-foreground leading-relaxed max-w-sm text-balance">
              {dictionary.description}
            </p>

            {/* CTA */}
            <div className="flex flex-col items-start gap-3 mt-2">
              <Button
                size="lg"
                className="h-11 px-6 rounded-xl font-medium text-sm
                  bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900
                  hover:bg-zinc-800 dark:hover:bg-zinc-200
                  border border-transparent
                  shadow-sm
                  transition-colors duration-200"
              >
                <Download className="mr-2 h-4 w-4" />
                {dictionary.ctaDownload}
              </Button>
              <span className="text-[11px] text-muted-foreground pl-1">
                macOS · 무료
              </span>
            </div>
          </ScrollReveal>

          {/* Right — editor mockup */}
          <ScrollReveal
            direction="left"
            delay={0.25}
            duration={1.1}
            className="hidden lg:flex items-center justify-center w-full"
          >
            <div
              className="w-full max-w-[520px] rounded-2xl overflow-hidden
                bg-white dark:bg-zinc-900/80
                backdrop-blur-3xl
                border border-black/5 dark:border-white/10
                shadow-[0_24px_80px_rgba(0,0,0,0.08)] dark:shadow-[0_24px_80px_rgba(0,0,0,0.5)]"
            >
              {/* Window chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-black/5 dark:border-white/5 bg-zinc-50/50 dark:bg-zinc-900/50">
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
              <div className="grid grid-cols-[120px_1fr] divide-x divide-black/5 dark:divide-white/5 min-h-[380px]">
                {/* Sidebar (Obsidian style) */}
                <div className="bg-zinc-50/80 dark:bg-zinc-950/50 p-3 flex flex-col gap-1">
                  <div className="text-[10px] font-semibold text-muted-foreground/50 uppercase tracking-wider mb-2 px-2">
                    Explorer
                  </div>
                  {["1장. 시작", "2장. 전개", "3장. 위기", "4장. 절정"].map((ch, i) => (
                    <div
                      key={ch}
                      className={`rounded-md px-2 py-1.5 text-xs font-medium transition-colors truncate ${
                        i === 0
                          ? "bg-black/5 dark:bg-white/10 text-foreground"
                          : "text-muted-foreground hover:bg-black/5 dark:hover:bg-white/5"
                      }`}
                    >
                      {ch}
                    </div>
                  ))}
                </div>

                {/* Content (Writer style) */}
                <div className="p-8 space-y-4 bg-white dark:bg-zinc-900">
                  <div className="text-sm font-medium text-muted-foreground/40 mb-6 font-serif tracking-wide">
                    1장. 시작
                  </div>
                  {[85, 100, 92, 65, 0, 95, 100, 80, 55, 0, 70, 90].map((w, i) =>
                    w === 0 ? (
                      <div key={i} className="h-3" />
                    ) : (
                      <div
                        key={i}
                        className="h-2 rounded-sm bg-zinc-200 dark:bg-zinc-800"
                        style={{ width: `${w}%` }}
                      />
                    )
                  )}
                  {/* Cursor blink */}
                  <div className="flex items-center gap-1 mt-2">
                    <div
                      className="h-2 rounded-sm bg-zinc-200 dark:bg-zinc-800"
                      style={{ width: "35%" }}
                    />
                    <div className="w-0.5 h-3.5 bg-blue-500 dark:bg-blue-400 rounded-full animate-blink" />
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
