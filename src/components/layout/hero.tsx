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
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Neutral paper background */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[hsl(40,18%,98%)] dark:bg-[hsl(240,3%,11%)]"
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
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20 items-center min-h-[calc(100vh-3.5rem)] py-24">
          {/* Left — text */}
          <ScrollReveal direction="up" className="flex flex-col gap-8">
            {/* Eyebrow */}
            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-foreground/35">
              Word Processor · for Writers
            </span>

            {/* Typewriter heading */}
            <div className="flex flex-col gap-2">
              <TypewriterHeading phrases={TYPEWRITER_PHRASES} />
              <p className="font-serif text-xl sm:text-2xl text-foreground/25 font-normal italic">
                워드프로세서, Luie
              </p>
            </div>

            {/* Description */}
            <p className="text-base text-muted-foreground leading-relaxed max-w-xs">
              {dictionary.description}
            </p>

            {/* CTA */}
            <div className="flex flex-col items-start gap-2">
              <Button
                size="lg"
                className="h-12 px-7 rounded-2xl font-medium text-sm
                  bg-foreground text-background
                  hover:opacity-75
                  border-0
                  transition-opacity duration-200"
              >
                <Download className="mr-2 h-4 w-4" />
                {dictionary.ctaDownload}
              </Button>
              <span className="text-[11px] text-foreground/28 pl-1">
                macOS · 무료
              </span>
            </div>
          </ScrollReveal>

          {/* Right — editor mockup */}
          <ScrollReveal
            direction="left"
            delay={0.25}
            duration={1.1}
            className="hidden lg:flex items-center justify-center"
          >
            <div
              className="w-full max-w-[480px] rounded-3xl overflow-hidden
                bg-white/80 dark:bg-white/[0.04]
                backdrop-blur-2xl
                border border-black/[0.06] dark:border-white/[0.07]
                shadow-[0_16px_64px_rgba(0,0,0,0.07)] dark:shadow-[0_16px_64px_rgba(0,0,0,0.55)]"
            >
              {/* Window chrome */}
              <div className="flex items-center gap-1.5 px-4 py-3.5 border-b border-black/[0.04] dark:border-white/[0.05] bg-black/[0.015] dark:bg-white/[0.02]">
                <span className="w-3 h-3 rounded-full bg-rose-300/60" />
                <span className="w-3 h-3 rounded-full bg-amber-300/60" />
                <span className="w-3 h-3 rounded-full bg-emerald-300/60" />
                <span className="ml-auto text-[11px] text-muted-foreground/35 font-mono">
                  novel-chapter-01.luie
                </span>
              </div>

              {/* Editor layout */}
              <div className="grid grid-cols-[88px_1fr] divide-x divide-black/[0.04] dark:divide-white/[0.05] min-h-[340px]">
                {/* Sidebar */}
                <div className="bg-black/[0.01] dark:bg-white/[0.015] p-3 flex flex-col gap-1.5">
                  {["1장", "2장", "3장", "4장"].map((ch, i) => (
                    <div
                      key={ch}
                      className={`rounded-lg px-2.5 py-2 text-xs font-medium transition-colors ${
                        i === 0
                          ? "bg-foreground/[0.07] text-foreground/65"
                          : "text-muted-foreground/30"
                      }`}
                    >
                      {ch}
                    </div>
                  ))}
                </div>

                {/* Content */}
                <div className="p-7 space-y-3">
                  <div className="text-xs font-medium text-muted-foreground/30 mb-5 font-serif">
                    1장. 시작
                  </div>
                  {[76, 100, 88, 60, 0, 92, 100, 74, 52, 0, 68, 95].map((w, i) =>
                    w === 0 ? (
                      <div key={i} className="h-2" />
                    ) : (
                      <div
                        key={i}
                        className="h-2.5 rounded-full bg-foreground/[0.055]"
                        style={{ width: `${w}%` }}
                      />
                    )
                  )}
                  {/* Cursor blink */}
                  <div className="flex items-center gap-0.5 mt-1">
                    <div
                      className="h-2.5 rounded-full bg-foreground/[0.055]"
                      style={{ width: "28%" }}
                    />
                    <div className="w-0.5 h-4 bg-foreground/35 rounded-full animate-blink" />
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
