"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

// A tiny "random" generator that always gives the same numbers,
// so the network looks identical on every load.
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function Network({ count, animate }: { count: number; animate: boolean }) {
  const group = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });

  // Remember where the pointer is (-1 to 1 across the screen)
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  // Build the nodes and the lines between close nodes (done once)
  const { positions, lines } = useMemo(() => {
    const rand = mulberry32(42);
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 6 * Math.cbrt(rand());
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }

    const segs: number[] = [];
    const maxDist = 2.4;
    const maxLinks = 3;
    const links = new Array(count).fill(0);
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        if (links[i] >= maxLinks) break;
        if (links[j] >= maxLinks) continue;
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        if (dx * dx + dy * dy + dz * dz < maxDist * maxDist) {
          segs.push(
            pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2],
            pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2]
          );
          links[i]++;
          links[j]++;
        }
      }
    }
    return { positions: pos, lines: new Float32Array(segs) };
  }, [count]);

  // Runs every frame: slow spin + follow the pointer smoothly
  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    if (animate) g.rotation.y += delta * 0.04;
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, mouse.current.y * 0.25, 2.5, delta);
    g.position.x = THREE.MathUtils.damp(g.position.x, mouse.current.x * 0.6, 2.5, delta);
    g.position.y = THREE.MathUtils.damp(g.position.y, -mouse.current.y * 0.4, 2.5, delta);
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#22d3ee"
          size={0.08}
          sizeAttenuation
          transparent
          opacity={0.95}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[lines, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color="#a855f7"
          transparent
          opacity={0.3}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}

export default function ParticleField() {
  const wrapper = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  // Fewer nodes on phones, and no spinning if the user disabled motion
  const [count] = useState(() => (window.innerWidth < 768 ? 70 : 150));
  const [reduce] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  // Pause drawing when the Hero is off-screen (saves battery and FPS)
  useEffect(() => {
    const el = wrapper.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapper} className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: "low-power" }}
        frameloop={!visible ? "never" : reduce ? "demand" : "always"}
      >
        <Network count={count} animate={!reduce} />
      </Canvas>
    </div>
  );
}