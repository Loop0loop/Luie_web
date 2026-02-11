"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export function DownloadSection() {
  return (
    <section className="container py-12 md:py-24 lg:py-32">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-3xl bg-black px-6 py-24 shadow-2xl sm:px-24 xl:py-32 dark:bg-zinc-900"
      >
        <div className="absolute left-0 top-0 -z-10 h-full w-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/30 via-zinc-900/0 to-zinc-900/0"></div>
        
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to get started?
            <br />
            Download Luie for PC today.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-zinc-300">
            Join thousands of developers who are building the future with Luie.
            Available for macOS, Windows, and Linux.
          </p>
          <div className="mt-10 flex gap-x-6">
            <Button
              size="lg"
              className="bg-white text-black hover:bg-zinc-200 h-14 px-8 text-lg"
            >
              <Download className="mr-2 h-5 w-5" />
              Download Now
            </Button>
          </div>
          <p className="mt-4 text-sm text-zinc-500">
            Free trial included. No credit card required.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
