import { Hero } from "@/components/layout/hero";
import { IntroSection } from "@/components/layout/intro-section";
import { Features } from "@/components/layout/features";
import { BackupSection } from "@/components/layout/backup-section";
import { SyncSection } from "@/components/layout/sync-section";
import { CtaSection } from "@/components/layout/cta-section";
import { getDictionary } from "@/lib/dictionary";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <main className="snap-y snap-mandatory h-[calc(100vh-3.5rem)] overflow-y-auto">
      <Hero dictionary={dictionary.hero} />         
      <IntroSection dictionary={dictionary.intro} />
      <Features dictionary={dictionary.features} />
      <BackupSection dictionary={dictionary.backup} />
      <SyncSection dictionary={dictionary.sync} />
      <CtaSection dictionary={dictionary.cta} />
    </main>
  );
}
