import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask, taskKeys } from "@/services/task";
import { AddTaskFormType } from "@/components/modals/add-task-modal";

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AddTaskFormType) => createTask(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all });
    },
  });
};
