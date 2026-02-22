"use client";

import { motion } from "framer-motion";
import { Cloud, Monitor, Smartphone, Tablet } from "lucide-react";

const DEVICES = [
  { Icon: Monitor, label: "Mac", angle: -65 },
  { Icon: Tablet, label: "iPad", angle: 55 },
  { Icon: Smartphone, label: "iPhone", angle: 185 },
] as const;

export function SyncVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-100px" }}
      className="flex items-center justify-center order-last lg:order-last"
    >
      <div className="relative w-64 h-64">
        {/* Center cloud — glass */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div
            className="w-18 h-18 rounded-3xl flex items-center justify-center
              bg-white/60 dark:bg-white/[0.06]
              backdrop-blur-2xl
              border border-black/[0.06] dark:border-white/[0.1]
              shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
            style={{ width: 72, height: 72 }}
          >
            <Cloud className="w-8 h-8 text-foreground/50" />
          </div>
        </div>

        {/* Orbiting devices */}
        {DEVICES.map(({ Icon, label, angle }, i) => {
          const rad = (angle * Math.PI) / 180;
          const r = 96;
          const x = Math.round(Math.cos(rad) * r);
          const y = Math.round(Math.sin(rad) * r);
          return (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.25 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="absolute"
              style={{
                left: `calc(50% + ${x}px - 24px)`,
                top: `calc(50% + ${y}px - 24px)`,
              }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center
                  bg-white/60 dark:bg-white/[0.05]
                  backdrop-blur-xl
                  border border-black/[0.05] dark:border-white/[0.08]
                  shadow-[0_4px_16px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.3)]"
              >
                <Icon className="w-5 h-5 text-muted-foreground" />
              </div>
            </motion.div>
          );
        })}

        {/* Pulse rings */}
        {[90, 140].map((size, i) => (
          <motion.div
            key={i}
            animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.04, 0.15] }}
            transition={{ repeat: Infinity, duration: 3.2, delay: i * 0.8, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div
              className="rounded-full border border-foreground/10"
              style={{ width: size, height: size }}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
