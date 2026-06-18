"use client";

import { Check, PartyPopper } from "lucide-react";
import {
  type ActionTaskDefinition,
  formatTaskCompletedAt,
} from "@/lib/action-tasks";
import { useActionTasks } from "@/hooks/useActionTasks";

interface ActionTaskListProps {
  listId: string;
  siteId?: string | null;
  tasks: ActionTaskDefinition[];
  showProgress?: boolean;
}

export default function ActionTaskList({
  listId,
  siteId = null,
  tasks,
  showProgress = true,
}: ActionTaskListProps) {
  const { completions, toggleTask } = useActionTasks(listId, siteId);

  const completedCount = tasks.filter((task) => completions[task.id]).length;
  const progressPercent = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0;
  const allComplete = tasks.length > 0 && completedCount === tasks.length;

  const pendingTasks = tasks.filter((task) => !completions[task.id]);
  const completedTasks = tasks.filter((task) => completions[task.id]);

  return (
    <div className="space-y-4">
      {showProgress && tasks.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
            <span>
              {completedCount} of {tasks.length} complete
            </span>
            <span>{progressPercent}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}

      {allComplete && (
        <div className="flex items-start gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
          <PartyPopper className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          <span>All tasks complete — great job driving your marketing forward!</span>
        </div>
      )}

      <ul className="space-y-2">
        {pendingTasks.map((task) => (
          <li key={task.id}>
            <TaskRow
              task={task}
              completed={false}
              onToggle={(complete) => toggleTask(task.id, complete)}
            />
          </li>
        ))}
        {completedTasks.map((task) => {
          const completion = completions[task.id];
          return (
            <li key={task.id}>
              <TaskRow
                task={task}
                completed
                completedAt={completion.completedAt}
                encouragement={completion.encouragement}
                onToggle={(complete) => toggleTask(task.id, complete)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

interface TaskRowProps {
  task: ActionTaskDefinition;
  completed: boolean;
  completedAt?: string;
  encouragement?: string;
  onToggle: (complete: boolean) => void;
}

function TaskRow({
  task,
  completed,
  completedAt,
  encouragement,
  onToggle,
}: TaskRowProps) {
  return (
    <div
      className={`rounded-lg border p-3 transition-colors ${
        completed
          ? "border-emerald-200/80 bg-emerald-50/50"
          : "border-border bg-background hover:border-primary/30"
      }`}
    >
      <div className="flex items-start gap-3">
        <button
          type="button"
          role="checkbox"
          aria-checked={completed}
          aria-label={completed ? `Mark "${task.text}" as incomplete` : `Mark "${task.text}" as complete`}
          onClick={() => onToggle(!completed)}
          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors ${
            completed
              ? "border-emerald-600 bg-emerald-600 text-white"
              : "border-border bg-card hover:border-primary hover:bg-primary/5"
          }`}
        >
          {completed && <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />}
        </button>
        <div className="min-w-0 flex-1">
          <p
            className={`text-sm leading-relaxed ${
              completed ? "text-muted-foreground line-through" : "text-foreground"
            }`}
          >
            {task.text}
          </p>
          {completed && completedAt && encouragement && (
            <div className="mt-2 space-y-0.5">
              <p className="text-xs text-muted-foreground">
                Completed {formatTaskCompletedAt(completedAt)}
              </p>
              <p className="text-xs font-medium text-emerald-700">{encouragement}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
