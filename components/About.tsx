"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { profile } from "@/data/profile";
import { bio, photos, quickFacts, type Photo } from "@/data/about";

const list = photos.slice(0, 3); // never more than 3

function Tile({
  p,
  index,
  className,
  onOpen,
}: {
  p: Photo;
  index: number;
  className: string;
  onOpen: (i: number) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      aria-label={`Enlarge photo: ${p.alt}`}
      className={`glass group relative block w-full overflow-hidden rounded-2xl ${className}`}
    >
      <Image
        src={p.src}
        alt={p.alt}
        fill
        sizes="(min-width: 1024px) 30vw, 90vw"
        style={{ objectPosition: p.position ?? "center" }}
        className="object-cover transition duration-500 group-hover:scale-105"
      />
    </button>
  );
}

function Collage({ onOpen }: { onOpen: (i: number) => void }) {
  if (list.length === 1) {
    return (
      <div className="mx-auto w-full max-w-md">
        <Tile p={list[0]} index={0} onOpen={onOpen} className="aspect-[4/5]" />
      </div>
    );
  }

  if (list.length === 2) {
    return (
      <div className="mx-auto grid max-w-lg grid-cols-2 gap-4">
        <Tile p={list[0]} index={0} onOpen={onOpen} className="aspect-[3/4]" />
        <div className="pt-10">
          <Tile p={list[1]} index={1} onOpen={onOpen} className="aspect-[3/4]" />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto grid aspect-[4/5] max-w-lg grid-cols-2 grid-rows-2 gap-4">
      <Tile p={list[0]} index={0} onOpen={onOpen} className="row-span-2 h-full" />
      <Tile p={list[1]} index={1} onOpen={onOpen} className="h-full" />
      <Tile p={list[2]} index={2} onOpen={onOpen} className="h-full" />
    </div>
  );
}

export default function About() {
  const [open, setOpen] = useState<number | null>(null);

  // Escape closes the big view
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const hasPhotos = list.length > 0;

  return (
    <section id="about" className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="about.me"
          title="About Me"
          subtitle="The person behind the projects."
        />

        <div
          className={`grid items-center gap-12 ${hasPhotos ? "lg:grid-cols-2" : ""}`}
        >
          {hasPhotos && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Collage onOpen={setOpen} />
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            <h3 className="text-2xl font-semibold sm:text-3xl">
              Hi, I'm <span className="neon-text">{profile.name}</span>
            </h3>

            {bio.map((paragraph) => (
              <p key={paragraph} className="mt-4 leading-relaxed text-fg/70">
                {paragraph}
              </p>
            ))}

            <div className="mt-8 grid grid-cols-3 gap-3">
              {quickFacts.map((f) => (
                <div key={f.label} className="glass rounded-xl p-4 text-center">
                  <p className="neon-text text-xl font-bold sm:text-2xl">{f.value}</p>
                  <p className="mt-1 font-mono text-[11px] text-fg/60">{f.label}</p>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              className="mt-8 inline-block rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple px-6 py-3 font-semibold text-black transition hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]"
            >
              Get in touch
            </a>
          </motion.div>
        </div>
      </div>

      {/* Full-screen view when you click a photo */}
      <AnimatePresence>
        {open !== null && list[open] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            data-lenis-prevent
            onClick={() => setOpen(null)}
            role="dialog"
            aria-modal="true"
            aria-label={list[open].alt}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          >
            <button
              aria-label="Close photo"
              onClick={() => setOpen(null)}
              className="absolute right-4 top-4 rounded-full bg-white/10 p-2 hover:bg-white/20"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="relative h-[85vh] w-[92vw] max-w-5xl">
              <Image
                src={list[open].src}
                alt={list[open].alt}
                fill
                sizes="92vw"
                className="object-contain"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}