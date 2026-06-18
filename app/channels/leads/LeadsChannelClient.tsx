"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Users } from "lucide-react";
import MetricCard from "@/components/MetricCard";
import ChannelChart from "@/components/ChannelChart";
import { useTimeframe } from "@/components/TimeframeProvider";
import {
  applyTimeframeToMetrics,
  adaptChartDataForTimeframe,
  scaleCount,
} from "@/lib/timeframe";
import {
  getLeadsKpis,
  LEADS_BY_SOURCE,
  LEADS_OVER_TIME,
  LEADS_PIPELINE,
} from "@/lib/leads-detail-data";
import { getChannelBySiteAndId } from "@/lib/sites-data";

interface LeadsChannelClientProps {
  siteId: string | null;
}

export default function LeadsChannelClient({ siteId }: LeadsChannelClientProps) {
  const { days, label } = useTimeframe();

  const kpis = useMemo(
    () => applyTimeframeToMetrics(getLeadsKpis(siteId ?? undefined), days),
    [siteId, days]
  );

  const channel = getChannelBySiteAndId(siteId, "leads");
  const chartData = useMemo(() => {
    const base = channel?.chartData ?? LEADS_OVER_TIME;
    return adaptChartDataForTimeframe(base, days);
  }, [channel?.chartData, days]);

  const sources = useMemo(
    () =>
      LEADS_BY_SOURCE.map((row) => ({
        ...row,
        leads: scaleCount(row.leads, days),
        mqls: scaleCount(row.mqls, days),
        sqls: scaleCount(row.sqls, days),
      })),
    [days]
  );

  const pipeline = useMemo(
    () =>
      LEADS_PIPELINE.map((row) => ({
        ...row,
        count: scaleCount(row.count, days),
      })),
    [days]
  );

  const siteQuery = siteId ? `?site=${encodeURIComponent(siteId)}` : "";

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Leads &amp; CRM Activity</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Lead volume by source — form fills, outreach, farming, webinars, events, and pipeline
              stages. Connect your CRM for live data.
            </p>
          </div>
        </div>
      </header>

      <section className="mb-10 rounded-lg border border-border bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-foreground">Lead summary ({label.toLowerCase()})</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((metric) => (
            <MetricCard key={metric.label} metric={metric} />
          ))}
        </div>
      </section>

      <section className="mb-10 rounded-lg border border-border bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-foreground">Leads by source</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          CRM-attributed leads across marketing and sales activities.
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-border text-xs uppercase text-muted-foreground">
              <tr>
                <th className="py-2 pr-4">Source</th>
                <th className="py-2 pr-4 text-right">Leads</th>
                <th className="py-2 pr-4 text-right">MQLs</th>
                <th className="py-2 pr-4 text-right">SQLs</th>
                <th className="py-2 pr-4 text-right">Share</th>
                <th className="py-2 text-right">Change</th>
              </tr>
            </thead>
            <tbody>
              {sources.map((row) => (
                <tr key={row.source} className="border-b border-border/60 last:border-0">
                  <td className="py-2 pr-4 font-medium text-foreground">{row.source}</td>
                  <td className="py-2 pr-4 text-right tabular-nums">{row.leads.toLocaleString()}</td>
                  <td className="py-2 pr-4 text-right tabular-nums">{row.mqls.toLocaleString()}</td>
                  <td className="py-2 pr-4 text-right tabular-nums">{row.sqls.toLocaleString()}</td>
                  <td className="py-2 pr-4 text-right tabular-nums">{row.share}%</td>
                  <td
                    className={`py-2 text-right tabular-nums font-medium ${
                      row.changeVsPrior >= 0 ? "text-emerald-600" : "text-red-600"
                    }`}
                  >
                    {row.changeVsPrior > 0 ? "+" : ""}
                    {row.changeVsPrior}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-foreground">Lead trend</h2>
          <ChannelChart data={chartData} color="var(--chart-1)" />
        </div>
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-foreground">Pipeline stages</h2>
          <div className="space-y-3">
            {pipeline.map((row) => (
              <div
                key={row.stage}
                className="flex items-center justify-between rounded-lg border border-border bg-muted/30 px-4 py-3"
              >
                <span className="text-sm font-medium text-foreground">{row.stage}</span>
                <div className="text-right">
                  <span className="block text-lg font-bold tabular-nums">{row.count}</span>
                  <span className="text-xs text-muted-foreground">{row.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="rounded-lg border border-dashed border-border bg-muted/30 p-4 text-center text-sm text-muted-foreground">
        Website form fills and demo requests are also tracked on the{" "}
        <Link href={`/channels/website${siteQuery}`} className="font-medium text-primary hover:underline">
          Website channel
        </Link>{" "}
        as source lead volume.
      </div>
    </main>
  );
}
