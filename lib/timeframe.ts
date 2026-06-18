import type { MetricSummary, TimeSeriesPoint } from "@/lib/sites-data";

export const TIMEFRAME_OPTIONS = [
  { value: 3, label: "Last 3 days" },
  { value: 7, label: "Last 7 days" },
  { value: 30, label: "Last 30 days" },
  { value: 90, label: "Last 90 days" },
  { value: 180, label: "Last 180 days" },
  { value: 365, label: "Last 365 days" },
] as const;

export type TimeframeDays = (typeof TIMEFRAME_OPTIONS)[number]["value"];
export const DEFAULT_TIMEFRAME: TimeframeDays = 30;

export function parseTimeframeParam(param: string | null): TimeframeDays {
  const match = param?.match(/^(\d+)d$/);
  if (!match) return DEFAULT_TIMEFRAME;
  const days = Number(match[1]) as TimeframeDays;
  return TIMEFRAME_OPTIONS.some((o) => o.value === days) ? days : DEFAULT_TIMEFRAME;
}

export function timeframeToParam(days: TimeframeDays): string {
  return `${days}d`;
}

export function getTimeframeLabel(days: TimeframeDays): string {
  return TIMEFRAME_OPTIONS.find((o) => o.value === days)?.label ?? `Last ${days} days`;
}

function isRateMetric(label: string, value: string | number): boolean {
  const s = String(value);
  return /rate|ctr|position|%/i.test(label) || s.includes("%") || /^\d+\.\d+$/.test(s);
}

function isTimeMetric(value: string | number): boolean {
  return /\dm\s|\d+s|\d+:\d+/i.test(String(value));
}

function parseCount(value: string | number): { num: number; suffix: string } | null {
  const s = String(value).replace(/,/g, "");
  const match = s.match(/^([\d.]+)\s*([KMB])?$/i);
  if (!match) return null;
  let num = parseFloat(match[1]);
  const suffix = match[2]?.toUpperCase() ?? "";
  if (suffix === "K") num *= 1_000;
  if (suffix === "M") num *= 1_000_000;
  if (suffix === "B") num *= 1_000_000_000;
  return { num, suffix };
}

function formatCount(num: number): string {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num.toLocaleString(undefined, { maximumFractionDigits: 0 });
}

/** Scale volume metrics relative to a 30-day baseline period. */
export function applyTimeframeToMetrics(
  metrics: MetricSummary[],
  days: TimeframeDays
): MetricSummary[] {
  const scale = days / DEFAULT_TIMEFRAME;
  const changeScale = days <= 7 ? 0.45 : days <= 30 ? 1 : days <= 90 ? 1.15 : days <= 180 ? 1.25 : 1.35;

  return metrics.map((m) => {
    const subtitle = getTimeframeLabel(days);
    let value = m.value;

    if (!isRateMetric(m.label, m.value) && !isTimeMetric(m.value)) {
      const parsed = parseCount(m.value);
      if (parsed) {
        value = formatCount(parsed.num * scale);
      } else if (typeof m.value === "number") {
        value = Math.round(m.value * scale);
      }
    }

    let change = m.change;
    if (change !== undefined) {
      change = Math.round(change * changeScale * 10) / 10;
      if (days <= 3) change = Math.max(-99, Math.min(99, change));
    }

    return { ...m, value, change, subtitle };
  });
}

function sliceVariation(index: number, total: number): number {
  return 0.88 + ((index + 1) / total) * 0.18;
}

/** Adapt 4-week baseline chart data to the selected timeframe. */
export function adaptChartDataForTimeframe(
  baseData: TimeSeriesPoint[],
  days: TimeframeDays
): TimeSeriesPoint[] {
  if (days === DEFAULT_TIMEFRAME) return baseData;

  const baseTotal = baseData.reduce((sum, p) => sum + p.value, 0);
  const dailyAvg = baseTotal / 30;

  if (days <= 7) {
    return Array.from({ length: days }, (_, i) => ({
      date: days === 3 ? `Day ${i + 1}` : `D${i + 1}`,
      value: Math.round(dailyAvg * sliceVariation(i, days)),
      annotation:
        i === days - 1
          ? baseData[baseData.length - 1]?.annotation
          : i === Math.floor(days / 2)
            ? baseData[Math.floor(baseData.length / 2)]?.annotation
            : undefined,
    }));
  }

  if (days === 90) {
    const monthScale = baseTotal * (days / 30) / 3;
    return [1, 2, 3].map((m, i) => ({
      date: `Month ${m}`,
      value: Math.round(monthScale * sliceVariation(i, 3)),
      annotation: baseData[i + 1]?.annotation,
    }));
  }

  if (days === 180) {
    const monthScale = baseTotal * (days / 30) / 6;
    return [1, 2, 3, 4, 5, 6].map((m, i) => ({
      date: `Month ${m}`,
      value: Math.round(monthScale * sliceVariation(i, 6)),
      annotation: i === 2 || i === 5 ? baseData[i % baseData.length]?.annotation : undefined,
    }));
  }

  const monthScale = baseTotal * (days / 30) / 12;
  return Array.from({ length: 12 }, (_, i) => ({
    date: `M${i + 1}`,
    value: Math.round(monthScale * sliceVariation(i, 12)),
    annotation: i === 2 || i === 5 || i === 8 || i === 11 ? baseData[i % baseData.length]?.annotation : undefined,
  }));
}

export function getTrendSectionTitle(days: TimeframeDays): string {
  if (days <= 7) return `Trend (${getTimeframeLabel(days).toLowerCase()})`;
  if (days === 30) return "Trend (last 4 weeks)";
  if (days === 90) return "Trend (last 3 months)";
  if (days === 180) return "Trend (last 6 months)";
  return "Trend (last 12 months)";
}

export function scaleCount(value: number, days: TimeframeDays): number {
  return Math.round(value * (days / DEFAULT_TIMEFRAME));
}

/** Scale or slice line-chart rows for the selected timeframe. */
export function adaptLineSeriesData<T extends object>(
  data: T[],
  days: TimeframeDays,
  numericKeys: (keyof T)[]
): T[] {
  const sliceCount = days <= 7 ? Math.min(days, data.length) : data.length;
  const rows = days <= 7 ? data.slice(-sliceCount) : data;

  return rows.map((row) => {
    const scaled = { ...row };
    for (const key of numericKeys) {
      const val = scaled[key];
      if (typeof val === "number") {
        scaled[key] = scaleCount(val, days) as T[keyof T];
      }
    }
    return scaled;
  });
}
