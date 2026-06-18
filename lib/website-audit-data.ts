/**
 * On-demand website audit sample data — replace with live crawler/API results.
 */

export type AuditStatus = "pass" | "warning" | "fail" | "neutral";

export interface AuditCheck {
  label: string;
  detail: string;
  status: AuditStatus;
  subDetail?: string;
}

export interface AuditCategory {
  id: string;
  title: string;
  icon: string;
  score: number;
  checks: AuditCheck[];
}

export const WEBSITE_AUDIT_CATEGORIES: AuditCategory[] = [
  {
    id: "usability",
    title: "Is your site easy to use?",
    icon: "👆",
    score: 66,
    checks: [
      { label: "Amount of content", detail: "6 pages with low content", status: "warning" },
      { label: "Spelling", detail: "13 potential errors", status: "fail" },
      { label: "Code quality", detail: "Issues detected", status: "fail" },
      { label: "Page errors", detail: "Errors detected", status: "fail" },
      { label: "404 page", detail: "Detected", status: "pass" },
      { label: "Broken links", detail: "5 detected (50 links checked)", status: "fail" },
      { label: "Alternative text", detail: "Alt text missing for image links", status: "warning" },
      { label: "Mobile friendly", detail: "Optimized", status: "pass" },
      { label: "Accessibility check", detail: "No issues detected", status: "pass" },
      { label: "Image optimization", detail: "Images are optimised", status: "pass" },
    ],
  },
  {
    id: "discovery",
    title: "Are you easy to find online?",
    icon: "📍",
    score: 24,
    checks: [
      { label: "Google Business Profile", detail: "No listing found", status: "fail" },
      { label: "Local listings", detail: "Unable to determine", status: "neutral" },
      { label: "Facebook page", detail: "Not detected", status: "fail" },
      { label: "AI readiness", detail: "3 issues detected", status: "warning" },
      { label: "Instagram account", detail: "Not detected", status: "fail" },
      { label: "YouTube channel", detail: "Unable to confirm", status: "warning" },
    ],
  },
  {
    id: "performance",
    title: "Does your site run well?",
    icon: "⚡",
    score: 95,
    checks: [
      { label: "Performance score", detail: "90% — Fast website", status: "pass" },
      { label: "SSL", detail: "Detected", status: "pass" },
      { label: "Web Vitals check", detail: "Average", status: "warning" },
    ],
  },
  {
    id: "seo",
    title: "Do you rank in search?",
    icon: "🔍",
    score: 44,
    checks: [
      { label: "Link text", detail: "Not optimized", status: "fail" },
      { label: "Location pages", detail: "Locations not provided", status: "neutral" },
      { label: "Blog", detail: "Not detected", status: "fail" },
      { label: "Sitemap", detail: "Issues detected", status: "fail" },
      { label: "Content keywords", detail: "Issues found", status: "fail" },
      { label: "Local structured data", detail: "71% missing", status: "fail" },
      { label: "Headings", detail: "Not well defined", status: "fail" },
      { label: "Titles and descriptions", detail: "Duplicates detected", status: "fail" },
      { label: "Backlinks", detail: "Under 40 detected", status: "warning" },
    ],
  },
  {
    id: "trust",
    title: "Do visitors trust your site?",
    icon: "👍",
    score: 51,
    checks: [
      { label: "SSL encryption", detail: "Mixed content", status: "warning" },
      { label: "Reviews", detail: "No reviews found", status: "fail" },
      { label: "Last update", detail: "64 days ago", status: "pass" },
      {
        label: "Contact details",
        detail: "Detected",
        status: "pass",
        subDetail: "support@hostopia.com · sales@hostopia.com",
      },
      { label: "Captcha", detail: "No forms capturing PII", status: "neutral" },
    ],
  },
];

export function getOverallAuditScore(categories: AuditCategory[]): number {
  if (!categories.length) return 0;
  return Math.round(categories.reduce((sum, c) => sum + c.score, 0) / categories.length);
}

export const AUDIT_FIX_RECOMMENDATIONS = [
  "Fix 5 broken links and add alt text to image links to improve usability score.",
  "Claim and optimize your Google Business Profile to boost local discovery.",
  "Refresh duplicate page titles and meta descriptions on top landing pages.",
  "Add customer reviews and resolve mixed-content SSL warnings to build trust.",
];
