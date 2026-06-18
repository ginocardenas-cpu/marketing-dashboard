"use client";

import type { ChannelHealthScore } from "@/lib/channel-intelligence-data";

interface ChannelHealthScoreCardProps {
  health: ChannelHealthScore;
}

function ScoreRing({ score }: { score: number }) {
  const r = 54;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex h-36 w-36 items-center justify-center">
      <svg className="-rotate-90" width="144" height="144" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={r} fill="none" stroke="var(--border)" strokeWidth="10" />
        <circle
          cx="60"
          cy="60"
          r={r}
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

export default function ChannelHealthScoreCard({ health }: ChannelHealthScoreCardProps) {
  return (
    <section className="rounded-lg border border-border bg-card p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-foreground">Marketing Health Score</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Composite channel health across key performance dimensions.
      </p>
      <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row sm:items-start">
        <div className="flex flex-col items-center text-center sm:shrink-0">
          <ScoreRing score={health.overall} />
          <p className="mt-2 text-sm font-medium text-muted-foreground">Overall Health</p>
        </div>
        <div className="grid flex-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {health.subscores.map((sub) => (
            <div
              key={sub.label}
              className="flex items-center justify-between rounded-lg border border-border bg-muted/40 px-4 py-3"
            >
              <span className="text-sm text-muted-foreground">{sub.label}</span>
              <span className="text-lg font-bold tabular-nums text-foreground">{sub.score}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
