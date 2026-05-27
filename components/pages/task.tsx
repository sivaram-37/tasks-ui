"use client";

import Actionbar from "../actionbar";
import TaskCard from "../task-card";
import { ScrollArea } from "../ui/scroll-area";
import { useGetAllTasks } from "@/hooks/use-get-all-tasks";
import { useMemo, useState } from "react";
import { getAllTasksDefaultQuery } from "@/lib/constants";
import Pagination from "../pagination";
import { Spinner } from "../ui/spinner";
import EmptyPage from "../EmptyPage";
import dynamic from "next/dynamic";

const AddTaskModal = dynamic(() => import("../modals/add-task-modal"), { ssr: false });

const TaskPage = () => {
  const [addTaskModalOpen, setAddTaskModalOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(getAllTasksDefaultQuery.page);
  const [pageSize, setPageSize] = useState(getAllTasksDefaultQuery.page_size);

  const query = useMemo(
    () => ({
      ...(search && { search }),
      page,
      page_size: pageSize,
    }),
    [page, pageSize, search],
  );

  const { data, isFetching } = useGetAllTasks(query);

  return (
    <>
      <Actionbar search={search} setSearch={setSearch} setAddTaskModalOpen={setAddTaskModalOpen} />
      {isFetching ? (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-160px)]">
          <Spinner className="h-8 w-8 text-primary" />
          <span className="mt-2 animate-pulse">Fetching tasks...</span>
        </div>
      ) : data?.tasks?.length === 0 ? (
        <EmptyPage search={search} setAddTaskModalOpen={setAddTaskModalOpen} />
      ) : (
        <ScrollArea className="mx-4 mb-4 p-4 bg-secondary rounded-md">
          {data?.tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
          <Pagination
            page={page}
            pageSize={pageSize}
            total_record={data?.total_record || 0}
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
