import { Users, Link2, LayoutTemplate } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface FeaturesProps {
  dictionary: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: { title: string; description: string }[];
  };
}

const ICONS = [Users, Link2, LayoutTemplate];

export function Features({ dictionary }: FeaturesProps) {
  return (
    <section
      id="features"
      className="flex flex-col justify-center min-h-[100dvh] snap-start snap-always bg-background"
    >
      <div className="container px-6 w-full py-24">
        {/* Header */}
        <ScrollReveal direction="up" className="text-center mb-16">
          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-foreground/40">
            {dictionary.eyebrow}
          </span>
          <h2 className="font-serif mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-balance">
            {dictionary.title}
          </h2>
          <p className="mt-4 text-muted-foreground max-w-sm mx-auto text-base leading-relaxed text-balance">
            {dictionary.subtitle}
          </p>
        </ScrollReveal>

        {/* Cards — Bento Box Style */}
        <div className="grid sm:grid-cols-3 gap-4 lg:gap-6 max-w-5xl mx-auto">
          {dictionary.items.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <ScrollReveal
                key={item.title}
                direction="up"
                delay={i * 0.12}
                className="rounded-2xl p-8 flex flex-col gap-6
                  bg-white dark:bg-zinc-900/80
                  border border-black/5 dark:border-white/10
                  shadow-sm hover:shadow-md
                  transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg mb-2 text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
