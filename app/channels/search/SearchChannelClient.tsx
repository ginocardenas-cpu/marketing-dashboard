"use client";

import { useMemo } from "react";
import MetricCard from "@/components/MetricCard";
import LineChart from "@/components/LineChart";
import { useTimeframe } from "@/components/TimeframeProvider";
import { applyTimeframeToMetrics, adaptLineSeriesData, scaleCount } from "@/lib/timeframe";
import {
  SEO_KPIS,
  SEO_SESSIONS_SERIES,
  SEO_CONVERSIONS_SERIES,
  SEO_TOP_PAGES,
  SEO_TOP_QUERIES,
  PPC_KPIS,
  PPC_SERIES,
  PPC_TOP_CAMPAIGNS,
  TRAFFIC_KPIS,
  TRAFFIC_CHANNELS_OVER_TIME,
  TRAFFIC_NEW_USERS_SERIES,
  TRAFFIC_COUNTRIES,
  REFERRAL_ROWS,
} from "@/lib/search-detail-data";

interface SearchChannelClientProps {
  siteId: string | null;
}

export default function SearchChannelClient({ siteId }: SearchChannelClientProps) {
  const { days, label } = useTimeframe();

  const seoKpis = useMemo(() => applyTimeframeToMetrics(SEO_KPIS, days), [days]);
  const ppcKpis = useMemo(() => applyTimeframeToMetrics(PPC_KPIS, days), [days]);
  const trafficKpis = useMemo(() => applyTimeframeToMetrics(TRAFFIC_KPIS, days), [days]);
  const seoSessionsSeries = useMemo(
    () => adaptLineSeriesData(SEO_SESSIONS_SERIES, days, ["sessions", "engaged"]),
    [days]
  );
  const seoConversionsSeries = useMemo(
    () => adaptLineSeriesData(SEO_CONVERSIONS_SERIES, days, ["conversions"]),
    [days]
  );
  const ppcSeries = useMemo(
    () => adaptLineSeriesData(PPC_SERIES, days, ["conversions"]),
    [days]
  );
  const trafficChannelsOverTime = useMemo(
    () =>
      adaptLineSeriesData(TRAFFIC_CHANNELS_OVER_TIME, days, [
        "organic",
        "paid",
        "direct",
        "referral",
      ]),
    [days]
  );
  const trafficNewUsersSeries = useMemo(
    () => adaptLineSeriesData(TRAFFIC_NEW_USERS_SERIES, days, ["newUsers"]),
    [days]
  );
  const seoTopQueries = useMemo(
    () => SEO_TOP_QUERIES.map((row) => ({ ...row, clicks: scaleCount(row.clicks, days) })),
    [days]
  );
  const seoTopPages = useMemo(
    () =>
      SEO_TOP_PAGES.map((row) => ({
        ...row,
        impressions: scaleCount(row.impressions, days),
        clicks: scaleCount(row.clicks, days),
      })),
    [days]
  );
  const ppcTopCampaigns = useMemo(
    () =>
      PPC_TOP_CAMPAIGNS.map((row) => ({
        ...row,
        adCost: row.adCost * (days / 30),
        clicks: scaleCount(row.clicks, days),
      })),
    [days]
  );
  const trafficCountries = useMemo(
    () =>
      TRAFFIC_COUNTRIES.map((row) => ({
        ...row,
        engagedSessions: scaleCount(row.engagedSessions, days),
      })),
    [days]
  );
  const referralRows = useMemo(
    () =>
      REFERRAL_ROWS.map((row) => ({
        ...row,
        sessions: scaleCount(row.sessions, days),
        conversions: row.conversions * (days / 30),
      })),
    [days]
  );

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Search, SEO &amp; Traffic</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Drill into organic, paid search, and website traffic performance for{" "}
            {siteId ? <span className="font-medium text-foreground">{siteId}</span> : "your selected site"}.
          </p>
        </div>
      </header>

      {/* SEO performance */}
      <section className="mb-10 rounded-lg border border-border bg-card p-6 shadow-sm">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-foreground">SEO performance</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Understand how organic search is driving sessions, engagement, and conversions.
          </p>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-4">
          {seoKpis.map((metric) => (
            <MetricCard key={metric.label} metric={metric} />
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="rounded-lg border border-border bg-background p-4">
            <p className="mb-3 text-sm font-medium text-muted-foreground">
              Organic sessions &amp; engaged sessions ({label.toLowerCase()})
            </p>
            <LineChart
              data={seoSessionsSeries}
              series={[
                { dataKey: "sessions", name: "Sessions", color: "var(--chart-1)" },
                { dataKey: "engaged", name: "Engaged sessions", color: "var(--chart-2)" },
              ]}
            />
          </div>
          <div className="rounded-lg border border-border bg-background p-4">
            <p className="mb-3 text-sm font-medium text-muted-foreground">
              Conversions from organic ({label.toLowerCase()})
            </p>
            <LineChart
              data={seoConversionsSeries}
              series={[{ dataKey: "conversions", name: "Conversions", color: "var(--chart-3)" }]}
            />
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-border bg-background p-4">
            <p className="mb-3 text-sm font-medium text-muted-foreground">Top queries by clicks</p>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-border text-xs uppercase text-muted-foreground">
                  <tr>
                    <th className="py-2 pr-4">Query</th>
                    <th className="py-2 text-right">Clicks</th>
                  </tr>
                </thead>
                <tbody>
                  {seoTopQueries.map((row) => (
                    <tr key={row.query} className="border-b border-border/60 last:border-0">
                      <td className="py-2 pr-4 text-foreground">{row.query}</td>
                      <td className="py-2 text-right tabular-nums text-foreground">{row.clicks.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-background p-4">
            <p className="mb-3 text-sm font-medium text-muted-foreground">Top landing pages from organic</p>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-border text-xs uppercase text-muted-foreground">
                  <tr>
                    <th className="py-2 pr-4">Page path</th>
                    <th className="py-2 pr-4 text-right">Impressions</th>
                    <th className="py-2 pr-4 text-right">Clicks</th>
                    <th className="py-2 text-right">Avg. position</th>
                  </tr>
                </thead>
                <tbody>
                  {seoTopPages.map((row) => (
                    <tr key={row.path} className="border-b border-border/60 last:border-0">
                      <td className="py-2 pr-4 text-foreground">{row.path}</td>
                      <td className="py-2 pr-4 text-right tabular-nums text-foreground">
                        {row.impressions.toLocaleString()}
                      </td>
                      <td className="py-2 pr-4 text-right tabular-nums text-foreground">
                        {row.clicks.toLocaleString()}
                      </td>
                      <td className="py-2 text-right tabular-nums text-foreground">{row.avgPosition.toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* PPC performance */}
      <section className="mb-10 rounded-lg border border-border bg-card p-6 shadow-sm">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-foreground">PPC performance</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Monitor ad spend efficiency, conversions from paid, and cost per conversion.
          </p>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-4">
          {ppcKpis.map((metric) => (
            <MetricCard key={metric.label} metric={metric} />
          ))}
        </div>

        <div className="mb-6 rounded-lg border border-border bg-background p-4">
          <p className="mb-3 text-sm font-medium text-muted-foreground">
            Conversions from paid ({label.toLowerCase()})
          </p>
          <LineChart
            data={ppcSeries}
            series={[{ dataKey: "conversions", name: "Conversions", color: "var(--chart-4)" }]}
          />
        </div>

        <div className="rounded-lg border border-border bg-background p-4">
          <p className="mb-3 text-sm font-medium text-muted-foreground">Top performing campaigns</p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-border text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="py-2 pr-4">Campaign</th>
                  <th className="py-2 pr-4 text-right">Ad costs</th>
                  <th className="py-2 pr-4 text-right">Clicks</th>
                  <th className="py-2 text-right">Cost per conversion</th>
                </tr>
              </thead>
              <tbody>
                {ppcTopCampaigns.map((row) => (
                  <tr key={row.name} className="border-b border-border/60 last:border-0">
                    <td className="py-2 pr-4 text-foreground">{row.name}</td>
                    <td className="py-2 pr-4 text-right tabular-nums text-foreground">
                      ${row.adCost.toFixed(2)}
                    </td>
                    <td className="py-2 pr-4 text-right tabular-nums text-foreground">
                      {row.clicks.toLocaleString()}
                    </td>
                    <td className="py-2 text-right tabular-nums text-foreground">
                      ${row.costPerConversion.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Traffic & referrals */}
      <section className="mb-10 rounded-lg border border-border bg-card p-6 shadow-sm">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-foreground">Website traffic &amp; referrals</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            See how traffic is trending overall, where new users come from, and which countries and referral sources
            are most engaged.
          </p>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-4">
          {trafficKpis.map((metric) => (
            <MetricCard key={metric.label} metric={metric} />
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="rounded-lg border border-border bg-background p-4">
            <p className="mb-3 text-sm font-medium text-muted-foreground">Top channels over time</p>
            <LineChart
              data={trafficChannelsOverTime}
              series={[
                { dataKey: "organic", name: "Organic", color: "var(--chart-1)" },
                { dataKey: "paid", name: "Paid", color: "var(--chart-2)" },
                { dataKey: "direct", name: "Direct", color: "var(--chart-3)" },
                { dataKey: "referral", name: "Referral", color: "var(--chart-4)" },
              ]}
            />
          </div>
          <div className="rounded-lg border border-border bg-background p-4">
            <p className="mb-3 text-sm font-medium text-muted-foreground">
              New users ({label.toLowerCase()})
            </p>
            <LineChart
              data={trafficNewUsersSeries}
              series={[{ dataKey: "newUsers", name: "New users", color: "var(--chart-5)" }]}
            />
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-border bg-background p-4">
            <p className="mb-3 text-sm font-medium text-muted-foreground">Engaged sessions by country</p>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-border text-xs uppercase text-muted-foreground">
                  <tr>
                    <th className="py-2 pr-4">Country</th>
                    <th className="py-2 text-right">Engaged sessions</th>
                  </tr>
                </thead>
                <tbody>
                  {trafficCountries.map((row) => (
                    <tr key={row.country} className="border-b border-border/60 last:border-0">
                      <td className="py-2 pr-4 text-foreground">{row.country}</td>
                      <td className="py-2 text-right tabular-nums text-foreground">
                        {row.engagedSessions.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-background p-4">
            <p className="mb-3 text-sm font-medium text-muted-foreground">Top referral sources</p>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-border text-xs uppercase text-muted-foreground">
                  <tr>
                    <th className="py-2 pr-4">Source</th>
                    <th className="py-2 pr-4 text-right">Sessions</th>
                    <th className="py-2 pr-4 text-right">Conversions</th>
                    <th className="py-2 text-right">Session conversion rate</th>
                  </tr>
                </thead>
                <tbody>
                  {referralRows.map((row) => (
                    <tr key={row.source} className="border-b border-border/60 last:border-0">
                      <td className="py-2 pr-4 text-foreground">{row.source}</td>
                      <td className="py-2 pr-4 text-right tabular-nums text-foreground">
                        {row.sessions.toLocaleString()}
                      </td>
                      <td className="py-2 pr-4 text-right tabular-nums text-foreground">
                        {row.conversions.toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        })}
                      </td>
                      <td className="py-2 text-right tabular-nums text-foreground">
                        {row.sessionConversionRate.toFixed(2)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

