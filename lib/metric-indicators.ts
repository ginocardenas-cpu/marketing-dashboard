import type { MetricSummary } from "@/lib/sites-data";
import type { OpportunityIndicator } from "@/lib/channel-intelligence-data";

const INVERSE_LABELS =
  /bounce|unsubscribe|cost per|avg\. position|ad cost|unsubscribes|bounced/i;

/** Derive an AI opportunity indicator when not explicitly set on the metric. */
export function resolveMetricIndicator(metric: MetricSummary): OpportunityIndicator {
  if (metric.indicator) return metric.indicator;

  const { change, trend, label } = metric;
  if (change === undefined || !trend) return "opportunity";

  const isInverse = INVERSE_LABELS.test(label);
  const absChange = Math.abs(change);

  if (isInverse) {
    if (trend === "down" && change < 0) {
      return absChange >= 3 ? "strong" : "opportunity";
    }
    if (trend === "up" && change > 0) return "attention";
    return "opportunity";
  }

  if (trend === "up") {
    if (change >= 8) return "strong";
    if (change >= 2) return "opportunity";
    return "opportunity";
  }

  if (trend === "down") {
    return absChange >= 2 ? "attention" : "opportunity";
  }

  return "opportunity";
}
