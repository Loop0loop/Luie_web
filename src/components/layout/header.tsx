"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";

interface HeaderProps {
  dictionary: {
    features: string;
    security: string;
    sync: string;
    download: string;
  };
}

export function Header({ dictionary }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navLinks = [
    { href: "#features", label: dictionary.features },
    { href: "#backup", label: dictionary.security },
    { href: "#sync", label: dictionary.sync },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#090a0c]/85 backdrop-blur-xl">
      <div className="container flex h-16 items-center">
        {/* Logo */}
        <div className="mr-6 flex items-center">
          <Link href="/" className="text-lg font-semibold tracking-[-0.06em] text-white">
            Luie
          </Link>
        </div>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 text-sm md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-zinc-500 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          className="inline-flex h-9 w-9 items-center justify-center text-zinc-400 transition-colors hover:text-white md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {/* Right actions */}
        <div className="flex flex-1 items-center justify-end">
          <Button
            asChild
            size="sm"
            className="hidden h-9 rounded-md bg-white px-4 text-xs font-medium text-black transition-colors hover:bg-zinc-200 md:inline-flex"
          >
            <Link href="#hero">{dictionary.download}</Link>
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="container md:hidden pb-4 pt-1">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#hero"
              className="px-3 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-accent transition-colors mt-1"
              onClick={() => setIsMenuOpen(false)}
            >
              {dictionary.download}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
