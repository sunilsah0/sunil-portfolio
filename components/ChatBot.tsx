"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Loader2, MessageCircle, Send, X } from "lucide-react";
import { profile } from "@/data/profile";

type Msg = { role: "user" | "assistant"; content: string };

const first = profile.name.split(" ")[0];

const starters = [
  `What projects has ${first} built?`,
  "What are his AI skills?",
  "Where has he worked?",
  "How can I contact him?",
];

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const list = useRef<HTMLDivElement>(null);

  // Keep the newest message in view (scrolls only the chat box, not the page)
  useEffect(() => {
    const el = list.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, loading, open]);

  // Escape closes the window
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || loading) return;

    const next: Msg[] = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Something went wrong.");
      setMessages([...next, { role: "assistant", content: json.reply }]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-label="Chat assistant"
            className="glass fixed bottom-24 right-4 z-50 flex h-[28rem] max-h-[calc(100vh-8rem)] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl"
            style={{ background: "rgba(8,10,24,0.94)" }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple">
                <Bot className="h-5 w-5 text-black" />
              </span>
              <div className="flex-1">
                <p className="text-sm font-semibold">Ask about {first}</p>
                <p className="font-mono text-[11px] text-fg/50">
                  AI assistant · answers from this portfolio
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="rounded-full p-1 text-fg/60 hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={list}
              data-lenis-prevent
              className="flex-1 space-y-3 overflow-y-auto px-4 py-4 text-sm"
            >
              <p className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white/10 px-3 py-2 text-fg/90">
                Hi! I'm {first}'s AI assistant. Ask me about his projects, skills
                or experience.
              </p>

              {messages.length === 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {starters.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="rounded-full border border-neon-cyan/30 px-3 py-1 text-xs text-neon-cyan transition hover:bg-neon-cyan/10"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {messages.map((m, i) =>
                m.role === "user" ? (
                  <p
                    key={i}
                    className="ml-auto max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-tr-sm bg-gradient-to-r from-neon-cyan to-neon-purple px-3 py-2 text-black"
                  >
                    {m.content}
                  </p>
                ) : (
                  <p
                    key={i}
                    className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-tl-sm bg-white/10 px-3 py-2 text-fg/90"
                  >
                    {m.content}
                  </p>
                )
              )}

              {loading && (
                <p className="flex w-fit items-center gap-2 rounded-2xl rounded-tl-sm bg-white/10 px-3 py-2 text-fg/60">
                  <Loader2 className="h-4 w-4 animate-spin" /> Thinking...
                </p>
              )}
              {error && <p className="text-xs text-red-400">{error}</p>}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="border-t border-white/10 p-3"
            >
              <div className="flex items-center gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  maxLength={500}
                  placeholder="Ask a question..."
                  aria-label="Your question"
                  className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm outline-none placeholder:text-fg/30 focus:border-neon-cyan/60"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  aria-label="Send"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple text-black disabled:opacity-40"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-2 text-center text-[10px] text-fg/40">
                AI can make mistakes. For anything important, use the contact form.
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close chat" : "Open chat"}
        className="fixed bottom-5 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple text-black shadow-[0_0_25px_rgba(34,211,238,0.5)] transition hover:scale-105"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </>
  );
}