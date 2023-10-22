import { useQuery } from "react-query";

export const useFetchTasks = () => {
  const { data, isSuccess } = useQuery({
    queryKey: ["get-tasks"],
    queryFn: () =>
      fetch("http://localhost:4008/tasks/list").then((res) => res.json()),
  });

  return { data, isSuccess };
};
