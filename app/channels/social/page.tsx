import type { Metadata } from "next";
import SocialChannelClient from "./SocialChannelClient";

export const metadata: Metadata = {
  title: "Social Media | AI Marketing Command Center",
  description: "Track X, Facebook, and LinkedIn performance — followers, impressions, engagement.",
};

interface PageProps {
  searchParams: { site?: string };
}

export default function SocialChannelPage({ searchParams }: PageProps) {
  const siteId = searchParams.site ?? null;
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <SocialChannelClient siteId={siteId} />
    </div>
  );
}
