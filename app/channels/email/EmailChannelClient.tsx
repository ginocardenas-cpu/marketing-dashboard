"use client";

import { useState, useMemo } from "react";
import { Mail } from "lucide-react";
import {
  EMAIL_CAMPAIGNS,
  getEmailMetricsForCampaign,
  getEmailChartData,
  type EmailMetrics,
} from "@/lib/email-detail-data";
import MetricCard from "@/components/MetricCard";
import LineChart from "@/components/LineChart";
import { useTimeframe } from "@/components/TimeframeProvider";
import { applyTimeframeToMetrics, adaptLineSeriesData } from "@/lib/timeframe";
import type { MetricSummary } from "@/lib/sites-data";

interface EmailChannelClientProps {
  siteId: string | null;
}

function metricsToCards(m: EmailMetrics): MetricSummary[] {
  const change = m.changeVsPrevious ?? 0;
  const trend = change > 0 ? "up" : change < 0 ? "down" : "neutral";
  return [
    { label: "Emails sent", value: m.sent.toLocaleString(), change, trend, subtitle: m.timeframe },
    { label: "Emails opened", value: m.opened.toLocaleString(), change, trend, subtitle: m.timeframe },
    { label: "Emails bounced", value: m.bounced.toLocaleString(), change: -change, trend: change > 0 ? "down" : "up" },
    { label: "Unsubscribes", value: m.unsubscribes.toLocaleString(), change: -Math.abs(change), trend: "down" },
    { label: "Open rate", value: `${m.openRate}%`, change, trend },
    { label: "Click rate", value: `${m.clickRate}%`, change, trend },
  ];
}

export default function EmailChannelClient({ siteId }: EmailChannelClientProps) {
  const [campaignId, setCampaignId] = useState("all");
  const [chartMetric, setChartMetric] = useState<"sent" | "opened" | "clicks" | "openRate" | "clickRate">("sent");
  const { days, label } = useTimeframe();

  const metrics = useMemo(
    () => getEmailMetricsForCampaign(campaignId, siteId ?? undefined),
    [campaignId, siteId]
  );
  const chartData = useMemo(
    () => getEmailChartData(campaignId, siteId ?? undefined),
    [campaignId, siteId]
  );

  const cards = useMemo(
    () => applyTimeframeToMetrics(metricsToCards(metrics), days),
    [metrics, days]
  );

  const chartSeries = useMemo(() => {
    const key = chartMetric;
    if (key === "sent" || key === "opened" || key === "clicks") {
      return [{ dataKey: key, name: key.charAt(0).toUpperCase() + key.slice(1), color: "var(--chart-1)" }];
    }
    return [{ dataKey: key, name: key === "openRate" ? "Open rate %" : "Click rate %", color: "var(--chart-2)" }];
  }, [chartMetric]);

  const chartDataMapped = useMemo(() => {
    const numericKeys =
      chartMetric === "openRate" || chartMetric === "clickRate"
        ? ([chartMetric] as ("openRate" | "clickRate")[])
        : ([chartMetric] as ("sent" | "opened" | "clicks")[]);
    return adaptLineSeriesData(chartData, days, numericKeys);
  }, [chartData, days, chartMetric]);

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Mail className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
              Email Marketing
            </h1>
            <p className="text-sm text-muted-foreground">
              Campaign performance — sent, opened, bounced, unsubscribes, click rate
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div>
          <label htmlFor="campaign-select" className="mb-1 block text-sm font-medium text-muted-foreground">
            Campaign
          </label>
          <select
            id="campaign-select"
            value={campaignId}
            onChange={(e) => setCampaignId(e.target.value)}
            className="rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
          >
            {EMAIL_CAMPAIGNS.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="chart-metric" className="mb-1 block text-sm font-medium text-muted-foreground">
            Chart metric
          </label>
          <select
            id="chart-metric"
            value={chartMetric}
            onChange={(e) => setChartMetric(e.target.value as typeof chartMetric)}
            className="rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
          >
            <option value="sent">Emails sent</option>
            <option value="opened">Emails opened</option>
            <option value="clicks">Clicks</option>
            <option value="openRate">Open rate %</option>
            <option value="clickRate">Click rate %</option>
          </select>
        </div>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {cards.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </div>

      <section className="rounded-lg border border-border bg-card p-6">
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          Trend over time — {chartMetric === "openRate" ? "Open rate" : chartMetric === "clickRate" ? "Click rate" : chartMetric} ({label.toLowerCase()})
        </h2>
        <LineChart
          data={chartDataMapped}
          xAxisKey="date"
          series={chartSeries}
          height={300}
        />
      </section>
    </>
  );
}
