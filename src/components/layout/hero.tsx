import { Button } from "@/components/ui/button";
import { ArrowRight, Download } from "lucide-react";
import Image from "next/image";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface HeroProps {
  dictionary: {
    appName: string;
    tagline: string;
    description: string;
    ctaDownload: string;
    ctaLearnMore: string;
  };
}

export function Hero({ dictionary }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[calc(100svh-4rem)] items-center overflow-hidden bg-[#08090b] py-20 text-white lg:py-28"
    >
      <div
        aria-hidden
        className="ambient-drift pointer-events-none absolute -left-40 top-[-15rem] -z-10 h-[38rem] w-[38rem] rounded-full bg-blue-600/20 blur-[120px]"
      />
      <div
        aria-hidden
        className="ambient-drift-reverse pointer-events-none absolute -bottom-52 right-[-10rem] -z-10 h-[40rem] w-[40rem] rounded-full bg-indigo-500/15 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:100%_5rem]"
      />

      <div className="container relative px-6 w-full">
        <div className="grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <ScrollReveal direction="up" className="flex max-w-2xl flex-col items-start">
            <p className="border-l-2 border-sky-400 pl-3 text-sm font-medium tracking-[0.04em] text-sky-300">
              {dictionary.appName}
            </p>
            <h1 className="mt-6 text-5xl font-medium leading-[0.98] tracking-[-0.075em] text-balance sm:text-6xl lg:text-[5.5rem] xl:text-[6.5rem]">
              {dictionary.tagline}
            </h1>
            <p className="mt-8 max-w-md text-base leading-7 text-zinc-400 sm:text-lg">
              {dictionary.description}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-2">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-md bg-white px-5 text-sm font-medium text-black transition-colors hover:bg-zinc-200"
              >
                <a href="/api/download/latest">
                  <Download className="mr-2 h-4 w-4" />
                  {dictionary.ctaDownload}
                </a>
              </Button>
              <Button
                asChild
                variant="ghost"
                className="h-12 rounded-md px-4 text-sm text-zinc-300 hover:bg-white/5 hover:text-white"
              >
                <a href="#intro">
                  {dictionary.ctaLearnMore}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
            <p className="mt-5 text-xs text-zinc-500">macOS · Windows · 무료</p>
          </ScrollReveal>

          <ScrollReveal
            direction="scale"
            delay={0.15}
            duration={1.1}
            className="screen-breathe flex w-full items-center justify-center"
          >
            <div className="relative aspect-[4/3] w-full max-w-[720px] overflow-hidden border border-white/15 bg-zinc-900 shadow-[0_28px_80px_rgba(0,0,0,0.5)]">
              <Image
                src="/assets/hero/defulat.png"
                alt="Luie Editor"
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
