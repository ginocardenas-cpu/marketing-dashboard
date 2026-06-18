"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Lightbulb,
  Sparkles,
  Target,
} from "lucide-react";
import { SITES, getSiteById, getDefaultSite } from "@/lib/sites-data";
import {
  CHANNEL_QUICK_LINKS,
  KEY_INSIGHT,
  OVERALL_MARKETING_SCORE,
  RECOMMENDED_ACTIONS,
  TOP_OPPORTUNITY,
} from "@/lib/command-center-data";
import SiteSwitcher from "./SiteSwitcher";
import MarketingAssistantPanel from "./MarketingAssistantPanel";
import WebsiteAuditPanel from "./WebsiteAuditPanel";
import ChannelQuickLinkIcon from "./ChannelQuickLinkIcon";

interface CommandCenterHomeProps {
  siteId: string | null;
}

function ScoreRing({ score }: { score: number }) {
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex h-36 w-36 items-center justify-center">
      <svg className="-rotate-90" width="144" height="144" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r="54"
          fill="none"
          stroke="var(--border)"
          strokeWidth="10"
        />
        <circle
          cx="60"
          cy="60"
          r="54"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold text-foreground">{score}</span>
        <span className="text-sm text-muted-foreground">/ 100</span>
      </div>
    </div>
  );
}

export default function CommandCenterHome({ siteId }: CommandCenterHomeProps) {
  const [assistantOpen, setAssistantOpen] = useState(false);
  const currentSite = (siteId && getSiteById(siteId)) || getDefaultSite();
  const siteQuery = siteId ? `?site=${encodeURIComponent(siteId)}` : "";

  return (
    <>
      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-[auto_1fr_auto] sm:items-center">
        <div className="hidden sm:block" aria-hidden="true" />
        <div className="flex flex-col items-center justify-center text-center">
          <div className="mb-2 flex items-center gap-2 text-primary">
            <Sparkles className="h-5 w-5" aria-hidden />
            <span className="text-sm font-medium uppercase tracking-wide">AI-Powered</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            Welcome to the AI Marketing Command Center
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Your centralized hub for marketing intelligence. Consolidate performance data, uncover
            opportunities, and receive AI-powered insights and recommendations to drive smarter,
            faster decisions.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-end">
          <SiteSwitcher sites={SITES} currentSite={currentSite} />
          <span className="text-sm text-muted-foreground">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* Overall score */}
      <section className="mb-8 rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-center sm:text-left">
            <h2 className="text-lg font-semibold text-foreground">Overall Marketing Score</h2>
            <p className="mt-1 max-w-md text-sm text-muted-foreground">
              Composite score based on traffic, engagement, conversion, and channel performance
              vs. industry benchmarks.
            </p>
          </div>
          <ScoreRing score={OVERALL_MARKETING_SCORE} />
        </div>
      </section>

      {/* Key highlights */}
      <section className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          This Month&apos;s Key Highlights
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="mb-3 flex items-center gap-2 text-primary">
              <Lightbulb className="h-5 w-5" aria-hidden />
              <h3 className="font-semibold text-foreground">This Month&apos;s Key Insight</h3>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">{KEY_INSIGHT}</p>
          </div>
          <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-5 shadow-sm">
            <div className="mb-3 flex items-center gap-2 text-amber-700">
              <Target className="h-5 w-5" aria-hidden />
              <h3 className="font-semibold text-foreground">Top Opportunity</h3>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">{TOP_OPPORTUNITY}</p>
          </div>
        </div>
      </section>

      {/* Recommended actions + assistant */}
      <section className="mb-8 grid gap-6 lg:grid-cols-[1fr_auto]">
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <h3 className="mb-4 font-semibold text-foreground">Recommended Actions</h3>
          <ul className="space-y-3">
            {RECOMMENDED_ACTIONS.map((action) => (
              <li key={action} className="flex items-start gap-3 text-sm text-foreground">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                {action}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col items-center justify-center rounded-xl border border-primary/30 bg-primary/5 p-6 text-center lg:min-w-[280px]">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Bot className="h-6 w-6" />
          </div>
          <h3 className="font-semibold text-foreground">Need help taking action?</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Get AI instructions and answers about your marketing performance.
          </p>
          <button
            type="button"
            onClick={() => setAssistantOpen(true)}
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Sparkles className="h-4 w-4" />
            Ask your Marketing Assistant
          </button>
        </div>
      </section>

      {/* Website audit */}
      <section className="mb-8">
        <WebsiteAuditPanel />
      </section>

      {/* Channel quick links */}
      <section className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-foreground">Jump to Marketing Channel</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CHANNEL_QUICK_LINKS.map((channel) => (
            <Link
              key={channel.id}
              href={`${channel.href}${siteQuery}`}
              className="group flex items-start gap-4 rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
            >
              <ChannelQuickLinkIcon iconKey={channel.iconKey} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold text-foreground group-hover:text-primary">
                    {channel.name}
                  </h3>
                  <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{channel.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="rounded-lg border border-border bg-muted p-4 text-center text-sm text-muted-foreground">
        <p>
          This command center uses sample data. Connect Google Analytics, Meta, your email provider,
          and Search Console per site to show live metrics and AI insights.
        </p>
      </div>

      <MarketingAssistantPanel open={assistantOpen} onClose={() => setAssistantOpen(false)} />
    </>
  );
}
