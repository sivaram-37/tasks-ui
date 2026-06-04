import { Task } from "@/types/tasks";
import { Check, Trash2 } from "lucide-react";
import PriorityBadge from "./priority-badge";
import { format } from "date-fns";
import { useDeleteTask } from "@/hooks/use-delete-task";
import { useCallback, useState } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useUpdateTask } from "@/hooks/use-update-task";

const TaskCard = ({ task }: { task: Task }) => {
  const { mutate: deleteTask } = useDeleteTask();
  const { mutate: updateTask } = useUpdateTask();

  const [status, setStatus] = useState(task.completed);

  const handleDelete = useCallback(() => {
    deleteTask(
      { id: task._id },
      {
        onSuccess: () => {
          toast.success("Task deleted successfully!");
        },
        onError: () => {
          toast.error("Failed to delete task!");
        },
      },
    );
  }, [deleteTask, task._id]);

  const handleUpdateStatus = useCallback(() => {
    setStatus((prev) => !prev);
    updateTask(
      {
        id: task._id,
        body: {
          completed: !status,
        },
      },
      {
        onError: () => {
          setStatus((prev) => !prev);
          toast.error(`Failed to update task - ${task.title} status!`);
        },
      },
    );
  }, [task._id, task.title, updateTask, status]);

  return (
    <div
      key={task._id}
      className={cn(
        "p-4 not-last:mb-4 rounded-md bg-background space-y-2",
        status && "bg-green-200 dark:bg-green-800",
      )}>
      <div className="flex items-center justify-between">
        <div className="font-medium flex gap-2 items-center">
          <div
            className={cn(
              "w-5 h-5 rounded-full flex items-center justify-center border cursor-pointer bg-secondary hover:border-primary",
              status && "bg-primary",
            )}
            onClick={handleUpdateStatus}>
            {status && <Check className="h-3 w-3 text-white" strokeWidth={4} />}
          </div>
          <span>{task.title}</span>
        </div>
        <Button variant={"secondary"} onClick={handleDelete}>
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </div>
      <div className="text-sm flex items-center justify-between">
        <div className="flex gap-1 items-center">
          <span>Priority:</span>
          <PriorityBadge priority={task.priority} />
        </div>
        <div className="flex items-center text-foreground/70">
          {!!task.completed && (
            <>
              <span>
                Completed On:{" "}
                <span className="text-foreground">
                  {format(task.updatedAt, "MMM dd, yyyy, hh:mm a")}
                </span>
              </span>
              <span className="mx-2">|</span>
            </>
          )}
          {task.createdAt && (
            <span>
              Created On:{" "}
              <span className="text-foreground">
                {format(task.createdAt, "MMM dd, yyyy, hh:mm a")}
              </span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
