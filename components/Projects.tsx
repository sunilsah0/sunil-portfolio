"use client";

import { motion, type Variants } from "framer-motion";
import { ExternalLink } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { GithubMark } from "./icons";
import { projects, type Project } from "@/data/projects";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const card: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function ProjectCard({ p }: { p: Project }) {
  // Save the mouse position inside the card for the glow effect
  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  return (
    <motion.article
      variants={card}
      whileHover={{ y: -4 }}
      onMouseMove={onMove}
      className="glass group relative flex flex-col overflow-hidden rounded-2xl p-6 transition-[border-color,box-shadow] duration-300 hover:border-neon-cyan/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]"
    >
      {/* Glow that follows the mouse */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(400px circle at var(--x, 50%) var(--y, 50%), rgba(34,211,238,0.12), transparent 60%)",
        }}
      />

      <div className="relative flex flex-1 flex-col">
        <p className="font-mono text-xs text-neon-purple">{p.tagline}</p>
        <h3 className="mt-1 text-xl font-semibold">{p.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-fg/70">{p.description}</p>

        {/* Result badges */}
        <div className="mt-5 flex flex-wrap gap-3">
          {p.metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-xl border border-neon-cyan/20 bg-neon-cyan/5 px-3 py-2"
            >
              <p className="neon-text text-lg font-bold leading-none">{m.value}</p>
              <p className="mt-1 font-mono text-[11px] text-fg/60">{m.label}</p>
            </div>
          ))}
        </div>

        {/* Tool tags */}
        <ul className="mt-5 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <li
              key={t}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-fg/80"
            >
              {t}
            </li>
          ))}
        </ul>

        {/* Links (only shown if you filled them in) */}
        {(p.demo || p.github) && (
          <div className="mt-6 flex flex-wrap gap-3 border-t border-white/10 pt-5">
            {p.demo && (
              <a
                href={p.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple px-4 py-2 text-sm font-semibold text-black transition hover:shadow-[0_0_20px_rgba(34,211,238,0.5)]"
              >
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </a>
            )}
            {p.github && (
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="glass flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition hover:border-neon-cyan/50"
              >
                <GithubMark className="h-4 w-4" />
                GitHub
              </a>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="projects.featured"
          title="Featured Projects"
          subtitle="Selected work in AI, NLP, model optimization and full-stack engineering."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-6 md:grid-cols-2"
        >
          {projects.map((p) => (
            <ProjectCard key={p.title} p={p} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}