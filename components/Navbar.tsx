"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Cpu } from "lucide-react";
import { profile, navLinks } from "@/data/profile";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  // Watches which section is in the middle of the screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    navLinks.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-4 z-50 mx-auto w-[calc(100%-2rem)] max-w-5xl">
      <nav className="glass flex items-center justify-between rounded-full px-5 py-3">
        <a href="#home" className="flex items-center gap-2 font-semibold">
          <Cpu className="h-5 w-5 text-neon-cyan" />
          <span className="neon-text">{profile.name.split(" ")[0]}</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden gap-1 md:flex">
          {navLinks.map((l) => (
            <li key={l.id} className="relative">
              <a
                href={`#${l.id}`}
                className={`relative z-10 block rounded-full px-4 py-1.5 text-sm transition-colors ${
                  active === l.id ? "text-white" : "text-fg/60 hover:text-white"
                }`}
              >
                {l.label}
              </a>
              {active === l.id && (
                <motion.span
                  layoutId="active-pill"
                  className="absolute inset-0 rounded-full bg-white/10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </li>
          ))}
        </ul>

        {/* Mobile menu button */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass mt-2 rounded-3xl p-3 md:hidden"
          >
            {navLinks.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-3 text-fg/80 hover:bg-white/10"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}