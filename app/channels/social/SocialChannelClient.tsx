"use client";

import { useMemo, useState } from "react";
import { Share2, ChevronDown, ChevronRight } from "lucide-react";
import {
  SOCIAL_PLATFORMS,
  getSocialMetricsForPlatform,
  getSocialChartData,
  getTopVideosForPlatform,
  type SocialPlatformId,
} from "@/lib/social-detail-data";
import MetricCard from "@/components/MetricCard";
import LineChart from "@/components/LineChart";
import { useTimeframe } from "@/components/TimeframeProvider";
import { applyTimeframeToMetrics, adaptLineSeriesData } from "@/lib/timeframe";
import type { MetricSummary } from "@/lib/sites-data";

interface SocialChannelClientProps {
  siteId: string | null;
}

function formatWatchTime(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return s > 0 ? `${m}m ${s}s` : `${m}m`;
}

function platformMetricsToCards(
  platformId: SocialPlatformId,
  m: ReturnType<typeof getSocialMetricsForPlatform>
): MetricSummary[] {
  const change = m.changeVsPrevious ?? 0;
  const trend = change > 0 ? "up" : change < 0 ? "down" : "neutral";
  const cards: MetricSummary[] = [
    { label: "Followers", value: m.followers.toLocaleString(), subtitle: "ALL TIME" },
    { label: "Impressions", value: m.impressions.toLocaleString(), change, trend, subtitle: m.timeframe },
    { label: "Engagements", value: m.engagements.toLocaleString(), change, trend, subtitle: m.timeframe },
    { label: "Eng. rate", value: `${m.engagementRate}%`, change, trend },
  ];
  if (m.mentions != null) {
    cards.push({ label: "Mentions", value: m.mentions.toLocaleString(), change, trend, subtitle: m.timeframe });
  }
  if (m.tweetsOrPosts != null) {
    cards.push({ label: "Total posts", value: m.tweetsOrPosts >= 1000 ? `${(m.tweetsOrPosts / 1000).toFixed(1)}K` : m.tweetsOrPosts.toString(), subtitle: "ALL TIME" });
  }
  if (m.videoViews != null) {
    cards.push({ label: "Video views", value: m.videoViews.toLocaleString(), change, trend, subtitle: m.timeframe });
  }
  if (m.avgWatchTimeSeconds != null) {
    cards.push({ label: "Avg. watch time", value: formatWatchTime(m.avgWatchTimeSeconds), change, trend });
  }
  if (m.likes != null) {
    cards.push({ label: "Likes", value: m.likes.toLocaleString(), change, trend });
  }
  if (m.shares != null) {
    cards.push({ label: "Shares", value: m.shares.toLocaleString(), change, trend });
  }
  if (m.comments != null) {
    cards.push({ label: "Comments", value: m.comments.toLocaleString(), change, trend });
  }
  if (m.ctr != null) {
    cards.push({ label: "Click-through rate", value: `${m.ctr}%`, change, trend });
  }
  return cards;
}

const platformIcons: Record<SocialPlatformId, string> = {
  x: "𝕏",
  facebook: "f",
  linkedin: "in",
  instagram: "📷",
};

export default function SocialChannelClient({ siteId }: SocialChannelClientProps) {
  const { days, label } = useTimeframe();
  const [expanded, setExpanded] = useState<Record<SocialPlatformId, boolean>>({
    x: true,
    facebook: true,
    linkedin: true,
    instagram: true,
  });

  const toggle = (id: SocialPlatformId) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Share2 className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
              Social media performance
            </h1>
            <p className="text-sm text-muted-foreground">
              X (Twitter), Facebook, LinkedIn, and Instagram — followers, impressions, engagement, video views & metrics
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {SOCIAL_PLATFORMS.map((platform) => {
          const metrics = getSocialMetricsForPlatform(platform.id, siteId ?? undefined);
          const chartData = getSocialChartData(platform.id, siteId ?? undefined);
          const topVideos = getTopVideosForPlatform(platform.id, siteId ?? undefined);
          const isExpanded = expanded[platform.id];
          const cards = applyTimeframeToMetrics(
            platformMetricsToCards(platform.id, metrics),
            days
          );
          const scaledChartData = adaptLineSeriesData(chartData, days, [
            "impressions",
            "engagements",
          ]);

          return (
            <section
              key={platform.id}
              className="rounded-lg border border-border bg-muted/50 overflow-hidden"
            >
              <button
                type="button"
                onClick={() => toggle(platform.id)}
                className="flex w-full items-center justify-between px-6 py-4 text-left hover:bg-muted/80 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-card border border-border text-lg font-bold text-foreground">
                    {platformIcons[platform.id]}
                  </span>
                  <h2 className="text-lg font-semibold text-foreground">
                    {platform.label}
                  </h2>
                </div>
                {isExpanded ? (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                )}
              </button>

              {isExpanded && (
                <div className="border-t border-border bg-card px-6 py-6">
                  <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {cards.map((metric) => (
                      <MetricCard key={metric.label} metric={metric} />
                    ))}
                  </div>
                  {chartData.length > 0 && (
                    <div className="mb-6">
                      <h3 className="mb-3 text-sm font-medium text-muted-foreground">
                        Impressions & engagements — {label.toLowerCase()}
                      </h3>
                      <LineChart
                        data={scaledChartData}
                        xAxisKey="date"
                        series={[
                          { dataKey: "impressions", name: "Impressions", color: "var(--chart-1)" },
                          { dataKey: "engagements", name: "Engagements", color: "var(--chart-2)" },
                        ]}
                        height={260}
                      />
                    </div>
                  )}
                  {topVideos.length > 0 && (
                    <div className="rounded-lg border border-border bg-background p-4">
                      <h3 className="mb-3 text-sm font-medium text-muted-foreground">
                        Top videos — views, watch time, engagement & CTR
                      </h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full text-left text-sm">
                          <thead className="border-b border-border text-xs uppercase text-muted-foreground">
                            <tr>
                              <th className="py-2 pr-4">Video</th>
                              <th className="py-2 pr-4 text-right">Views</th>
                              <th className="py-2 pr-4 text-right">Avg. watch</th>
                              <th className="py-2 pr-4 text-right">Likes</th>
                              <th className="py-2 pr-4 text-right">Shares</th>
                              <th className="py-2 pr-4 text-right">Comments</th>
                              <th className="py-2 text-right">CTR</th>
                            </tr>
                          </thead>
                          <tbody>
                            {topVideos.map((row) => (
                              <tr key={row.title} className="border-b border-border/60 last:border-0">
                                <td className="py-2 pr-4 text-foreground">{row.title}</td>
                                <td className="py-2 pr-4 text-right tabular-nums text-foreground">
                                  {row.views.toLocaleString()}
                                </td>
                                <td className="py-2 pr-4 text-right tabular-nums text-foreground">
                                  {formatWatchTime(row.avgWatchTimeSeconds)}
                                </td>
                                <td className="py-2 pr-4 text-right tabular-nums text-foreground">
                                  {row.likes.toLocaleString()}
                                </td>
                                <td className="py-2 pr-4 text-right tabular-nums text-foreground">
                                  {row.shares.toLocaleString()}
                                </td>
                                <td className="py-2 pr-4 text-right tabular-nums text-foreground">
                                  {row.comments.toLocaleString()}
                                </td>
                                <td className="py-2 text-right tabular-nums text-foreground">
                                  {row.ctr}%
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </>
  );
}
