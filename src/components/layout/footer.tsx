import Link from "next/link";

interface FooterProps {
  dictionary: {
    privacy: string;
    terms: string;
    contact: string;
    rights: string;
  };
  lang: string;
}

export function Footer({ dictionary, lang }: FooterProps) {
  return (
    <footer className="border-t border-white/10 bg-[#090a0c] py-10">
      <div className="container px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link href={`/${lang}`} className="text-xl font-semibold tracking-[-0.06em] text-white">
            Luie
          </Link>
          <p className="text-sm text-zinc-500">
            © {new Date().getFullYear()} Loop. {dictionary.rights}
          </p>
        </div>

        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-zinc-500">
          <Link href={`/${lang}/privacy`} className="transition-colors hover:text-white">
            {dictionary.privacy}
          </Link>
          <Link href={`/${lang}/terms`} className="transition-colors hover:text-white">
            {dictionary.terms}
          </Link>
          <a href="mailto:team@typetak.com" className="transition-colors hover:text-white">
            {dictionary.contact}
          </a>
        </nav>
      </div>
    </footer>
  );
}
