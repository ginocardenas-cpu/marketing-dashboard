"use client";

import { useState } from "react";
import { Bot, Send, Sparkles, X } from "lucide-react";
import {
  ASSISTANT_RESPONSES,
  ASSISTANT_SUGGESTED_QUESTIONS,
  DEFAULT_ASSISTANT_GREETING,
} from "@/lib/command-center-data";

interface Message {
  role: "user" | "assistant";
  text: string;
}

interface MarketingAssistantPanelProps {
  open: boolean;
  onClose: () => void;
}

function getAssistantReply(question: string): string {
  const normalized = question.trim().toLowerCase();
  for (const [key, value] of Object.entries(ASSISTANT_RESPONSES)) {
    if (normalized === key.toLowerCase()) return value;
  }
  for (const [key, value] of Object.entries(ASSISTANT_RESPONSES)) {
    if (normalized.includes(key.toLowerCase().slice(0, 20))) return value;
  }
  return "Based on your sample data this month, traffic is up 12.4% with stronger engagement. Your top priority is optimizing landing page conversion — start with the A/B test on your highest-traffic entry page and add CTAs to top exit pages. Would you like step-by-step instructions for any of these actions?";
}

export default function MarketingAssistantPanel({ open, onClose }: MarketingAssistantPanelProps) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: DEFAULT_ASSISTANT_GREETING },
  ]);

  if (!open) return null;

  function ask(question: string) {
    if (!question.trim()) return;
    setMessages((prev) => [
      ...prev,
      { role: "user", text: question },
      { role: "assistant", text: getAssistantReply(question) },
    ]);
    setInput("");
  }

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/40" aria-hidden onClick={onClose} />
      <div
        className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-border bg-card shadow-2xl"
        role="dialog"
        aria-labelledby="assistant-title"
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h2 id="assistant-title" className="font-semibold text-foreground">
                Marketing Assistant
              </h2>
              <p className="text-xs text-muted-foreground">AI-powered guidance</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Close assistant"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[90%] rounded-lg px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-muted/50 text-foreground"
                }`}
              >
                {msg.role === "assistant" && (
                  <Sparkles className="mb-1 h-3.5 w-3.5 text-primary" aria-hidden />
                )}
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-border px-5 py-4">
          <p className="mb-2 text-xs font-medium text-muted-foreground">Suggested questions</p>
          <div className="mb-4 flex flex-wrap gap-2">
            {ASSISTANT_SUGGESTED_QUESTIONS.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => ask(q)}
                className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-foreground transition-colors hover:border-primary hover:bg-primary/5"
              >
                {q}
              </button>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              ask(input);
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about your marketing performance..."
              className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none ring-offset-background focus:border-ring focus:ring-2 focus:ring-ring/20"
            />
            <button
              type="submit"
              className="flex items-center justify-center rounded-lg bg-primary px-3 py-2 text-primary-foreground transition-opacity hover:opacity-90"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
