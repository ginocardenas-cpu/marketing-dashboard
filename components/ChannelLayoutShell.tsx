"use client";

import { Suspense } from "react";
import { TimeframeProvider } from "./TimeframeProvider";
import ChannelBenchmarkBanner from "./ChannelBenchmarkBanner";
import ChannelNav from "./ChannelNav";
import ChannelTimeframeSelector from "./ChannelTimeframeSelector";
import ChannelIntelligenceBanner from "./ChannelIntelligenceBanner";
import ChannelAiSummaryBanner from "./ChannelAiSummaryBanner";
import ChannelTrendBanner from "./ChannelTrendBanner";

export default function ChannelLayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TimeframeProvider>
      <Suspense fallback={null}>
        <ChannelBenchmarkBanner />
        <ChannelNav />
        <ChannelTimeframeSelector />
        <ChannelIntelligenceBanner />
        <ChannelAiSummaryBanner />
        <ChannelTrendBanner />
      </Suspense>
      {children}
    </TimeframeProvider>
  );
}
