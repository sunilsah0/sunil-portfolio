"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import SectionHeading from "./SectionHeading";
import SocialLinks from "./SocialLinks";

type Status = "idle" | "sending" | "success" | "error";
type Errors = { name?: string; email?: string; message?: string };

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const field =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition placeholder:text-fg/30 focus:border-neon-cyan/60 focus:shadow-[0_0_16px_rgba(34,211,238,0.25)]";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [serverMsg, setServerMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    // 1) Check the fields
    const found: Errors = {};
    if (name.length < 2) found.name = "Please enter your name.";
    if (!emailOk(email)) found.email = "Please enter a valid email address.";
    if (message.length < 10) found.message = "Please write at least 10 characters.";
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    // 2) Make sure the key exists
    const key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
    if (!key) {
      setStatus("error");
      setServerMsg("The contact form is not set up yet.");
      return;
    }

    // 3) Send it
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: key,
          name,
          email,
          message,
          subject: `Portfolio message from ${name}`,
          from_name: "Portfolio Website",
          botcheck: data.get("botcheck") === "on",
        }),
      });
      const json = await res.json();
      if (json.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setServerMsg(json.message ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setServerMsg("Network error. Please try again.");
    }
  }

  return (
    <section id="contact" className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="contact"
          title="Let's Build Something Intelligent"
          subtitle="Have a project, an idea or an opportunity? Send me a message."
        />

        <div className="grid gap-10 lg:grid-cols-5">
          {/* Left: text + socials */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-2"
          >
            <p className="text-fg/70">
              I'm based in Stockholm and open to roles in AI, machine learning and
              software engineering. The quickest way to reach me is this form, or
              find me on acshacsh1@gmail.com:
            </p>
            <div className="mt-6">
              <SocialLinks />
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.form
            noValidate
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="glass space-y-5 rounded-2xl p-6 lg:col-span-3"
          >
            {/* Hidden spam trap: real people never see or tick this */}
            <input
              type="checkbox"
              name="botcheck"
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm text-fg/70">
                Name
              </label>
              <input id="name" name="name" placeholder="Your name" className={field} />
              {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm text-fg/70">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                className={field}
              />
              {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm text-fg/70">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Tell me about your project..."
                className={`${field} resize-none`}
              />
              {errors.message && (
                <p className="mt-1 text-xs text-red-400">{errors.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple px-6 py-3 font-semibold text-black transition hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] disabled:opacity-60"
            >
              {status === "sending" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" /> Send Message
                </>
              )}
            </button>

            <div aria-live="polite">
              {status === "success" && (
                <p className="flex items-center gap-2 text-sm text-green-400">
                  <CheckCircle2 className="h-4 w-4" />
                  Thanks! Your message was sent. I'll reply soon.
                </p>
              )}
              {status === "error" && (
                <p className="flex items-center gap-2 text-sm text-red-400">
                  <AlertCircle className="h-4 w-4" />
                  {serverMsg}
                </p>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}