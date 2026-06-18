"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { getChannelIdFromPath } from "@/lib/channel-ai-data";
import ChannelAiSummary from "./ChannelAiSummary";

export default function ChannelAiSummaryBanner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const channelId = getChannelIdFromPath(pathname);
  const siteId = searchParams.get("site");

  if (!channelId) return null;

  return (
    <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
      <ChannelAiSummary channelId={channelId} siteId={siteId} />
    </div>
  );
}
