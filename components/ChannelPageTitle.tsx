"use client";

import { usePathname } from "next/navigation";
import { CHANNEL_PAGE_TITLES, getChannelIdFromPath } from "@/lib/channel-ai-data";

export default function ChannelPageTitle() {
  const pathname = usePathname();
  const channelId = getChannelIdFromPath(pathname);
  if (!channelId) return null;

  return (
    <div className="mx-auto max-w-7xl px-4 pt-5 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        {CHANNEL_PAGE_TITLES[channelId]}
      </h1>
    </div>
  );
}
