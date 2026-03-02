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
    <section
      id="intro"
      className="flex flex-col justify-center min-h-[100dvh] snap-start snap-always bg-muted/30"
    >
      <div className="container px-6 w-full py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
          {/* Editor mockup — glass card (Moved to Left) */}
          <ScrollReveal direction="left" delay={0.15} className="order-2 lg:order-1 flex justify-center">
            <div className="relative w-full max-w-[600px] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-border">
              <Image
                src="/assets/section-1/image.png"
                alt={dictionary.imageAlt}
                fill
                className="object-cover"
              />
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
