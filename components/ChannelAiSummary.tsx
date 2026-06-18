"use client";

import { Sparkles } from "lucide-react";
import { CHANNEL_AI_CONTENT, type ChannelId } from "@/lib/channel-ai-data";
import ActionTaskList from "./ActionTaskList";

interface ChannelAiSummaryProps {
  channelId: ChannelId;
  siteId?: string | null;
}

export default function ChannelAiSummary({ channelId, siteId = null }: ChannelAiSummaryProps) {
  const content = CHANNEL_AI_CONTENT[channelId];
  if (!content) return null;

  const tasks = content.nextSteps.map((text, index) => ({
    id: `${channelId}-step-${index}`,
    text,
  }));

  return (
    <section className="rounded-lg border border-primary/20 bg-primary/5 p-6 shadow-sm">
      <div className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
        <Sparkles className="h-4 w-4 text-primary" aria-hidden />
        AI advisor summary
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">{content.summary}</p>
      <div className="mt-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Next steps to improve performance
        </p>
        <ActionTaskList
          listId={`channel-${channelId}`}
          siteId={siteId}
          tasks={tasks}
        />
      </div>
    </section>
  );
}
