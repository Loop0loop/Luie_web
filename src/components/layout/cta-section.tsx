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
      className="min-h-screen flex items-center py-20 relative overflow-hidden bg-[hsl(40,18%,98%)] dark:bg-[hsl(240,3%,11%)]"
    >
      {/* Very subtle depth gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 60%, rgba(180,170,155,0.05) 0%, transparent 55%)",
        }}
      />

      <div className="container px-6 relative z-10 w-full">
        <ScrollReveal
          direction="up"
          className="max-w-xl mx-auto text-center flex flex-col items-center"
        >
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-5 whitespace-pre-line leading-tight">
            {dictionary.title}
          </h2>
          <p className="text-muted-foreground leading-loose mb-10 text-base max-w-sm">
            {dictionary.description}
          </p>
          <Button
            size="lg"
            className="h-12 px-10 rounded-2xl font-medium text-sm gap-2 border-0
              bg-foreground text-background
              hover:opacity-75
              transition-opacity duration-200"
          >
            {dictionary.cta}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}
