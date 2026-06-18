"use client";

import { TrendingUp } from "lucide-react";
import type { ChannelBenchmark } from "@/lib/sites-data";

interface BenchmarkComparisonProps {
  benchmark: ChannelBenchmark;
}

export default function BenchmarkComparison({ benchmark }: BenchmarkComparisonProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        Your Performance vs. Industry
      </h3>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg bg-muted/60 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Your Performance
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{benchmark.metricLabel}</p>
          <p className="mt-2 text-2xl font-bold text-foreground">{benchmark.yourPerformance}</p>
        </div>
        <div className="rounded-lg bg-muted/60 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Industry Average
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{benchmark.metricLabel}</p>
          <p className="mt-2 text-2xl font-bold text-muted-foreground">
            {benchmark.industryAverage}
          </p>
        </div>
        <div className="flex flex-col justify-center rounded-lg border border-primary/20 bg-primary/5 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-primary">Result</p>
          <p className="mt-2 flex items-center gap-2 text-lg font-bold text-primary">
            <TrendingUp className="h-5 w-5 shrink-0" aria-hidden />
            {benchmark.resultLabel}
          </p>
        </div>
      </div>
    </div>
  );
}
