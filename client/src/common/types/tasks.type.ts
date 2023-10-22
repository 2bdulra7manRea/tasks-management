export type Task = {
  title: string;
  description: string;
  status: "InProgress" | "Todo" | "Done" | "Blocked" | "InQA" | "Deployed";

  id: string;
};

export type TaskList = {
  InProgress: Task[];
  Todo: Task[];
  Done: Task[];
  Blocked: Task[];
  InQA: Task[];
  Deployed: Task[];
};
