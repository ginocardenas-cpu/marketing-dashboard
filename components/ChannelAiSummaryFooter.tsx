"use client";

import { usePathname } from "next/navigation";
import { getChannelIdFromPath } from "@/lib/channel-ai-data";
import ChannelAiSummary from "./ChannelAiSummary";

export default function ChannelAiSummaryFooter() {
  const pathname = usePathname();
  const channelId = getChannelIdFromPath(pathname);

  if (!channelId) return null;

  return (
    <div className="mx-auto max-w-7xl px-4 pb-8 pt-6 sm:px-6 lg:px-8">
      <ChannelAiSummary channelId={channelId} />
    </div>
  );
}
