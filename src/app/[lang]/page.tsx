import { Hero } from "@/components/layout/hero";
import { IntroSection } from "@/components/layout/intro-section";
import { Features } from "@/components/layout/features";
import { BackupSection } from "@/components/layout/backup-section";
import { SyncSection } from "@/components/layout/sync-section";
import { CtaSection } from "@/components/layout/cta-section";
import { getDictionary } from "@/lib/dictionary";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <main className="overflow-hidden">
      <Hero dictionary={dictionary.hero} />
      <IntroSection dictionary={dictionary.intro} />
      <Features dictionary={dictionary.features} />
      <BackupSection dictionary={dictionary.backup} />
      <SyncSection dictionary={dictionary.sync} />
      <CtaSection dictionary={dictionary.cta} />
    </main>
  );
}
