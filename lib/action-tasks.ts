export interface ActionTaskDefinition {
  id: string;
  text: string;
}

export interface ActionTaskCompletion {
  completedAt: string;
  encouragement: string;
}

export type ActionTaskCompletionMap = Record<string, ActionTaskCompletion>;

const STORAGE_PREFIX = "marketing-cc-tasks";

export const ENCOURAGEMENT_MESSAGES = [
  "Great work — keep the momentum going!",
  "Awesome — that's a high-impact move.",
  "Nice one — your next step is waiting below.",
  "That's amazing — small changes add up fast.",
  "Well done — you're building real marketing momentum.",
  "Excellent — one step closer to stronger performance.",
] as const;

export function pickEncouragement(taskId: string): string {
  const index = taskId.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return ENCOURAGEMENT_MESSAGES[index % ENCOURAGEMENT_MESSAGES.length];
}

function storageKey(siteId: string | null, listId: string): string {
  return `${STORAGE_PREFIX}:${siteId ?? "default"}:${listId}`;
}

export function loadTaskCompletions(
  siteId: string | null,
  listId: string
): ActionTaskCompletionMap {
  if (typeof window === "undefined") return {};

  try {
    const raw = window.localStorage.getItem(storageKey(siteId, listId));
    if (!raw) return {};
    return JSON.parse(raw) as ActionTaskCompletionMap;
  } catch {
    return {};
  }
}

export function saveTaskCompletions(
  siteId: string | null,
  listId: string,
  completions: ActionTaskCompletionMap
): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(storageKey(siteId, listId), JSON.stringify(completions));
  } catch {
    // Ignore quota or privacy mode errors in the mockup.
  }
}

export function formatTaskCompletedAt(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
