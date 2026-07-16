import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

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
    <section id="backup" className="bg-[#121315] py-24 text-zinc-50 sm:py-32 lg:py-40">
      <div className="container px-6">
        <ScrollReveal
          direction="up"
          className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-24"
        >
          <div className="relative aspect-[1.25/1] w-full overflow-hidden border border-white/15 bg-[#0c0f15] p-1">
            <div className="relative h-full overflow-hidden">
              <Image
                src="/assets/section-3/snap.png"
                alt="Backup Feature"
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col items-start">
            <span className="text-xs font-medium tracking-[0.04em] text-white/65">
              {dictionary.eyebrow}
            </span>

            <h2 className="mt-5 text-4xl font-medium leading-[1.04] tracking-[-0.065em] text-balance sm:text-5xl lg:text-6xl">
              {dictionary.title}
            </h2>

            <p className="mt-7 max-w-md text-base leading-8 text-zinc-400 sm:text-lg">
              {dictionary.description}
            </p>

            <Button
              variant="outline"
              className="mt-9 h-11 rounded-md border-white/20 bg-transparent px-5 text-zinc-100 hover:bg-white/10 hover:text-white"
            >
              {dictionary.cta}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
