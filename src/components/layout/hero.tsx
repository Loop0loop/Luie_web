import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Image from "next/image";
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
          {/* Left — Image */}
          <ScrollReveal
            direction="scale"
            delay={0.25}
            duration={1.1}
            className="flex items-center justify-center w-full order-last lg:order-first"
          >
            <div className="relative w-full max-w-[640px] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-border/10">
              <Image
                src="/assets/hero/defulat.png"
                alt="Luie Editor"
                fill
                className="object-cover"
                priority
              />
            </div>
          </ScrollReveal>

          {/* Right — text */}
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
                asChild
                size="lg"
                className="h-11 px-6 rounded-xl font-medium text-sm
                  bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900
                  hover:bg-zinc-800 dark:hover:bg-zinc-200
                  border border-transparent
                  shadow-sm
                  transition-colors duration-200"
              >
                <a href="/api/download/latest">
                  <Download className="mr-2 h-4 w-4" />
                  {dictionary.ctaDownload}
                </a>
              </Button>
              <span className="text-[11px] text-muted-foreground pl-1">
                macOS · Windows · 무료
              </span>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
