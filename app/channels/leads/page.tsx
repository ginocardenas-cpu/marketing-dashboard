import type { Metadata } from "next";
import LeadsChannelClient from "./LeadsChannelClient";

export const metadata: Metadata = {
  title: "Leads & CRM | AI Marketing Command Center",
  description: "Track leads by source — forms, outreach, webinars, events, and pipeline activity.",
};

interface PageProps {
  searchParams: { site?: string };
}

export default function LeadsChannelPage({ searchParams }: PageProps) {
  const siteId = searchParams.site ?? null;
  return <LeadsChannelClient siteId={siteId} />;
}
