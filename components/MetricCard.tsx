"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { MetricSummary } from "@/lib/sites-data";
import { resolveMetricIndicator } from "@/lib/metric-indicators";
import OpportunityBadge from "./OpportunityBadge";

interface MetricCardProps {
  metric: MetricSummary;
}

export default function MetricCard({ metric }: MetricCardProps) {
  const { label, value, change, trend, subtitle } = metric;
  const showChange = change !== undefined && trend !== undefined;
  const indicator = resolveMetricIndicator(metric);

  return (
    <div className="rounded-lg border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md">
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-card-foreground">{value}</p>
      <div className="mt-2">
        <OpportunityBadge indicator={indicator} />
      </div>
      {subtitle && <p className="mt-2 text-xs text-muted-foreground">{subtitle}</p>}
      {showChange && (
        <div className="mt-2 flex items-center gap-1">
          {trend === "up" && (
            <TrendingUp className="h-4 w-4 text-[var(--chart-2)]" aria-hidden />
          )}
          {trend === "down" && (
            <TrendingDown className="h-4 w-4 text-destructive" aria-hidden />
          )}
          {trend === "neutral" && (
            <Minus className="h-4 w-4 text-muted-foreground" aria-hidden />
          )}
          <span
            className={`text-sm font-medium ${
              trend === "up"
                ? "text-[var(--chart-2)]"
                : trend === "down"
                  ? "text-destructive"
                  : "text-muted-foreground"
            }`}
          >
            {change > 0 ? "+" : ""}
            {change}%
          </span>
          <span className="text-xs text-muted-foreground">vs prior period</span>
        </div>
      )}
    </div>
  );
}
