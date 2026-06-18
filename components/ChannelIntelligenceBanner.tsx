"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { getChannelIdFromPath } from "@/lib/channel-ai-data";
import {
  getChannelForecast,
  getChannelHealthScore,
} from "@/lib/channel-intelligence-data";
import ChannelHealthScoreCard from "./ChannelHealthScoreCard";
import ChannelAiForecastCard from "./ChannelAiForecastCard";

export default function ChannelIntelligenceBanner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const siteId = searchParams.get("site");
  const channelId = getChannelIdFromPath(pathname);

  if (!channelId) return null;

  const health = getChannelHealthScore(siteId, channelId);
  const forecast = getChannelForecast(siteId, channelId);

  if (!health && !forecast) return null;

  return (
    <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-2">
        {health && <ChannelHealthScoreCard health={health} />}
        {forecast && <ChannelAiForecastCard forecast={forecast} />}
      </div>
    </div>
  );
}
