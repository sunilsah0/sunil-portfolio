import { NextResponse } from "next/server";
import { buildSystemPrompt } from "@/lib/botContext";

// Change the model by setting GROQ_MODEL in .env.local (see console.groq.com/docs/models)
const MODEL = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";
const MAX_MESSAGES = 10; // how much history we send to the AI
const MAX_CHARS = 500; // max length of one message

type Msg = { role: "user" | "assistant"; content: string };

// Simple limit: 10 messages per minute per visitor
const hits = new Map<string, number[]>();
function tooMany(ip: string) {
  const now = Date.now();
  if (hits.size > 1000) hits.clear();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 10;
}

export async function POST(req: Request) {
  const key = process.env.GROQ_API_KEY;
  if (!key) {
    return NextResponse.json(
      { error: "The chatbot is not set up yet." },
      { status: 500 }
    );
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (tooMany(ip)) {
    return NextResponse.json(
      { error: "Too many messages. Please wait a minute and try again." },
      { status: 429 }
    );
  }

  let body: { messages?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }

  const raw = Array.isArray(body.messages) ? body.messages : [];
  const messages: Msg[] = raw
    .filter(
      (m): m is Msg =>
        typeof m === "object" &&
        m !== null &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string"
    )
    .slice(-MAX_MESSAGES)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));

  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    return NextResponse.json({ error: "Please type a question." }, { status: 400 });
  }

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.4,
        max_tokens: 400,
        messages: [{ role: "system", content: buildSystemPrompt() }, ...messages],
      }),
    });

    if (!res.ok) {
      // The real reason appears in your terminal, never to the visitor
      console.error("Groq error", res.status, await res.text());
      return NextResponse.json(
        {
          error:
            res.status === 429
              ? "The assistant is busy right now. Please try again in a minute."
              : "The assistant is unavailable right now. Please use the contact form.",
        },
        { status: 502 }
      );
    }

    const json = await res.json();
    const reply: string | undefined = json.choices?.[0]?.message?.content?.trim();
    return NextResponse.json({
      reply: reply || "Sorry, I couldn't come up with an answer. Please try again.",
    });
  } catch (err) {
    console.error("Chat route failed", err);
    return NextResponse.json(
      { error: "Network problem. Please try again." },
      { status: 502 }
    );
  }
}