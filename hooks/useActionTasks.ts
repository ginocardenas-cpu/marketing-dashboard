"use client";

import { useCallback, useEffect, useState } from "react";
import {
  type ActionTaskCompletionMap,
  loadTaskCompletions,
  pickEncouragement,
  saveTaskCompletions,
} from "@/lib/action-tasks";

export function useActionTasks(listId: string, siteId: string | null) {
  const [completions, setCompletions] = useState<ActionTaskCompletionMap>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setCompletions(loadTaskCompletions(siteId, listId));
    setHydrated(true);
  }, [siteId, listId]);

  useEffect(() => {
    if (!hydrated) return;
    saveTaskCompletions(siteId, listId, completions);
  }, [completions, siteId, listId, hydrated]);

  const toggleTask = useCallback((taskId: string, complete: boolean) => {
    setCompletions((prev) => {
      if (!complete) {
        const next = { ...prev };
        delete next[taskId];
        return next;
      }

      return {
        ...prev,
        [taskId]: {
          completedAt: new Date().toISOString(),
          encouragement: pickEncouragement(taskId),
        },
      };
    });
  }, []);

  return { completions, toggleTask };
}
