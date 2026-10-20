"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { timeline } from "@/data/experience";

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);

  // 0 = timeline just entering the screen, 1 = timeline finished
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section id="experience" className="relative px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="experience.timeline"
          title="Experience & Education"
          subtitle="From software engineering in Nepal to AI research in Stockholm."
        />

        <div ref={ref} className="relative">
          {/* Grey base line + glowing line that grows while you scroll */}
          <div className="absolute left-4 top-0 h-full w-px bg-white/10 md:left-1/2" />
          <motion.div
            style={{ scaleY }}
            className="absolute left-4 top-0 h-full w-px origin-top bg-gradient-to-b from-neon-cyan to-neon-purple shadow-[0_0_12px_rgba(34,211,238,0.6)] md:left-1/2"
          />

          {timeline.map((item, i) => {
            const Icon = item.type === "work" ? Briefcase : GraduationCap;
            const onRight = i % 2 === 1;
            return (
              <div
                key={item.title + item.org}
                className="relative mb-12 last:mb-0 md:grid md:grid-cols-2 md:gap-16"
              >
                {/* Dot on the line */}
                <span className="absolute left-4 top-6 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border border-neon-cyan/60 bg-bg md:left-1/2">
                  <Icon className="h-4 w-4 text-neon-cyan" />
                </span>

                <motion.article
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className={`glass glass-hover ml-12 rounded-2xl p-6 md:ml-0 ${
                    onRight ? "md:col-start-2" : ""
                  }`}
                >
                  <p className="font-mono text-xs text-neon-purple">{item.period}</p>
                  <h3 className="mt-1 text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-neon-cyan">
                    {item.org} · {item.place}
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-fg/70">
                    {item.points.map((pt) => (
                      <li key={pt} className="flex gap-2">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-neon-cyan" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </motion.article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}