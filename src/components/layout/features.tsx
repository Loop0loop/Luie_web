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
      className="min-h-screen flex items-center py-20 bg-[hsl(40,8%,96%)] dark:bg-[hsl(240,3%,12%)]"
    >
      <div className="container px-6 w-full">
        {/* Header */}
        <ScrollReveal direction="up" className="text-center mb-16">
          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-foreground/35">
            {dictionary.eyebrow}
          </span>
          <h2 className="font-serif mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            {dictionary.title}
          </h2>
          <p className="mt-4 text-muted-foreground max-w-sm mx-auto text-sm leading-relaxed">
            {dictionary.subtitle}
          </p>
        </ScrollReveal>

        {/* Cards — glass */}
        <div className="grid sm:grid-cols-3 gap-4 lg:gap-6 max-w-4xl mx-auto">
          {dictionary.items.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <ScrollReveal
                key={item.title}
                direction="up"
                delay={i * 0.12}
                className="rounded-3xl p-7 flex flex-col gap-5
                  bg-white/70 dark:bg-white/[0.03]
                  backdrop-blur-xl
                  border border-black/[0.05] dark:border-white/[0.07]
                  shadow-[0_4px_24px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]
                  hover:shadow-[0_8px_36px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_8px_36px_rgba(0,0,0,0.4)]
                  hover:bg-white/90 dark:hover:bg-white/[0.05]
                  transition-all duration-500"
              >
                <div className="w-11 h-11 rounded-2xl bg-foreground/[0.06] border border-foreground/[0.08] flex items-center justify-center">
                  <Icon className="w-5 h-5 text-foreground/55" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base mb-2 text-foreground">
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
