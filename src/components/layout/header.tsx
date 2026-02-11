"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

interface HeaderProps {
  dictionary: {
    download: string;
    pricing: string;
    sync: string;
    login: string;
  };
}

export function Header({ dictionary }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">Luie</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="#download"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {dictionary.download}
            </Link>
            <Link
              href="#pricing"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {dictionary.pricing}
            </Link>
            <Link
              href="#sync"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {dictionary.sync}
            </Link>
          </nav>
        </div>
        <button
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10 md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
          <span className="sr-only">Toggle Menu</span>
        </button>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Add search or other items here if needed */}
          </div>
          <nav className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="hidden md:flex">
                {dictionary.login}
            </Button>
            <ThemeToggle />
          </nav>
        </div>
      </div>
      {isMenuOpen && (
        <div className="container md:hidden pb-4">
            <nav className="flex flex-col space-y-4 text-sm font-medium">
                <Link
                href="#download"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
                onClick={() => setIsMenuOpen(false)}
                >
                {dictionary.download}
                </Link>
                <Link
                href="#pricing"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
                onClick={() => setIsMenuOpen(false)}
                >
                {dictionary.pricing}
                </Link>
                <Link
                href="#sync"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
                onClick={() => setIsMenuOpen(false)}
                >
                {dictionary.sync}
                </Link>
                <Link
                href="#login"
                 className="transition-colors hover:text-foreground/80 text-foreground/60"
                 onClick={() => setIsMenuOpen(false)}
                >
                    {dictionary.login}
                </Link>
            </nav>
        </div>
      )}
    </header>
  );
}
