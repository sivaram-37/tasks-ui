import { GetAllTasksQuery, TasksResponse } from "@/types/tasks";
import { api } from "../lib/axios";
import { tasksUrl } from "@/lib/apiUrl";

export const taskKeys = {
  all: ["tasks"] as const,
  detail: (id: string) => ["tasks", id] as const,
};

export const getAllTasks = async (query?: GetAllTasksQuery): Promise<TasksResponse> => {
  const res = await api.get(tasksUrl, { params: query });
  return res.data;
};

export const deleteTask = async (id: number) => {
  const res = await api.delete(`${tasksUrl}/${id}`);
  return res.data;
};
