"use client";

import { useEffect, useState } from "react";
import SocialLinks from "./SocialLinks";
import { profile } from "@/data/profile";

export default function Footer() {
  const [year, setYear] = useState(2026);
  useEffect(() => setYear(new Date().getFullYear()), []);

  return (
    <footer className="border-t border-white/10 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="text-center md:text-left">
          <p className="font-semibold">
            <span className="neon-text">{profile.name}</span>
          </p>
          <p className="mt-1 font-mono text-xs text-fg/50">
            © {year} · Built with Next.js, Three.js & Framer Motion
          </p>
        </div>
        <SocialLinks />
      </div>
    </footer>
  );
}