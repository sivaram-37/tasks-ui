import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taskKeys, updateTask } from "@/services/task";
import { UpdateTaskBody } from "@/types/tasks";

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: UpdateTaskBody }) => updateTask(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all });
    },
  });
};
