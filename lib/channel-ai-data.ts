export interface ChannelAiContent {
  summary: string;
  nextSteps: string[];
}

export const CHANNEL_AI_CONTENT: Record<string, ChannelAiContent> = {
  website: {
    summary:
      "Traffic is up over the last 4 weeks with strong session growth. Bounce rate is trending down, which suggests better relevance and engagement. Mobile and desktop are both contributing; consider deepening mobile experience if conversion rates differ by device.",
    nextSteps: [
      "Review top exit pages and add clear CTAs or content upgrades.",
      "A/B test landing pages for paid and organic to improve conversion rate.",
      "Segment traffic by device and country in GA4 to prioritise high-intent regions.",
    ],
  },
  social: {
    summary:
      "Reach and engagements are growing. Engagement rate is healthy; follower growth is steady. Content mix is driving impressions—identify which formats (video, carousel, story) drive the most saves and shares to double down.",
    nextSteps: [
      "Post consistently on top-performing platforms and replicate best-performing formats.",
      "Respond to comments and DMs to boost engagement and loyalty.",
      "Run a short paid test to amplify best organic posts and grow followers.",
    ],
  },
  email: {
    summary:
      "Open rates are stable with a slight dip in click rate. Deliverability looks good (low bounce). List growth and retention are key—focus on valuable content and segmenting so sends feel personal.",
    nextSteps: [
      "Segment by engagement (openers vs non-openers) and tailor frequency and content.",
      "Test subject lines and send times with small segments before full sends.",
      "Add a preference centre so subscribers choose topics and frequency.",
    ],
  },
  search: {
    summary:
      "Organic clicks and impressions are up; average position is improving. CTR has room to grow—titles and meta descriptions can be optimised for both relevance and appeal. Paid and organic together are driving strong volume.",
    nextSteps: [
      "Refresh title and meta description for top pages with high impressions and low CTR.",
      "Align organic and paid keyword themes and landing pages for a consistent journey.",
      "Track query trends in GSC and create or update content for rising topics.",
    ],
  },
  video: {
    summary:
      "Video play rate and completion are solid. Views are concentrated on a few key pieces—use those as templates for length, hook, and CTA placement. Average watch time suggests viewers stay when the value is clear early.",
    nextSteps: [
      "Repurpose top videos into shorts and clips for social and ads.",
      "Add clear CTAs in the first 30 seconds and again before the end card.",
      "Test thumbnails and titles to improve click-through from browse and search.",
    ],
  },
  leads: {
    summary:
      "Lead volume is up 18% with webinars and form fills driving the strongest growth. Outreach and farming programs are steady contributors. Paid search lead volume dipped — reallocate budget toward highest-converting webinar and form-fill sources.",
    nextSteps: [
      "Increase follow-up speed on form-fill leads — SQL rate is 2× higher when contacted within 1 hour.",
      "Replicate the top webinar format that generated 42 MQLs last month.",
      "Segment CRM leads by source and score to prioritise outreach sequences.",
    ],
  },
};

export const CHANNEL_NAV_ITEMS = [
  { id: "website", label: "Website", href: "/channels/website" },
  { id: "leads", label: "Leads", href: "/channels/leads" },
  { id: "social", label: "Social", href: "/channels/social" },
  { id: "email", label: "Email", href: "/channels/email" },
  { id: "search", label: "Search", href: "/channels/search" },
  { id: "video", label: "Video", href: "/channels/video" },
] as const;

export type ChannelId = (typeof CHANNEL_NAV_ITEMS)[number]["id"];

export function getChannelIdFromPath(pathname: string): ChannelId | null {
  const segment = pathname.split("/").filter(Boolean).pop();
  if (segment && CHANNEL_NAV_ITEMS.some((c) => c.id === segment)) {
    return segment as ChannelId;
  }
  return null;
}
