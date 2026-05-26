"use client";

import Actionbar from "../actionbar";
import TaskCard from "../task-card";
import { ScrollArea } from "../ui/scroll-area";
import { useGetAllTasks } from "@/hooks/use-get-all-tasks";
import { useState } from "react";
import { getAllTasksDefaultQuery } from "@/lib/constants";
import Pagination from "../pagination";

const TaskPage = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(getAllTasksDefaultQuery.page);
  const [pageSize, setPageSize] = useState(getAllTasksDefaultQuery.page_size);

  const { data } = useGetAllTasks({
    search,
    page,
    page_size: pageSize,
  });

  return (
    <>
      <Actionbar search={search} setSearch={setSearch} />
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
    </>
  );
};

export default TaskPage;
