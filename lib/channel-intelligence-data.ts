import type { ChannelId } from "@/lib/channel-ai-data";

export type OpportunityIndicator = "strong" | "opportunity" | "attention";

export interface ChannelHealthScore {
  overall: number;
  subscores: { label: string; score: number }[];
}

export interface ChannelForecastItem {
  label: string;
  value: string;
  change: string;
}

export interface ChannelForecast {
  items: ChannelForecastItem[];
}

type SiteChannelMap = Record<ChannelId, ChannelHealthScore>;
type SiteForecastMap = Record<ChannelId, ChannelForecast>;

const hostopiaHealth: SiteChannelMap = {
  website: {
    overall: 87,
    subscores: [
      { label: "Traffic Health", score: 92 },
      { label: "Engagement Health", score: 85 },
      { label: "Conversion Health", score: 78 },
      { label: "Social Health", score: 89 },
      { label: "Lead Quality", score: 84 },
    ],
  },
  social: {
    overall: 84,
    subscores: [
      { label: "Reach Health", score: 88 },
      { label: "Engagement Health", score: 86 },
      { label: "Follower Growth", score: 79 },
      { label: "Content Health", score: 82 },
      { label: "Lead Quality", score: 81 },
    ],
  },
  email: {
    overall: 81,
    subscores: [
      { label: "Deliverability Health", score: 94 },
      { label: "Open Rate Health", score: 85 },
      { label: "Click Health", score: 72 },
      { label: "List Growth", score: 80 },
      { label: "Lead Quality", score: 78 },
    ],
  },
  search: {
    overall: 86,
    subscores: [
      { label: "Organic Health", score: 90 },
      { label: "Paid Efficiency", score: 82 },
      { label: "CTR Health", score: 84 },
      { label: "Ranking Health", score: 88 },
      { label: "Lead Quality", score: 83 },
    ],
  },
  video: {
    overall: 83,
    subscores: [
      { label: "Play Rate Health", score: 86 },
      { label: "Watch Time Health", score: 84 },
      { label: "Completion Health", score: 81 },
      { label: "Discovery Health", score: 79 },
      { label: "Lead Quality", score: 80 },
    ],
  },
};

const otherBrandHealth: SiteChannelMap = {
  website: {
    overall: 76,
    subscores: [
      { label: "Traffic Health", score: 78 },
      { label: "Engagement Health", score: 74 },
      { label: "Conversion Health", score: 71 },
      { label: "Social Health", score: 75 },
      { label: "Lead Quality", score: 79 },
    ],
  },
  social: {
    overall: 73,
    subscores: [
      { label: "Reach Health", score: 76 },
      { label: "Engagement Health", score: 74 },
      { label: "Follower Growth", score: 68 },
      { label: "Content Health", score: 72 },
      { label: "Lead Quality", score: 75 },
    ],
  },
  email: {
    overall: 72,
    subscores: [
      { label: "Deliverability Health", score: 88 },
      { label: "Open Rate Health", score: 70 },
      { label: "Click Health", score: 74 },
      { label: "List Growth", score: 68 },
      { label: "Lead Quality", score: 71 },
    ],
  },
  search: {
    overall: 75,
    subscores: [
      { label: "Organic Health", score: 78 },
      { label: "Paid Efficiency", score: 72 },
      { label: "CTR Health", score: 76 },
      { label: "Ranking Health", score: 74 },
      { label: "Lead Quality", score: 73 },
    ],
  },
  video: {
    overall: 74,
    subscores: [
      { label: "Play Rate Health", score: 76 },
      { label: "Watch Time Health", score: 73 },
      { label: "Completion Health", score: 72 },
      { label: "Discovery Health", score: 70 },
      { label: "Lead Quality", score: 75 },
    ],
  },
};

const hostopiaForecast: SiteForecastMap = {
  website: {
    items: [
      { label: "Traffic Next Month", value: "138K", change: "+11%" },
      { label: "Leads Expected", value: "520", change: "+18%" },
      { label: "Pipeline Impact", value: "+$1.2M", change: "projected" },
    ],
  },
  social: {
    items: [
      { label: "Reach Next Month", value: "105K", change: "+12%" },
      { label: "Leads Expected", value: "85", change: "+22%" },
      { label: "Pipeline Impact", value: "+$340K", change: "projected" },
    ],
  },
  email: {
    items: [
      { label: "Opens Next Month", value: "15.6K", change: "+8%" },
      { label: "Leads Expected", value: "142", change: "+14%" },
      { label: "Pipeline Impact", value: "+$580K", change: "projected" },
    ],
  },
  search: {
    items: [
      { label: "Organic Clicks Next Month", value: "32.4K", change: "+14%" },
      { label: "Leads Expected", value: "310", change: "+16%" },
      { label: "Pipeline Impact", value: "+$890K", change: "projected" },
    ],
  },
  video: {
    items: [
      { label: "Video Plays Next Month", value: "33.8K", change: "+11%" },
      { label: "Leads Expected", value: "95", change: "+20%" },
      { label: "Pipeline Impact", value: "+$420K", change: "projected" },
    ],
  },
};

const otherBrandForecast: SiteForecastMap = {
  website: {
    items: [
      { label: "Traffic Next Month", value: "72K", change: "+6%" },
      { label: "Leads Expected", value: "210", change: "+9%" },
      { label: "Pipeline Impact", value: "+$480K", change: "projected" },
    ],
  },
  social: {
    items: [
      { label: "Reach Next Month", value: "46K", change: "+8%" },
      { label: "Leads Expected", value: "38", change: "+11%" },
      { label: "Pipeline Impact", value: "+$120K", change: "projected" },
    ],
  },
  email: {
    items: [
      { label: "Opens Next Month", value: "6.4K", change: "+5%" },
      { label: "Leads Expected", value: "52", change: "+7%" },
      { label: "Pipeline Impact", value: "+$210K", change: "projected" },
    ],
  },
  search: {
    items: [
      { label: "Organic Clicks Next Month", value: "14.2K", change: "+9%" },
      { label: "Leads Expected", value: "98", change: "+10%" },
      { label: "Pipeline Impact", value: "+$290K", change: "projected" },
    ],
  },
  video: {
    items: [
      { label: "Video Plays Next Month", value: "13.6K", change: "+7%" },
      { label: "Leads Expected", value: "34", change: "+12%" },
      { label: "Pipeline Impact", value: "+$95K", change: "projected" },
    ],
  },
};

const HEALTH_BY_SITE: Record<string, SiteChannelMap> = {
  hostopia: hostopiaHealth,
  "other-brand": otherBrandHealth,
};

const FORECAST_BY_SITE: Record<string, SiteForecastMap> = {
  hostopia: hostopiaForecast,
  "other-brand": otherBrandForecast,
};

function resolveSiteId(siteId: string | null): string {
  return siteId && HEALTH_BY_SITE[siteId] ? siteId : "hostopia";
}

export function getChannelHealthScore(
  siteId: string | null,
  channelId: ChannelId
): ChannelHealthScore | undefined {
  return HEALTH_BY_SITE[resolveSiteId(siteId)]?.[channelId];
}

export function getChannelForecast(
  siteId: string | null,
  channelId: ChannelId
): ChannelForecast | undefined {
  return FORECAST_BY_SITE[resolveSiteId(siteId)]?.[channelId];
}

export const INDICATOR_LABELS: Record<
  OpportunityIndicator,
  { emoji: string; label: string; className: string }
> = {
  strong: {
    emoji: "🟢",
    label: "Strong Growth",
    className: "text-emerald-700 bg-emerald-50 border-emerald-200",
  },
  opportunity: {
    emoji: "🟡",
    label: "Opportunity",
    className: "text-amber-700 bg-amber-50 border-amber-200",
  },
  attention: {
    emoji: "🔴",
    label: "Attention Required",
    className: "text-red-700 bg-red-50 border-red-200",
  },
};
