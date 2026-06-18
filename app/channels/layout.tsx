import Link from "next/link";
import { Suspense } from "react";
import { ArrowLeft } from "lucide-react";
import ChannelLayoutShell from "@/components/ChannelLayoutShell";

export default function ChannelsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border/60">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Command Center
          </Link>
        </div>
      </div>
      <Suspense fallback={null}>
        <ChannelLayoutShell>{children}</ChannelLayoutShell>
      </Suspense>
    </div>
  );
}
