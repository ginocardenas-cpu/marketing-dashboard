"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Globe, ArrowRight } from "lucide-react";
import MetricCard from "@/components/MetricCard";
import LineChart from "@/components/LineChart";
import { useTimeframe } from "@/components/TimeframeProvider";
import { applyTimeframeToMetrics, adaptLineSeriesData, scaleCount } from "@/lib/timeframe";
import {
  WEBSITE_LEAD_SOURCES,
  WEBSITE_LEADS_KPIS,
} from "@/lib/leads-detail-data";
import {
  WEBSITE_PROPERTIES,
  TRAFFIC_DETAIL_KPIS,
  TRAFFIC_DETAIL_KPIS_CONNECTS,
  TRAFFIC_BY_DEVICE,
  TRAFFIC_BY_DEVICE_CONNECTS,
  TRAFFIC_BY_COUNTRY,
  TRAFFIC_BY_COUNTRY_CONNECTS,
  TOP_PAGES_BY_TRAFFIC,
  TOP_PAGES_BY_TRAFFIC_CONNECTS,
  TRAFFIC_SOURCES,
  TRAFFIC_SOURCES_CONNECTS,
  TRAFFIC_SOURCES_OVER_TIME,
  ACTIONS_PER_VISIT,
  SESSIONS_OVER_TIME,
  SESSIONS_OVER_TIME_CONNECTS,
} from "@/lib/traffic-detail-data";

type WebsitePropertyId = (typeof WEBSITE_PROPERTIES)[number]["id"];

interface WebsiteTrafficClientProps {
  siteId: string | null;
}

export default function WebsiteTrafficClient({ siteId }: WebsiteTrafficClientProps) {
  const [property, setProperty] = useState<WebsitePropertyId>("hostopia-corporate");
  const { days, label } = useTimeframe();

  const isHostopia = !siteId || siteId === "hostopia";
  const isConnectsProperty = property === "hostopia-connects";

  const baseKpis = isConnectsProperty ? TRAFFIC_DETAIL_KPIS_CONNECTS : TRAFFIC_DETAIL_KPIS;
  const baseDevices = isConnectsProperty ? TRAFFIC_BY_DEVICE_CONNECTS : TRAFFIC_BY_DEVICE;
  const baseCountries = isConnectsProperty ? TRAFFIC_BY_COUNTRY_CONNECTS : TRAFFIC_BY_COUNTRY;
  const baseTopPages = isConnectsProperty ? TOP_PAGES_BY_TRAFFIC_CONNECTS : TOP_PAGES_BY_TRAFFIC;
  const baseSources = isConnectsProperty ? TRAFFIC_SOURCES_CONNECTS : TRAFFIC_SOURCES;
  const baseSessionsSeries = isConnectsProperty ? SESSIONS_OVER_TIME_CONNECTS : SESSIONS_OVER_TIME;

  const kpis = useMemo(() => applyTimeframeToMetrics(baseKpis, days), [baseKpis, days]);
  const devices = useMemo(
    () => baseDevices.map((row) => ({ ...row, sessions: scaleCount(row.sessions, days) })),
    [baseDevices, days]
  );
  const countries = useMemo(
    () =>
      baseCountries.map((row) => ({
        ...row,
        sessions: scaleCount(row.sessions, days),
        uniqueVisitors: scaleCount(row.uniqueVisitors, days),
      })),
    [baseCountries, days]
  );
  const topPages = useMemo(
    () =>
      baseTopPages.map((row) => ({
        ...row,
        sessions: scaleCount(row.sessions, days),
        pageviews: scaleCount(row.pageviews, days),
      })),
    [baseTopPages, days]
  );
  const sources = useMemo(
    () => baseSources.map((row) => ({ ...row, sessions: scaleCount(row.sessions, days) })),
    [baseSources, days]
  );
  const sessionsSeries = useMemo(
    () => adaptLineSeriesData(baseSessionsSeries, days, ["sessions", "uniqueVisitors"]),
    [baseSessionsSeries, days]
  );
  const sourcesOverTime = useMemo(
    () =>
      adaptLineSeriesData(TRAFFIC_SOURCES_OVER_TIME, days, [
        "organic",
        "paid",
        "direct",
        "referral",
        "social",
        "llm",
      ]),
    [days]
  );
  const actionsPerVisit = useMemo(
    () =>
      ACTIONS_PER_VISIT.map((row) => ({
        ...row,
        count: scaleCount(row.count, days),
        sessionsWithAction: scaleCount(row.sessionsWithAction, days),
      })),
    [days]
  );

  const websiteLeadKpis = useMemo(
    () => applyTimeframeToMetrics(WEBSITE_LEADS_KPIS, days),
    [days]
  );
  const websiteLeadSources = useMemo(
    () =>
      WEBSITE_LEAD_SOURCES.map((row) => ({
        ...row,
        leads: scaleCount(row.leads, days),
        mqls: scaleCount(row.mqls, days),
        sqls: scaleCount(row.sqls, days),
      })),
    [days]
  );

  const siteQuery = siteId ? `?site=${encodeURIComponent(siteId)}` : "";

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Globe className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Website traffic</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Unique visitors, sessions, traffic by device & country, top pages, sources, and actions per visit
              {siteId ? ` for ${siteId}` : ""}.
            </p>
          </div>
        </div>
        {isHostopia && (
          <div className="flex flex-col items-start gap-1 text-sm sm:items-end">
            <label htmlFor="website-property" className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Website property
            </label>
            <select
              id="website-property"
              value={property}
              onChange={(e) => setProperty(e.target.value as WebsitePropertyId)}
              className="min-w-[230px] rounded-lg border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground shadow-sm outline-none ring-offset-background transition-colors focus:border-ring focus:ring-2 focus:ring-ring/20"
            >
              {WEBSITE_PROPERTIES.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </header>

      {/* Core KPIs */}
      <section className="mb-10 rounded-lg border border-border bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-foreground">Key metrics</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((metric) => (
            <MetricCard key={metric.label} metric={metric} />
          ))}
        </div>

        <div className="mt-6 rounded-lg border border-border bg-background p-4">
          <p className="mb-3 text-sm font-medium text-muted-foreground">
            Sessions & unique visitors ({label.toLowerCase()})
          </p>
          <LineChart
            data={sessionsSeries}
            series={[
              { dataKey: "sessions", name: "Sessions", color: "var(--chart-1)" },
              { dataKey: "uniqueVisitors", name: "Unique visitors", color: "var(--chart-2)" },
            ]}
            height={280}
          />
        </div>
      </section>

      {/* Website-attributed leads (CRM) */}
      <section className="mb-10 rounded-lg border border-border bg-card p-6 shadow-sm">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Website lead volume</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              CRM-attributed leads from your website — forms, demos, downloads, and chat ({label.toLowerCase()}).
            </p>
          </div>
          <Link
            href={`/channels/leads${siteQuery}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            View all lead sources
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {websiteLeadKpis.map((metric) => (
            <MetricCard key={metric.label} metric={metric} />
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-border text-xs uppercase text-muted-foreground">
              <tr>
                <th className="py-2 pr-4">Website source</th>
                <th className="py-2 pr-4 text-right">Leads</th>
                <th className="py-2 pr-4 text-right">MQLs</th>
                <th className="py-2 pr-4 text-right">SQLs</th>
                <th className="py-2 text-right">Share</th>
              </tr>
            </thead>
            <tbody>
              {websiteLeadSources.map((row) => (
                <tr key={row.source} className="border-b border-border/60 last:border-0">
                  <td className="py-2 pr-4 font-medium text-foreground">{row.source}</td>
                  <td className="py-2 pr-4 text-right tabular-nums">{row.leads.toLocaleString()}</td>
                  <td className="py-2 pr-4 text-right tabular-nums">{row.mqls.toLocaleString()}</td>
                  <td className="py-2 pr-4 text-right tabular-nums">{row.sqls.toLocaleString()}</td>
                  <td className="py-2 text-right tabular-nums">{row.share}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Traffic by device */}
      <section className="mb-10 rounded-lg border border-border bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-foreground">Traffic by device</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-border text-xs uppercase text-muted-foreground">
              <tr>
                <th className="py-2 pr-4">Device</th>
                <th className="py-2 pr-4 text-right">Sessions</th>
                <th className="py-2 text-right">Share</th>
              </tr>
            </thead>
            <tbody>
              {devices.map((row) => (
                <tr key={row.device} className="border-b border-border/60 last:border-0">
                  <td className="py-2 pr-4 text-foreground">{row.device}</td>
                  <td className="py-2 pr-4 text-right tabular-nums text-foreground">
                    {row.sessions.toLocaleString()}
                  </td>
                  <td className="py-2 text-right tabular-nums text-foreground">{row.share}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Traffic sources (organic, paid, LLM, reviews, backlinks, etc.) */}
      <section className="mb-10 rounded-lg border border-border bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-foreground">Traffic sources</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Organic, paid, direct, referral/backlinks, social, LLM referrals, and reviews.
        </p>
        <div className="mb-6 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-border text-xs uppercase text-muted-foreground">
              <tr>
                <th className="py-2 pr-4">Source</th>
                <th className="py-2 pr-4 text-right">Sessions</th>
                <th className="py-2 text-right">Share</th>
              </tr>
            </thead>
            <tbody>
              {sources.map((row) => (
                <tr key={row.source} className="border-b border-border/60 last:border-0">
                  <td className="py-2 pr-4 text-foreground">{row.source}</td>
                  <td className="py-2 pr-4 text-right tabular-nums text-foreground">
                    {row.sessions.toLocaleString()}
                  </td>
                  <td className="py-2 text-right tabular-nums text-foreground">{row.share}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="rounded-lg border border-border bg-background p-4">
          <p className="mb-3 text-sm font-medium text-muted-foreground">Traffic sources over time</p>
          <LineChart
            data={sourcesOverTime}
            series={[
              { dataKey: "organic", name: "Organic", color: "var(--chart-1)" },
              { dataKey: "paid", name: "Paid", color: "var(--chart-2)" },
              { dataKey: "direct", name: "Direct", color: "var(--chart-3)" },
              { dataKey: "referral", name: "Referral", color: "var(--chart-4)" },
              { dataKey: "social", name: "Social", color: "var(--chart-5)" },
              { dataKey: "llm", name: "LLM", color: "var(--chart-1)" },
            ]}
            height={280}
          />
        </div>
      </section>

      {/* Top pages by traffic */}
      <section className="mb-10 rounded-lg border border-border bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-foreground">Top pages by traffic</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-border text-xs uppercase text-muted-foreground">
              <tr>
                <th className="py-2 pr-4">Page</th>
                <th className="py-2 pr-4 text-right">Sessions</th>
                <th className="py-2 pr-4 text-right">Pageviews</th>
                <th className="py-2 pr-4 text-right">Avg. time</th>
                <th className="py-2 text-right">Bounce rate</th>
              </tr>
            </thead>
            <tbody>
              {topPages.map((row) => (
                <tr key={row.path} className="border-b border-border/60 last:border-0">
                  <td className="py-2 pr-4">
                    <span className="font-medium text-foreground">{row.title}</span>
                    <span className="ml-1 text-muted-foreground">{row.path}</span>
                  </td>
                  <td className="py-2 pr-4 text-right tabular-nums text-foreground">
                    {row.sessions.toLocaleString()}
                  </td>
                  <td className="py-2 pr-4 text-right tabular-nums text-foreground">
                    {row.pageviews.toLocaleString()}
                  </td>
                  <td className="py-2 pr-4 text-right tabular-nums text-foreground">{row.avgTimeOnPage}</td>
                  <td className="py-2 text-right tabular-nums text-foreground">{row.bounceRate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Traffic by country */}
      <section className="mb-10 rounded-lg border border-border bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-foreground">Traffic by country</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-border text-xs uppercase text-muted-foreground">
              <tr>
                <th className="py-2 pr-4">Country</th>
                <th className="py-2 pr-4 text-right">Sessions</th>
                <th className="py-2 pr-4 text-right">Unique visitors</th>
                <th className="py-2 text-right">Bounce rate</th>
              </tr>
            </thead>
            <tbody>
              {countries.map((row) => (
                <tr key={row.country} className="border-b border-border/60 last:border-0">
                  <td className="py-2 pr-4 text-foreground">{row.country}</td>
                  <td className="py-2 pr-4 text-right tabular-nums text-foreground">
                    {row.sessions.toLocaleString()}
                  </td>
                  <td className="py-2 pr-4 text-right tabular-nums text-foreground">
                    {row.uniqueVisitors.toLocaleString()}
                  </td>
                  <td className="py-2 text-right tabular-nums text-foreground">{row.bounceRate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Actions per visit */}
      <section className="mb-10 rounded-lg border border-border bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-foreground">Actions per visit</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Downloads, external links, podcast, video, blog reads, and form interactions.
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-border text-xs uppercase text-muted-foreground">
              <tr>
                <th className="py-2 pr-4">Action</th>
                <th className="py-2 pr-4 text-right">Count</th>
                <th className="py-2 pr-4 text-right">Sessions with action</th>
                <th className="py-2 text-right">Rate (% sessions)</th>
              </tr>
            </thead>
            <tbody>
              {actionsPerVisit.map((row) => (
                <tr key={row.action} className="border-b border-border/60 last:border-0">
                  <td className="py-2 pr-4 text-foreground">{row.action}</td>
                  <td className="py-2 pr-4 text-right tabular-nums text-foreground">
                    {row.count.toLocaleString()}
                  </td>
                  <td className="py-2 pr-4 text-right tabular-nums text-foreground">
                    {row.sessionsWithAction.toLocaleString()}
                  </td>
                  <td className="py-2 text-right tabular-nums text-foreground">{row.rate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
