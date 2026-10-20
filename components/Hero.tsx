"use client";

import dynamic from "next/dynamic";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  GraduationCap,
  MapPin,
  Sparkles,
} from "lucide-react";
import { profile, hero } from "@/data/profile";

const ParticleField = dynamic(() => import("./three/ParticleField"), {
  ssr: false,
});

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 * i, duration: 0.6, ease: "easeOut" },
  }),
};

const badgeIcons = {
  pin: MapPin,
  grad: GraduationCap,
  spark: Sparkles,
} as const;

function GithubMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.34.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

export default function Hero() {
  const [first, accent, rest] = hero.headline;

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pb-16 pt-28"
    >
      {/* 3D background */}
      <ParticleField />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg/20 via-transparent to-bg" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-2">
        {/* Left: text */}
        <div>
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="flex flex-wrap gap-2"
          >
            {hero.badges.map((b) => {
              const Icon = badgeIcons[b.icon as keyof typeof badgeIcons];
              return (
                <span
                  key={b.text}
                  className="glass flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-xs text-fg/80"
                >
                  <Icon className="h-3.5 w-3.5 text-neon-cyan" />
                  {b.text}
                </span>
              );
            })}
          </motion.div>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl"
          >
            {first} <span className="neon-text">{accent}</span> {rest}
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-5 max-w-xl text-base text-fg/70 sm:text-lg"
          >
            {hero.intro}
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-8 flex flex-wrap gap-4"
          >
            <a
              href="#projects"
              className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple px-6 py-3 font-semibold text-black transition hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]"
            >
              Explore Projects
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="glass glass-hover flex items-center gap-2 rounded-full px-6 py-3 font-semibold"
            >
              <GithubMark className="h-4 w-4" />
              View GitHub
            </a>
          </motion.div>
        </div>

        {/* Right: animated terminal */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="glass mx-auto w-full max-w-md rounded-2xl"
        >
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-red-400/80" />
            <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
            <span className="h-3 w-3 rounded-full bg-green-400/80" />
            <span className="ml-3 font-mono text-xs text-fg/50">sunil@portfolio:~</span>
          </div>
          <div className="space-y-2 p-5 font-mono text-sm">
            {hero.terminal.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + i * 0.4 }}
                className={line.kind === "cmd" ? "text-neon-cyan" : "pl-4 text-fg/70"}
              >
                {line.kind === "cmd" && <span className="text-neon-purple">$ </span>}
                {line.text}
              </motion.p>
            ))}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ delay: 3.4, duration: 1, repeat: Infinity }}
              className="inline-block h-4 w-2 translate-y-0.5 bg-neon-cyan"
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <a
        href="#skills"
        aria-label="Scroll down"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-fg/50 hover:text-neon-cyan"
      >
        <ChevronDown className="h-6 w-6 animate-bounce" />
      </a>
    </section>
  );
}