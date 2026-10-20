import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-screen items-center justify-center px-6">
      <div className="glass rounded-2xl p-10 text-center">
        <p className="font-mono text-sm text-neon-cyan">// error 404</p>
        <h1 className="neon-text mt-2 text-5xl font-bold">Page not found</h1>
        <p className="mt-3 text-fg/60">This page drifted out of the network.</p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple px-6 py-3 font-semibold text-black"
        >
          Back home
        </Link>
      </div>
    </section>
  );
}