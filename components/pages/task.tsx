"use client";

import Actionbar from "../actionbar";
import TaskCard from "../task-card";
import { ScrollArea } from "../ui/scroll-area";
import { useGetAllTasks } from "@/hooks/use-get-all-tasks";
import { useMemo, useState } from "react";
import { defaultStatus, getAllTasksDefaultQuery } from "@/lib/constants";
import Pagination from "../pagination";
import { Spinner } from "../ui/spinner";
import EmptyPage from "../EmptyPage";
import dynamic from "next/dynamic";
import FilterTag from "../filter-tag";
import ErrorDisplay from "../ErrorDisplay";

const AddTaskModal = dynamic(() => import("../modals/add-task-modal"), { ssr: false });
const FilterSection = dynamic(() => import("../filter-section"), { ssr: false });

export interface FilterTypes {
  status: string;
  priority: string;
  sortBy: string;
  sortOrder: string;
}

const TaskPage = () => {
  const [addTaskModalOpen, setAddTaskModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(getAllTasksDefaultQuery.page);
  const [pageSize, setPageSize] = useState(getAllTasksDefaultQuery.pageSize);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterTypes>(defaultStatus);

  const query = useMemo(
    () => ({
      ...(search && { search }),
      page,
      pageSize,
      sortBy: filters.sortBy,
      sort: filters.sortOrder,
      ...(filters.status && { status: filters.status }),
      ...(filters.priority && { priority: filters.priority }),
    }),
    [page, pageSize, search, filters],
  );

  const { data, isLoading, isError, refetch } = useGetAllTasks(query);

  return (
    <>
      <Actionbar
        search={search}
        setSearch={setSearch}
        filterOpen={filterOpen}
        setFilterOpen={setFilterOpen}
        setAddTaskModalOpen={setAddTaskModalOpen}
      />

      {filterOpen ? (
        <FilterSection
          onClose={() => setFilterOpen(false)}
          filters={filters}
          setFilters={setFilters}
        />
      ) : (
        <FilterTag filters={filters} setFilters={setFilters} />
      )}

      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-228px)]">
          <Spinner className="h-8 w-8 text-primary" />
          <span className="mt-2 animate-pulse">Fetching tasks...</span>
        </div>
      ) : isError ? (
        <ErrorDisplay onRetry={refetch} />
      ) : data?.tasks?.length === 0 ? (
        <EmptyPage search={search} setAddTaskModalOpen={setAddTaskModalOpen} />
      ) : (
        <ScrollArea className="mx-4 mb-4 p-4 bg-secondary rounded-md">
          {data?.tasks.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
          <Pagination
            page={page}
            pageSize={pageSize}
            total_record={data?.totalRecord || 0}
            setPage={setPage}
            setPageSize={setPageSize}
          />
        </ScrollArea>
      )}

      {addTaskModalOpen && <AddTaskModal open={addTaskModalOpen} setOpen={setAddTaskModalOpen} />}
    </>
  );
};

export default TaskPage;
