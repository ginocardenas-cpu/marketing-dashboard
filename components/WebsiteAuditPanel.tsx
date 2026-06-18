"use client";

import {
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  Loader2,
  ScanSearch,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import {
  AUDIT_FIX_RECOMMENDATIONS,
  getOverallAuditScore,
  WEBSITE_AUDIT_CATEGORIES,
  type AuditCategory,
  type AuditStatus,
} from "@/lib/website-audit-data";

function scoreColor(score: number): string {
  if (score >= 80) return "text-emerald-500";
  if (score >= 60) return "text-amber-500";
  if (score >= 40) return "text-orange-500";
  return "text-red-500";
}

function scoreStroke(score: number): string {
  if (score >= 80) return "#22c55e";
  if (score >= 60) return "#f59e0b";
  if (score >= 40) return "#f97316";
  return "#ef4444";
}

function CategoryScoreRing({ score }: { score: number }) {
  const r = 18;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative h-11 w-11 shrink-0">
      <svg className="-rotate-90" width="44" height="44" viewBox="0 0 44 44">
        <circle cx="22" cy="22" r={r} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="4" />
        <circle
          cx="22"
          cy="22"
          r={r}
          fill="none"
          stroke={scoreStroke(score)}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <span className={`absolute inset-0 flex items-center justify-center text-sm font-bold ${scoreColor(score)}`}>
        {score}
      </span>
    </div>
  );
}

function StatusIcon({ status }: { status: AuditStatus }) {
  if (status === "pass") return <CheckCircle2 className="h-5 w-5 text-emerald-500" aria-hidden />;
  if (status === "warning") return <AlertCircle className="h-5 w-5 text-amber-500" aria-hidden />;
  if (status === "fail") return <XCircle className="h-5 w-5 text-red-500" aria-hidden />;
  return <HelpCircle className="h-5 w-5 text-zinc-400" aria-hidden />;
}

function AuditCategoryCard({ category }: { category: AuditCategory }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
      <div className="flex items-center justify-between gap-3 bg-zinc-700 px-4 py-3 text-white">
        <div className="flex min-w-0 items-center gap-3">
          <span className="text-xl" aria-hidden>{category.icon}</span>
          <h4 className="truncate text-sm font-semibold sm:text-base">{category.title}</h4>
        </div>
        <CategoryScoreRing score={category.score} />
      </div>
      <ul className="divide-y divide-border">
        {category.checks.map((check) => (
          <li key={check.label} className="flex items-start gap-3 px-4 py-3">
            <StatusIcon status={check.status} />
            <div className="min-w-0 flex-1">
              <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
                <span className="text-sm font-medium text-foreground">{check.label}</span>
                <span className="text-sm text-muted-foreground">{check.detail}</span>
              </div>
              {check.subDetail && (
                <p className="mt-1 text-xs text-muted-foreground">{check.subDetail}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function WebsiteAuditPanel() {
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState<AuditCategory[] | null>(null);

  function runAudit() {
    setRunning(true);
    setResults(null);
    setTimeout(() => {
      setResults(WEBSITE_AUDIT_CATEGORIES);
      setRunning(false);
    }, 1800);
  }

  const overallScore = results ? getOverallAuditScore(results) : null;

  return (
    <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Website Audit</h3>
          <p className="mt-1 max-w-xl text-sm text-muted-foreground">
            Run an on-demand audit to score your site on usability, discoverability, performance,
            SEO, and trust — with clear fixes for what needs attention.
          </p>
        </div>
        <button
          type="button"
          onClick={runAudit}
          disabled={running}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {running ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Scanning site…
            </>
          ) : (
            <>
              <ScanSearch className="h-4 w-4" />
              Run Website Audit
            </>
          )}
        </button>
      </div>

      {results && overallScore !== null && (
        <div className="mt-6 space-y-6">
          <div className="flex items-center gap-4 rounded-lg border border-border bg-muted/40 px-4 py-3">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Overall audit score</p>
              <p className={`text-3xl font-bold ${scoreColor(overallScore)}`}>{overallScore}/100</p>
            </div>
            <p className="text-sm text-muted-foreground">
              {overallScore >= 70
                ? "Solid foundation — address flagged items to unlock more leads."
                : "Several areas need attention. Fixing high-impact issues can improve visibility and conversions."}
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {results.map((category) => (
              <AuditCategoryCard key={category.id} category={category} />
            ))}
          </div>

          <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
            <p className="mb-2 text-sm font-semibold text-foreground">AI advisor — recommended fixes</p>
            <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
              {AUDIT_FIX_RECOMMENDATIONS.map((fix) => (
                <li key={fix}>{fix}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}
