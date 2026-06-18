import type { Metadata } from "next";
import EmailChannelClient from "./EmailChannelClient";

export const metadata: Metadata = {
  title: "Email Marketing | AI Marketing Command Center",
  description: "Track email campaigns, opens, clicks, bounces, and unsubscribes.",
};

interface PageProps {
  searchParams: { site?: string };
}

export default function EmailChannelPage({ searchParams }: PageProps) {
  const siteId = searchParams.site ?? null;
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <EmailChannelClient siteId={siteId} />
    </div>
  );
}
