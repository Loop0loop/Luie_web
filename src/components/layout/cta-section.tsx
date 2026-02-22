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
    <section
      id="cta"
      className="relative flex flex-col justify-center overflow-hidden min-h-[100dvh] snap-start snap-always bg-zinc-950 text-zinc-50"
    >
      {/* Very subtle depth gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 60%, rgba(255,255,255,0.04) 0%, transparent 55%)",
        }}
      />

      <div className="container px-6 relative z-10 w-full py-24">
        <ScrollReveal
          direction="up"
          className="max-w-xl mx-auto text-center flex flex-col items-center"
        >
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-50 mb-5 whitespace-pre-line leading-tight text-balance">
            {dictionary.title}
          </h2>
          <p className="text-zinc-400 leading-loose mb-10 text-base max-w-sm text-balance">
            {dictionary.description}
          </p>
          <Button
            size="lg"
            className="h-11 px-8 rounded-xl font-medium text-sm gap-2 border border-transparent
              bg-zinc-50 text-zinc-950
              hover:bg-zinc-200
              shadow-sm
              transition-colors duration-200"
          >
            {dictionary.cta}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}
