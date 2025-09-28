export const TASK_STATUSES = {
  TODO: "ToDo",
  IN_PROGRESS: "InProgress",
  DONE: "Done",
} as const;

export type TaskStatus = typeof TASK_STATUSES[keyof typeof TASK_STATUSES];

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  ToDo: "Todo",
  InProgress: "In progress",
  Done: "Done",
};