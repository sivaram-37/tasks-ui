export interface Task {
  _id: string;
  title: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  createdAt: string;
  updatedAt: string;
}

export interface TasksResponse {
  tasks: Task[];
  pageSize?: number;
  page?: number;
  totalRecord: number;
}

export interface GetAllTasksQuery {
  search?: string;
  status?: string;
  priority?: string;
  page?: number;
  pageSize?: number;
  sort?: string;
  sortBy?: string;
}
