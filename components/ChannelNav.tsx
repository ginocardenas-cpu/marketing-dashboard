"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { CHANNEL_NAV_ITEMS, getChannelIdFromPath } from "@/lib/channel-ai-data";

export default function ChannelNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeId = getChannelIdFromPath(pathname);
  const queryString = searchParams.toString();

  if (!activeId) return null;

  return (
    <nav aria-label="Marketing channels">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex gap-1.5 overflow-x-auto py-4">
          {CHANNEL_NAV_ITEMS.map((channel) => {
            const isActive = channel.id === activeId;
            return (
              <Link
                key={channel.id}
                href={queryString ? `${channel.href}?${queryString}` : channel.href}
                className={`shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {channel.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
