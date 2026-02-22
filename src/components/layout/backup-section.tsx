import { ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface BackupSectionProps {
  dictionary: {
    eyebrow: string;
    title: string;
    description: string;
    cta: string;
  };
}

export function BackupSection({ dictionary }: BackupSectionProps) {
  return (
    <section
      id="backup"
      className="relative flex flex-col justify-center overflow-hidden min-h-[100dvh] snap-start snap-always bg-muted/30"
    >
      {/* Very subtle warm tint */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(200,185,165,0.03) 0%, transparent 55%)",
        }}
      />

      <div className="container px-6 w-full py-24">
        <ScrollReveal
          direction="up"
          className="max-w-2xl mx-auto text-center flex flex-col items-center"
        >
          {/* Icon */}
          <div
            className="w-14 h-14 rounded-2xl mb-8 flex items-center justify-center
              bg-zinc-50 dark:bg-zinc-900
              border border-black/5 dark:border-white/10
              shadow-sm"
          >
            <ShieldCheck className="w-6 h-6 text-zinc-600 dark:text-zinc-400" />
          </div>

          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-foreground/40 mb-4">
            {dictionary.eyebrow}
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6 leading-tight text-balance">
            {dictionary.title}
          </h2>

          <p className="text-muted-foreground leading-loose mb-10 max-w-lg text-base text-balance">
            {dictionary.description}
          </p>

          <Button
            variant="outline"
            className="gap-2 rounded-xl text-foreground/80 hover:text-foreground
              bg-transparent hover:bg-zinc-50 dark:hover:bg-zinc-900
              border-black/10 dark:border-white/10
              transition-all duration-300 font-medium h-11 px-6"
          >
            {dictionary.cta}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}
