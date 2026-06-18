import { INDICATOR_LABELS, type OpportunityIndicator } from "@/lib/channel-intelligence-data";

interface OpportunityBadgeProps {
  indicator: OpportunityIndicator;
  compact?: boolean;
}

export default function OpportunityBadge({ indicator, compact }: OpportunityBadgeProps) {
  const config = INDICATOR_LABELS[indicator];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${config.className}`}
    >
      <span aria-hidden>{config.emoji}</span>
      {!compact && config.label}
    </span>
  );
}
