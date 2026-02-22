"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

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
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container flex h-14 items-center">
        {/* Logo */}
        <div className="mr-6 flex items-center">
          <Link
            href="/"
            className="font-serif font-bold text-base tracking-tight text-foreground"
          >
            Luie
          </Link>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          className="inline-flex items-center justify-center rounded-md h-9 w-9 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {/* Right actions */}
        <div className="flex flex-1 items-center justify-end gap-2">
          <ThemeToggle />
          <Button
            asChild
            size="sm"
            className="hidden md:inline-flex h-8 px-4 text-xs rounded-lg
              bg-foreground text-background
              hover:opacity-75 border-0
              transition-opacity duration-200"
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
