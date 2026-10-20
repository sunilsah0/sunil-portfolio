"use client";

import { motion } from "framer-motion";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mb-12 max-w-2xl"
    >
      <p className="font-mono text-sm text-neon-cyan">{`// ${eyebrow}`}</p>
      <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
        <span className="neon-text">{title}</span>
      </h2>
      {subtitle && <p className="mt-3 text-fg/60">{subtitle}</p>}
    </motion.div>
  );
}