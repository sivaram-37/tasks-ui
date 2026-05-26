import { getAllTasks, taskKeys } from "@/services/task";
import { GetAllTasksQuery } from "@/types/tasks";
import { useQuery } from "@tanstack/react-query";

export const useGetAllTasks = (query: GetAllTasksQuery = {}) => {
  return useQuery({
    queryKey: [...taskKeys.all, query],
    queryFn: () => getAllTasks(query),
  });
};
