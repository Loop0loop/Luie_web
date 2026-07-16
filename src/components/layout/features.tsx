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
    <section id="features" className="bg-[#0b0c0e] py-24 sm:py-32 lg:py-40">
      <div className="container px-6">
        <ScrollReveal direction="up" className="mb-14 max-w-2xl sm:mb-20">
          <span className="text-xs font-medium tracking-[0.04em] text-primary">
            {dictionary.eyebrow}
          </span>
          <h2 className="mt-5 text-5xl font-medium leading-none tracking-[-0.075em] text-foreground sm:text-6xl lg:text-7xl">
            {dictionary.title}
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
            {dictionary.subtitle}
          </p>
        </ScrollReveal>

        <div className="grid border-y border-border md:grid-cols-3">
          {dictionary.items.map((item, i) => {
            const imagePath = FEATURE_IMAGES[i];
            return (
              <ScrollReveal
                key={item.title}
                direction="up"
                delay={i * 0.12}
                className="group relative border-b border-border py-8 last:border-b-0 md:border-b-0 md:px-7 md:first:pl-0 md:last:pr-0 md:not(:last-child):border-r"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden border border-foreground/15 bg-[#10131c]">
                  {imagePath && (
                    <Image
                      src={imagePath}
                      alt={item.title}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover"
                    />
                  )}
                </div>

                <div className="pt-6">
                  <span className="text-xs text-primary">0{i + 1}</span>
                  <h3 className="mt-2 text-xl font-medium tracking-[-0.04em] text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.description}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
