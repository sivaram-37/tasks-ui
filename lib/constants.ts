export const getAllTasksDefaultQuery = {
  page: 1,
  page_size: 10,
  sortBy: "createdOn",
  sort: "asc",
};

export const includeAll = [{ label: "All", value: "" }];

export const pageSizeOptions = [
  { label: "5", value: "5" },
  { label: "10", value: "10" },
  { label: "25", value: "25" },
  { label: "50", value: "50" },
  { label: "100", value: "100" },
];

export const priorityOptions = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
];

export const statusOptions = [
  { label: "Pending", value: "pending" },
  { label: "Completed", value: "completed" },
];

export const sortByOptions = [
  { label: "Title", value: "title" },
  { label: "Priority", value: "priority" },
  { label: "Created On", value: "createdOn" },
];

export const sortOrderOptions = [
  { label: "Ascending", value: "asc" },
  { label: "Descending", value: "desc" },
];

export const defaultStatus = { status: "", priority: "", sortBy: "createdOn", sortOrder: "asc" };
