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
    <footer className="border-t border-border bg-background py-12 snap-start snap-always">
      <div className="container px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link href={`/${lang}`} className="font-serif font-bold text-lg tracking-tight text-foreground">
            Luie
          </Link>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} 라이티브(Litive). {dictionary.rights}
          </p>
        </div>

        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-muted-foreground">
          <Link href={`/${lang}/privacy`} className="hover:text-foreground transition-colors">
            {dictionary.privacy}
          </Link>
          <Link href={`/${lang}/terms`} className="hover:text-foreground transition-colors">
            {dictionary.terms}
          </Link>
          <a href="mailto:team@typetak.com" className="hover:text-foreground transition-colors">
            {dictionary.contact}
          </a>
        </nav>
      </div>
    </footer>
  );
}
