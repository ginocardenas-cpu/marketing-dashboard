"use client";

import { Sparkles, TrendingUp } from "lucide-react";
import type { ChannelForecast } from "@/lib/channel-intelligence-data";

interface ChannelAiForecastCardProps {
  forecast: ChannelForecast;
}

export default function ChannelAiForecastCard({ forecast }: ChannelAiForecastCardProps) {
  return (
    <section className="rounded-lg border border-primary/25 bg-gradient-to-br from-primary/5 to-card p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-primary" aria-hidden />
        <h2 className="text-lg font-semibold text-foreground">AI Forecast</h2>
      </div>
      <p className="mb-5 text-sm text-muted-foreground">Current trend suggests:</p>
      <div className="space-y-4">
        {forecast.items.map((item) => (
          <div
            key={item.label}
            className="flex items-start justify-between gap-4 rounded-lg border border-border/60 bg-card/80 px-4 py-3"
          >
            <div>
              <p className="text-sm text-muted-foreground">{item.label}</p>
              <p className="mt-1 text-2xl font-bold text-foreground">{item.value}</p>
            </div>
            <div className="flex items-center gap-1 pt-1 text-sm font-semibold text-primary">
              {item.change !== "projected" && <TrendingUp className="h-4 w-4" aria-hidden />}
              <span>{item.change}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
