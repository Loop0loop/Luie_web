"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none" | "scale";
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 1,
  className,
  once = true,
}: ScrollRevealProps) {
  const getVariants = (): Variants => {
    const distance = 40;
    let x = 0;
    let y = 0;
    let scale = 1;

    if (direction === "left") x = -distance;
    if (direction === "right") x = distance;
    if (direction === "up") y = distance;
    if (direction === "down") y = -distance;
    if (direction === "scale") scale = 0.95;

    return {
      hidden: { opacity: 0, x, y, scale },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        transition: {
          duration,
          delay,
          ease: [0.16, 1, 0.3, 1],
        },
      },
    };
  };

  return (
    <motion.div
      variants={getVariants()}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-100px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
