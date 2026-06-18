"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { getChannelIdFromPath } from "@/lib/channel-ai-data";
import { getChannelBySiteAndId } from "@/lib/sites-data";
import BenchmarkComparison from "./BenchmarkComparison";

export default function ChannelBenchmarkBanner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const siteId = searchParams.get("site");

  const channelId = getChannelIdFromPath(pathname);
  if (!channelId) return null;

  const channel = getChannelBySiteAndId(siteId, channelId);
  if (!channel?.benchmark) return null;

  return (
    <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
      <BenchmarkComparison benchmark={channel.benchmark} />
    </div>
  );
}
