"use client";

import { CalendarDays } from "lucide-react";
import { TIMEFRAME_OPTIONS } from "@/lib/timeframe";
import { useTimeframe } from "./TimeframeProvider";

export default function ChannelTimeframeSelector() {
  const { days, setTimeframe } = useTimeframe();

  return (
    <div className="border-b border-border bg-muted/30">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <CalendarDays className="h-4 w-4" aria-hidden />
          Time frame
        </div>
        <div className="flex flex-wrap gap-1.5">
          {TIMEFRAME_OPTIONS.map((option) => {
            const isActive = days === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setTimeframe(option.value)}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "border border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
                aria-pressed={isActive}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
