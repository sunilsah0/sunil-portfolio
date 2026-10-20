"use client";

import { motion, type Variants } from "framer-motion";
import { Brain, Cloud, Code, Database, Layers } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { skillCategories } from "@/data/skills";

const icons = {
  code: Code,
  brain: Brain,
  database: Database,
  layers: Layers,
  cloud: Cloud,
} as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const card: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Skills() {
  return (
    <section id="skills" className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="skills.matrix"
          title="Tech Stack & Expertise"
          subtitle="The languages, AI methods, data tools and cloud platforms I use to build intelligent systems."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {skillCategories.map((cat, i) => {
            const Icon = icons[cat.icon];
            const accent = i % 2 === 0 ? "text-neon-cyan" : "text-neon-purple";
            return (
              <motion.div
                key={cat.title}
                variants={card}
                whileHover={{ y: -4 }}
                className="glass glass-hover rounded-2xl p-6"
              >
                <div className="mb-5 flex items-center gap-3">
                  <span className="glass flex h-10 w-10 items-center justify-center rounded-xl">
                    <Icon className={`h-5 w-5 ${accent}`} />
                  </span>
                  <h3 className="text-lg font-semibold">{cat.title}</h3>
                </div>

                <ul className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <li
                      key={item}
                      className="cursor-default rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-fg/80 transition hover:border-neon-cyan/60 hover:text-white hover:shadow-[0_0_14px_rgba(34,211,238,0.35)]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}