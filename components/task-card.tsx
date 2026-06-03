import { Task } from "@/types/tasks";
import { Trash2 } from "lucide-react";
import PriorityBadge from "./priority-badge";
import { format } from "date-fns";
import { useDeleteTask } from "@/hooks/use-delete-task";
import { useCallback } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";

const TaskCard = ({ task }: { task: Task }) => {
  const { mutate } = useDeleteTask();

  const handleDelete = useCallback(() => {
    mutate(
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
  }, [mutate, task._id]);

  return (
    <div key={task._id} className="p-4 not-last:mb-4 rounded-md bg-background space-y-2">
      <div className="flex items-center justify-between">
        <span className=" font-medium">{task.title}</span>
        <Button variant={"outline"} onClick={handleDelete}>
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </div>
      <div className="text-sm flex items-center justify-between">
        <div className="flex gap-1 items-center">
          <span>Priority:</span>
          <PriorityBadge priority={task.priority} />
        </div>
        {task.createdAt && (
          <span className="text-foreground/70">
            Created On:{" "}
            <span className="text-foreground">
              {format(task.createdAt, "MMM dd, yyyy, hh:mm a")}
            </span>
          </span>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
