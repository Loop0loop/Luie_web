"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Zap, Shield, Globe } from "lucide-react";
import { DICTIONARY } from "@/constants/dictionary";

const features = [
  {
    title: DICTIONARY.features.items[0].title,
    description: DICTIONARY.features.items[0].description,
    icon: Zap,
  },
  {
    title: DICTIONARY.features.items[1].title,
    description: DICTIONARY.features.items[1].description,
    icon: Shield,
  },
  {
    title: DICTIONARY.features.items[2].title,
    description: DICTIONARY.features.items[2].description,
    icon: Globe,
  },
];

export function Features() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="container py-12 md:py-24 lg:py-32">
      <div className="mx-auto flex max-w-232 flex-col items-center justify-center gap-4 text-center">
        <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-6xl">
          {DICTIONARY.features.title}
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          {DICTIONARY.features.subtitle}
        </p>
      </div>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-5xl md:grid-cols-3 lg:gap-8 mt-12"
      >
        {features.map((feature, index) => (
          <motion.div key={index} variants={item}>
            <Card className="h-full">
              <CardHeader>
                <feature.icon className="h-10 w-10 text-primary mb-2" />
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Optional: Add more content or an image here */}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
