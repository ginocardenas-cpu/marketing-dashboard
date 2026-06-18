import type { Metadata } from "next";
import { Suspense } from "react";
import CommandCenterHome from "@/components/CommandCenterHome";

export const metadata: Metadata = {
  title: "AI Marketing Command Center | Multi-site performance",
  description:
    "Your AI-powered marketing command center — overall score, key insights, and channel performance.",
};

interface PageProps {
  searchParams: Promise<{ site?: string }>;
}

export default async function CommandCenterPage({ searchParams }: PageProps) {
  const { site } = await searchParams;
  const siteId = site ?? null;

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Suspense fallback={null}>
          <CommandCenterHome siteId={siteId} />
        </Suspense>
      </div>
    </main>
  );
}
