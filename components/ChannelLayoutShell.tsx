"use client";

import { Suspense } from "react";
import { TimeframeProvider } from "./TimeframeProvider";
import ScrollToTopOnNavigate from "./ScrollToTopOnNavigate";
import ChannelNav from "./ChannelNav";
import ChannelPageTitle from "./ChannelPageTitle";
import ChannelTimeframeSelector from "./ChannelTimeframeSelector";
import ChannelBenchmarkBanner from "./ChannelBenchmarkBanner";
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
      <ScrollToTopOnNavigate />
      <Suspense fallback={null}>
        <ChannelNav />
        <ChannelPageTitle />
        <ChannelTimeframeSelector />
        <ChannelBenchmarkBanner />
        <ChannelIntelligenceBanner />
        <ChannelAiSummaryBanner />
        <ChannelTrendBanner />
      </Suspense>
      {children}
    </TimeframeProvider>
  );
}
