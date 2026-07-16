import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface CtaSectionProps {
  dictionary: {
    title: string;
    description: string;
    cta: string;
  };
}

export function CtaSection({ dictionary }: CtaSectionProps) {
  return (
    <section id="cta" className="bg-[#08090b] py-24 text-zinc-50 sm:py-32 lg:py-40">
      <div className="container px-6">
        <ScrollReveal
          direction="up"
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <h2 className="text-4xl font-medium leading-[1.04] tracking-[-0.065em] text-zinc-50 text-balance sm:text-5xl lg:text-6xl whitespace-pre-line">
            {dictionary.title}
          </h2>
          <p className="mt-7 max-w-lg text-base leading-8 text-zinc-400 sm:text-lg">
            {dictionary.description}
          </p>
          <Button
            asChild
            size="lg"
            className="mt-10 h-12 rounded-md bg-white px-6 text-sm font-medium text-black transition-colors hover:bg-white/85"
          >
            <a href="/api/download/latest">
              {dictionary.cta}
              <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}
