/**
 * CRM lead activity sample data — replace with HubSpot/Salesforce API integration.
 */

import type { MetricSummary } from "@/lib/sites-data";

export interface LeadSourceRow {
  source: string;
  leads: number;
  mqls: number;
  sqls: number;
  share: number;
  changeVsPrior: number;
}

export interface LeadPipelineRow {
  stage: string;
  count: number;
  value: string;
}

export const LEADS_SUMMARY_KPIS: MetricSummary[] = [
  { label: "Total leads", value: "520", change: 18.2, trend: "up", subtitle: "Last 30 days" },
  { label: "MQLs", value: "186", change: 14.5, trend: "up", subtitle: "Marketing qualified" },
  { label: "SQLs", value: "74", change: 11.3, trend: "up", subtitle: "Sales qualified" },
  { label: "Lead-to-SQL rate", value: "14.2%", change: 1.8, trend: "up" },
];

export const LEADS_BY_SOURCE: LeadSourceRow[] = [
  { source: "Form fills", leads: 142, mqls: 58, sqls: 24, share: 27.3, changeVsPrior: 22.4 },
  { source: "Webinars", leads: 98, mqls: 42, sqls: 18, share: 18.8, changeVsPrior: 31.2 },
  { source: "Events", leads: 76, mqls: 34, sqls: 14, share: 14.6, changeVsPrior: 8.5 },
  { source: "Outreach", leads: 68, mqls: 22, sqls: 9, share: 13.1, changeVsPrior: 5.2 },
  { source: "Farming / nurture", leads: 54, mqls: 18, sqls: 6, share: 10.4, changeVsPrior: 12.1 },
  { source: "Paid search", leads: 42, mqls: 8, sqls: 2, share: 8.1, changeVsPrior: -3.4 },
  { source: "Referral / partner", leads: 24, mqls: 4, sqls: 1, share: 4.6, changeVsPrior: 15.0 },
  { source: "Social / content", leads: 16, mqls: 0, sqls: 0, share: 3.1, changeVsPrior: 6.7 },
];

export const LEADS_OVER_TIME = [
  { date: "Week 1", value: 108 },
  { date: "Week 2", value: 118 },
  { date: "Week 3", value: 142 },
  { date: "Week 4", value: 152 },
];

export const LEADS_PIPELINE: LeadPipelineRow[] = [
  { stage: "New lead", count: 520, value: "$2.6M" },
  { stage: "MQL", count: 186, value: "$1.4M" },
  { stage: "SQL", count: 74, value: "$890K" },
  { stage: "Opportunity", count: 38, value: "$620K" },
  { stage: "Closed won", count: 12, value: "$240K" },
];

/** Website-attributed lead sources (subset for Website channel). */
export const WEBSITE_LEAD_SOURCES: LeadSourceRow[] = [
  { source: "Contact form", leads: 86, mqls: 38, sqls: 16, share: 38.2, changeVsPrior: 24.1 },
  { source: "Demo request", leads: 42, mqls: 28, sqls: 12, share: 18.7, changeVsPrior: 18.5 },
  { source: "Content download", leads: 38, mqls: 12, sqls: 4, share: 16.9, changeVsPrior: 9.2 },
  { source: "Webinar registration", leads: 32, mqls: 14, sqls: 6, share: 14.2, changeVsPrior: 28.0 },
  { source: "Chat / live agent", leads: 18, mqls: 6, sqls: 2, share: 8.0, changeVsPrior: 12.5 },
  { source: "Pricing page CTA", leads: 10, mqls: 4, sqls: 2, share: 4.0, changeVsPrior: -5.0 },
];

export const WEBSITE_LEADS_KPIS: MetricSummary[] = [
  { label: "Website leads", value: "226", change: 19.4, trend: "up", subtitle: "CRM-attributed" },
  { label: "Form conversion rate", value: "3.8%", change: 0.6, trend: "up" },
  { label: "Avg. lead score", value: "72", change: 4.2, trend: "up" },
  { label: "Cost per lead", value: "$48", change: -8.1, trend: "down", indicator: "strong" },
];

export const LEADS_SUMMARY_KPIS_OTHER: MetricSummary[] = [
  { label: "Total leads", value: "210", change: 9.1, trend: "up", subtitle: "Last 30 days" },
  { label: "MQLs", value: "72", change: 7.2, trend: "up", subtitle: "Marketing qualified" },
  { label: "SQLs", value: 28, change: 5.8, trend: "up", subtitle: "Sales qualified" },
  { label: "Lead-to-SQL rate", value: "13.3%", change: 0.9, trend: "up" },
];

export function getLeadsKpis(siteId?: string): MetricSummary[] {
  return siteId === "other-brand" ? LEADS_SUMMARY_KPIS_OTHER : LEADS_SUMMARY_KPIS;
}
