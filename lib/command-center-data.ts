/**
 * Sample data for the AI Marketing Command Center home page.
 */

export const OVERALL_MARKETING_SCORE = 74;

export const KEY_INSIGHT =
  "Website traffic increased 12.4% while bounce rate improved 3.2%, indicating higher quality visitor engagement.";

export const TOP_OPPORTUNITY =
  "Landing page conversion rates are underperforming traffic growth. Optimizing top entry pages could generate an estimated 15–20% increase in leads.";

export const RECOMMENDED_ACTIONS = [
  "Add CTA to top exit pages",
  "Launch A/B test on landing page",
  "Increase spend on highest-converting traffic source",
] as const;

export const ASSISTANT_SUGGESTED_QUESTIONS = [
  "Why did traffic increase?",
  "Which campaigns drove the most conversions?",
  "What should I do next month?",
  "Why are conversions down?",
] as const;

export const ASSISTANT_RESPONSES: Record<string, string> = {
  "Why did traffic increase?":
    "Traffic rose 12.4% this month, driven primarily by a LinkedIn campaign launch in Week 3 (+18% sessions) and an email campaign in Week 4 that contributed 23% of total traffic. Organic search also grew 8%, suggesting improved content visibility.",
  "Which campaigns drove the most conversions?":
    "Top converters this month: (1) LinkedIn sponsored content — 342 conversions at 4.8% CVR, (2) Email nurture sequence — 218 conversions at 6.2% CVR, (3) Google Ads brand campaign — 156 conversions at 3.1% CVR. Focus budget on email and LinkedIn for highest ROI.",
  "What should I do next month?":
    "Based on current trends, prioritize: (1) A/B test landing pages on your top 3 entry URLs, (2) Scale the LinkedIn campaign format that drove Week 3 lift, (3) Segment email lists by engagement and increase send frequency to openers, (4) Refresh meta titles on pages with high impressions but low CTR.",
  "Why are conversions down?":
    "Conversions dipped 2.1% despite traffic growth. The main driver is landing page conversion rate (2.8% vs 3.4% prior month). Traffic quality improved (lower bounce), but top entry pages lack clear CTAs. Fixing exit pages and running landing page tests should recover and exceed prior conversion levels.",
};

export const DEFAULT_ASSISTANT_GREETING =
  "Ask me about your marketing performance, recommended actions, or what to focus on next. I can explain trends and give step-by-step guidance.";

export interface ChannelQuickLink {
  id: string;
  name: string;
  description: string;
  href: string;
  icon: string;
}

export const CHANNEL_QUICK_LINKS: ChannelQuickLink[] = [
  {
    id: "website",
    name: "Website",
    description: "Sessions, pageviews, and engagement",
    href: "/channels/website",
    icon: "🌐",
  },
  {
    id: "social",
    name: "Social",
    description: "Reach, engagement, and followers",
    href: "/channels/social",
    icon: "📱",
  },
  {
    id: "email",
    name: "Email Marketing",
    description: "Sends, opens, and clicks",
    href: "/channels/email",
    icon: "✉️",
  },
  {
    id: "search",
    name: "Search (SEO & Paid)",
    description: "Organic and paid search performance",
    href: "/channels/search",
    icon: "🔍",
  },
  {
    id: "video",
    name: "Video",
    description: "Play rate, watch time, and top videos",
    href: "/channels/video",
    icon: "▶️",
  },
];
