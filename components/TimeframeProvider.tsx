"use client";

import { createContext, useCallback, useContext, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  DEFAULT_TIMEFRAME,
  getTimeframeLabel,
  parseTimeframeParam,
  timeframeToParam,
  type TimeframeDays,
} from "@/lib/timeframe";

interface TimeframeContextValue {
  days: TimeframeDays;
  label: string;
  setTimeframe: (days: TimeframeDays) => void;
}

const TimeframeContext = createContext<TimeframeContextValue | null>(null);

export function TimeframeProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const days = parseTimeframeParam(searchParams.get("range"));
  const label = getTimeframeLabel(days);

  const setTimeframe = useCallback(
    (nextDays: TimeframeDays) => {
      const next = new URLSearchParams(searchParams.toString());
      if (nextDays === DEFAULT_TIMEFRAME) {
        next.delete("range");
      } else {
        next.set("range", timeframeToParam(nextDays));
      }
      const query = next.toString();
      router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const value = useMemo(
    () => ({ days, label, setTimeframe }),
    [days, label, setTimeframe]
  );

  return <TimeframeContext.Provider value={value}>{children}</TimeframeContext.Provider>;
}

export function useTimeframe(): TimeframeContextValue {
  const ctx = useContext(TimeframeContext);
  if (!ctx) {
    return {
      days: DEFAULT_TIMEFRAME,
      label: getTimeframeLabel(DEFAULT_TIMEFRAME),
      setTimeframe: () => {},
    };
  }
  return ctx;
}
