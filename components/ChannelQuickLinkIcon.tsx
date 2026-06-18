import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullseye,
  faEnvelope,
  faGlobe,
  faMagnifyingGlass,
  faShareNodes,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import type { ChannelIconKey } from "@/lib/command-center-data";

const CHANNEL_ICONS: Record<ChannelIconKey, IconDefinition> = {
  website: faGlobe,
  leads: faBullseye,
  social: faShareNodes,
  email: faEnvelope,
  search: faMagnifyingGlass,
  video: faVideo,
};

const CHANNEL_ICON_COLORS: Record<ChannelIconKey, string> = {
  website: "bg-primary",
  leads: "bg-blue-600",
  social: "bg-violet-600",
  email: "bg-orange-500",
  search: "bg-emerald-600",
  video: "bg-rose-600",
};

interface ChannelQuickLinkIconProps {
  iconKey: ChannelIconKey;
  className?: string;
}

export default function ChannelQuickLinkIcon({ iconKey, className = "" }: ChannelQuickLinkIconProps) {
  return (
    <span
      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-white shadow-sm ${CHANNEL_ICON_COLORS[iconKey]} ${className}`}
      aria-hidden
    >
      <FontAwesomeIcon icon={CHANNEL_ICONS[iconKey]} className="h-6 w-6" />
    </span>
  );
}
