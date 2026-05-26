export interface Task {
  id: number;
  title: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  createdOn: string;
}

export interface TasksResponse {
  tasks: Task[];
  page_size?: number;
  page?: number;
  total_record: number;
}

export interface GetAllTasksQuery {
  search?: string;
  page?: number;
  page_size?: number;
  sort?: "asc" | "desc";
  sortBy?: string;
}
