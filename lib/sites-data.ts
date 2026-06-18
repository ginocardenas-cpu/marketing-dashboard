/**
 * Multi-site marketing dashboard: types and data per site.
 * Replace mock data with real API calls (GA, Meta, Mailchimp, Search Console) when ready.
 */

export type Trend = "up" | "down" | "neutral";

export interface MetricSummary {
  label: string;
  value: string | number;
  change?: number;
  trend?: Trend;
  subtitle?: string;
}

export interface ChartAnnotation {
  direction: "up" | "down";
  text: string;
}

export interface TimeSeriesPoint {
  date: string;
  value: number;
  label?: string;
  annotation?: ChartAnnotation;
}

export interface ChannelBenchmark {
  metricLabel: string;
  yourPerformance: string;
  industryAverage: string;
  resultLabel: string;
}

export interface ChannelSummary {
  id: string;
  name: string;
  metrics: MetricSummary[];
  chartData?: TimeSeriesPoint[];
  description?: string;
  benchmark?: ChannelBenchmark;
}

export interface SiteConfig {
  id: string;
  name: string;
  /** Optional hex color for charts/badges (e.g. #2CADB2) */
  primaryColor?: string;
  /** Optional logo path in /public (e.g. "/hostopia-logo.png") */
  logoSrc?: string;
  channels: ChannelSummary[];
}

// ——— Hostopia ———
const hostopiaChannels: ChannelSummary[] = [
  {
    id: "website",
    name: "Website Traffic",
    description: "Sessions, pageviews, and engagement",
    metrics: [
      { label: "Sessions", value: "124.2K", change: 12.4, trend: "up", subtitle: "Last 30 days" },
      { label: "Pageviews", value: "318.5K", change: 8.2, trend: "up", subtitle: "Last 30 days" },
      { label: "Avg. session", value: "2m 34s", change: 5.1, trend: "up" },
      { label: "Bounce rate", value: "42%", change: -3.2, trend: "down" },
    ],
    chartData: [
      { date: "Week 1", value: 28500 },
      { date: "Week 2", value: 30100 },
      {
        date: "Week 3",
        value: 32200,
        annotation: { direction: "up", text: "LinkedIn campaign launch" },
      },
      {
        date: "Week 4",
        value: 33400,
        annotation: { direction: "up", text: "Email campaign drove 23% of traffic" },
      },
    ],
    benchmark: {
      metricLabel: "Traffic Growth",
      yourPerformance: "+12.4%",
      industryAverage: "+7.1%",
      resultLabel: "74% Better Than Peers",
    },
  },
  {
    id: "social",
    name: "Social Performance",
    description: "Reach, engagement, and followers",
    metrics: [
      { label: "Total reach", value: "89.4K", change: 18.2, trend: "up", subtitle: "Last 30 days" },
      { label: "Engagements", value: "12.1K", change: 22.0, trend: "up" },
      { label: "New followers", value: "1,240", change: 7.5, trend: "up" },
      { label: "Eng. rate", value: "4.2%", change: 0.8, trend: "up" },
    ],
    chartData: [
      { date: "Week 1", value: 18500 },
      { date: "Week 2", value: 22100 },
      {
        date: "Week 3",
        value: 24200,
        annotation: { direction: "up", text: "LinkedIn campaign launch" },
      },
      { date: "Week 4", value: 24600 },
    ],
    benchmark: {
      metricLabel: "Engagement Growth",
      yourPerformance: "+22.0%",
      industryAverage: "+11.5%",
      resultLabel: "91% Better Than Peers",
    },
  },
  {
    id: "email",
    name: "Email Marketing",
    description: "Sends, opens, and clicks",
    metrics: [
      { label: "Emails sent", value: "45.2K", change: 2.1, trend: "up", subtitle: "Last 30 days" },
      { label: "Open rate", value: "34.6%", change: 1.2, trend: "up" },
      { label: "Click rate", value: "5.8%", change: -0.4, trend: "down" },
      { label: "Unsubscribes", value: "128", change: -12.0, trend: "down" },
    ],
    chartData: [
      { date: "Week 1", value: 32 },
      { date: "Week 2", value: 35 },
      { date: "Week 3", value: 36 },
      {
        date: "Week 4",
        value: 35,
        annotation: { direction: "up", text: "Email campaign drove 23% of traffic" },
      },
    ],
    benchmark: {
      metricLabel: "Open Rate",
      yourPerformance: "34.6%",
      industryAverage: "21.5%",
      resultLabel: "61% Better Than Peers",
    },
  },
  {
    id: "search",
    name: "Search (SEO & Paid)",
    description: "Organic and paid search",
    metrics: [
      { label: "Organic clicks", value: "28.4K", change: 14.3, trend: "up", subtitle: "Last 30 days" },
      { label: "Impressions", value: "412K", change: 9.1, trend: "up" },
      { label: "Avg. position", value: "4.2", change: -0.3, trend: "up" },
      { label: "CTR", value: "6.9%", change: 0.5, trend: "up" },
    ],
    chartData: [
      { date: "Week 1", value: 6200 },
      { date: "Week 2", value: 7100 },
      { date: "Week 3", value: 7500 },
      { date: "Week 4", value: 7700 },
    ],
    benchmark: {
      metricLabel: "Organic Click Growth",
      yourPerformance: "+14.3%",
      industryAverage: "+8.2%",
      resultLabel: "74% Better Than Peers",
    },
  },
  {
    id: "video",
    name: "Video",
    description: "Play rate, watch time, and top videos",
    metrics: [
      { label: "Play rate", value: "24.6%", change: 3.2, trend: "up", subtitle: "Sessions with video play" },
      { label: "Video plays", value: "30.5K", change: 8.1, trend: "up", subtitle: "Last 30 days" },
      { label: "Avg. watch time", value: "2m 18s", change: 5.0, trend: "up" },
      { label: "Completion rate", value: "68%", change: 2.4, trend: "up" },
    ],
    chartData: [
      { date: "Week 1", value: 6800 },
      { date: "Week 2", value: 7200 },
      { date: "Week 3", value: 7900 },
      { date: "Week 4", value: 8600 },
    ],
    benchmark: {
      metricLabel: "Video Play Growth",
      yourPerformance: "+8.1%",
      industryAverage: "+4.5%",
      resultLabel: "80% Better Than Peers",
    },
  },
];

// ——— Second brand (rename and replace with your other site's data) ———
const otherBrandChannels: ChannelSummary[] = [
  {
    id: "website",
    name: "Website Traffic",
    description: "Sessions, pageviews, and engagement",
    metrics: [
      { label: "Sessions", value: "68.1K", change: 5.2, trend: "up", subtitle: "Last 30 days" },
      { label: "Pageviews", value: "142K", change: 3.8, trend: "up", subtitle: "Last 30 days" },
      { label: "Avg. session", value: "1m 58s", change: -2.1, trend: "down" },
      { label: "Bounce rate", value: "48%", change: -1.5, trend: "down" },
    ],
    chartData: [
      { date: "Week 1", value: 16200 },
      { date: "Week 2", value: 17100 },
      { date: "Week 3", value: 16800 },
      { date: "Week 4", value: 18000 },
    ],
  },
  {
    id: "social",
    name: "Social Performance",
    description: "Reach, engagement, and followers",
    metrics: [
      { label: "Total reach", value: "42.3K", change: 11.0, trend: "up", subtitle: "Last 30 days" },
      { label: "Engagements", value: "5.8K", change: 15.2, trend: "up" },
      { label: "New followers", value: "620", change: 4.1, trend: "up" },
      { label: "Eng. rate", value: "3.8%", change: 0.4, trend: "up" },
    ],
    chartData: [
      { date: "Week 1", value: 9800 },
      { date: "Week 2", value: 10500 },
      { date: "Week 3", value: 11200 },
      { date: "Week 4", value: 10800 },
    ],
  },
  {
    id: "email",
    name: "Email Marketing",
    description: "Sends, opens, and clicks",
    metrics: [
      { label: "Emails sent", value: "22.1K", change: 0.5, trend: "up", subtitle: "Last 30 days" },
      { label: "Open rate", value: "29.2%", change: -0.8, trend: "down" },
      { label: "Click rate", value: "4.1%", change: 0.2, trend: "up" },
      { label: "Unsubscribes", value: "64", change: -8.0, trend: "down" },
    ],
    chartData: [
      { date: "Week 1", value: 28 },
      { date: "Week 2", value: 30 },
      { date: "Week 3", value: 29 },
      { date: "Week 4", value: 30 },
    ],
  },
  {
    id: "search",
    name: "Search (SEO & Paid)",
    description: "Organic and paid search",
    metrics: [
      { label: "Organic clicks", value: "12.6K", change: 8.4, trend: "up", subtitle: "Last 30 days" },
      { label: "Impressions", value: "198K", change: 6.2, trend: "up" },
      { label: "Avg. position", value: "5.8", change: -0.2, trend: "up" },
      { label: "CTR", value: "6.4%", change: 0.3, trend: "up" },
    ],
    chartData: [
      { date: "Week 1", value: 2900 },
      { date: "Week 2", value: 3100 },
      { date: "Week 3", value: 3300 },
      { date: "Week 4", value: 3300 },
    ],
  },
  {
    id: "video",
    name: "Video",
    description: "Play rate, watch time, and top videos",
    metrics: [
      { label: "Play rate", value: "18.2%", change: 1.8, trend: "up", subtitle: "Sessions with video play" },
      { label: "Video plays", value: "12.4K", change: 4.2, trend: "up", subtitle: "Last 30 days" },
      { label: "Avg. watch time", value: "1m 52s", change: 2.1, trend: "up" },
      { label: "Completion rate", value: "62%", change: 1.0, trend: "up" },
    ],
    chartData: [
      { date: "Week 1", value: 2800 },
      { date: "Week 2", value: 3000 },
      { date: "Week 3", value: 3200 },
      { date: "Week 4", value: 3400 },
    ],
  },
];

/** All configured sites. Add more entries to support additional brands. */
export const SITES: SiteConfig[] = [
  {
    id: "hostopia",
    name: "Hostopia",
    primaryColor: "#2CADB2",
    logoSrc: "/hostopia-logo.png",
    channels: hostopiaChannels,
  },
  {
    id: "other-brand",
    name: "Other Brand",
    primaryColor: "#388e3c",
    channels: otherBrandChannels,
  },
];

export function getSiteById(id: string): SiteConfig | undefined {
  return SITES.find((s) => s.id === id);
}

export function getDefaultSite(): SiteConfig {
  return SITES[0];
}

export function getChannelBySiteAndId(
  siteId: string | null,
  channelId: string
): ChannelSummary | undefined {
  const site = (siteId && getSiteById(siteId)) || getDefaultSite();
  return site.channels.find((c) => c.id === channelId);
}
