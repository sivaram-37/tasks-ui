import Task from "@/components/pages/task";
import { getAllTasks, taskKeys } from "@/services/task";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getAllTasksDefaultQuery } from "@/lib/constants";

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [...taskKeys.all, getAllTasksDefaultQuery],
    queryFn: () => getAllTasks(getAllTasksDefaultQuery),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Task />
    </HydrationBoundary>
  );
}
