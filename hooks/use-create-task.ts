import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask, taskKeys } from "@/services/task";
import { AddTaskSchemaType } from "@/components/modals/add-task/add-task-schema";

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AddTaskSchemaType) => createTask(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all });
    },
  });
};
