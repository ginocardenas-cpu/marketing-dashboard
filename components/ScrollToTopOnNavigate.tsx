"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Scroll to top when navigating between channel pages (shared layout preserves scroll otherwise). */
export default function ScrollToTopOnNavigate() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
