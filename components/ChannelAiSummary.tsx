"use client";

import { Sparkles } from "lucide-react";
import { CHANNEL_AI_CONTENT, type ChannelId } from "@/lib/channel-ai-data";

interface ChannelAiSummaryProps {
  channelId: ChannelId;
}

export default function ChannelAiSummary({ channelId }: ChannelAiSummaryProps) {
  const content = CHANNEL_AI_CONTENT[channelId];
  if (!content) return null;

  return (
    <section className="rounded-lg border border-border bg-card p-6 shadow-sm">
      <div className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
        <Sparkles className="h-4 w-4 text-primary" aria-hidden />
        AI summary
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">{content.summary}</p>
      <div className="mt-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Next steps to improve performance
        </p>
        <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
          {content.nextSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
