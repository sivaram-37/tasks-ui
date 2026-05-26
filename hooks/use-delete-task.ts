import { QueryClient, useMutation } from "@tanstack/react-query";
import { deleteTask, taskKeys } from "@/services/task";

export const useDeleteTask = () => {
  const queryClient = new QueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all });
    },
  });
};
