import { Task, TaskList } from "../types/tasks.type";

export const divideTasksByStatus = (data: Task[]): TaskList => {
  const dividedData: TaskList = {
    InProgress: [],
    Todo: [],
    Done: [],
    Blocked: [],
    InQA: [],
    Deployed: [],
  };

  if (!data) {
    return dividedData;
  }

  data.forEach((item) => {
    const { status } = item;
    if (status in dividedData) {
      dividedData[status].push(item);
    }
  });

  return dividedData;
};
