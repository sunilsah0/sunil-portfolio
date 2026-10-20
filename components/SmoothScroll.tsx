"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useState } from "react";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  if (reduce) return <>{children}</>;

  return (
    <ReactLenis root options={{ lerp: 0.1, anchors: true }}>
      {children}
    </ReactLenis>
  );
}