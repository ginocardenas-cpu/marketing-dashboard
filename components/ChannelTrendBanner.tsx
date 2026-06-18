"use client";

import { useMemo } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { getChannelIdFromPath } from "@/lib/channel-ai-data";
import { getChannelBySiteAndId } from "@/lib/sites-data";
import { adaptChartDataForTimeframe, getTrendSectionTitle } from "@/lib/timeframe";
import { useTimeframe } from "./TimeframeProvider";
import ChannelChart from "./ChannelChart";

export default function ChannelTrendBanner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const siteId = searchParams.get("site");
  const channelId = getChannelIdFromPath(pathname);
  const { days, label } = useTimeframe();

  const chartData = useMemo(() => {
    if (!channelId) return [];
    const channel = getChannelBySiteAndId(siteId, channelId);
    if (!channel?.chartData?.length) return [];
    return adaptChartDataForTimeframe(channel.chartData, days);
  }, [channelId, siteId, days]);

  if (!channelId || !chartData.length) return null;

  return (
    <div className="mx-auto max-w-7xl px-4 pb-2 pt-6 sm:px-6 lg:px-8">
      <section className="rounded-lg border border-border bg-card p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground">{getTrendSectionTitle(days)}</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {label} — week-over-week performance with AI advisor explanations for each change.
        </p>
        <div className="mt-4">
          <ChannelChart data={chartData} color="var(--chart-1)" />
        </div>
      </section>
    </div>
  );
}
