import { ScrollReveal } from "@/components/ui/scroll-reveal";
import Image from "next/image";

interface FeaturesProps {
  dictionary: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: {
      title: string;
      description: string;
    }[];
  };
}

const FEATURE_IMAGES = [
  "/assets/section-2/chr.png",
  "/assets/section-2/smartLink.png",
  "/assets/section-2/layout.png",
];

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
        <div className="grid sm:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {dictionary.items.map((item, i) => {
            const imagePath = FEATURE_IMAGES[i];
            return (
              <ScrollReveal
                key={item.title}
                direction="up"
                delay={i * 0.12}
                className="group relative rounded-3xl overflow-hidden
                  bg-muted/30 hover:bg-muted/50
                  border border-border/50
                  transition-all duration-500"
              >
                {/* Image Container */}
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-background">
                  {imagePath && (
                    <Image
                      src={imagePath}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                </div>
                
                {/* Content */}
                <div className="p-6 md:p-8">
                  <h3 className="font-serif font-bold text-lg mb-3 text-foreground">
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
