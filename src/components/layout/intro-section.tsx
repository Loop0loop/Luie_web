import { ScrollReveal } from "@/components/ui/scroll-reveal";
import Image from "next/image";

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
    <section id="intro" className="bg-[#111216] py-24 sm:py-32 lg:py-40">
      <div className="container px-6">
        <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-24">
          <ScrollReveal
            direction="left"
            delay={0.15}
            className="order-2 flex justify-center lg:order-1"
          >
            <div className="relative w-full max-w-[680px] overflow-hidden border border-foreground/15 bg-zinc-950 p-1 shadow-[0_18px_45px_rgba(15,23,42,0.14)] dark:border-white/10">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/assets/section-1/image.png"
                  alt={dictionary.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal
            direction="right"
            className="order-1 flex max-w-xl flex-col items-start lg:order-2"
          >
            <span className="text-xs font-medium tracking-[0.04em] text-primary">
              {dictionary.eyebrow}
            </span>
            <h2 className="mt-5 text-4xl font-medium leading-[1.04] tracking-[-0.065em] text-balance text-foreground sm:text-5xl lg:text-6xl whitespace-pre-line">
              {dictionary.title}
            </h2>
            <p className="mt-7 max-w-md text-base leading-8 text-muted-foreground sm:text-lg whitespace-pre-line">
              {dictionary.description}
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
