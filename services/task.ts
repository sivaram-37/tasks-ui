import { GetAllTasksQuery, TasksResponse } from "@/types/tasks";
import { api } from "../lib/axios";
import { taskByIdUrl, tasksUrl } from "@/lib/apiUrl";
import { AddTaskFormType } from "@/components/modals/add-task-modal";

export const taskKeys = {
  all: ["tasks"] as const,
  detail: (id: string) => ["tasks", id] as const,
};

export const getAllTasks = async (query?: GetAllTasksQuery): Promise<TasksResponse> => {
  const res = await api.get(tasksUrl, { params: query });
  return res.data;
};

export const createTask = async (data: AddTaskFormType): Promise<TasksResponse> => {
  const res = await api.post(tasksUrl, data);
  return res.data;
};

export const deleteTask = async (id: number) => {
  const res = await api.delete(taskByIdUrl(id));
  return res.data;
};
