import { Task } from "@/types/tasks";
import { Trash } from "lucide-react";
import PriorityBadge from "./priority-badge";
import { format } from "date-fns";

const TaskCard = ({ task }: { task: Task }) => {
  return (
    <div key={task.id} className="p-4 not-last:mb-4 rounded-md bg-background space-y-2">
      <div className="flex items-center justify-between">
        <span className=" font-medium">{task.title}</span>
        <Trash className="h-4 w-4 text-destructive" />
      </div>
      <div className="text-sm flex items-center justify-between">
        <div className="flex gap-1 items-center">
          <span>Priority:</span>
          <PriorityBadge priority={task.priority} />
        </div>
        {task.createdOn && (
          <span className="text-foreground/70">
            Created On:{" "}
            <span className="text-foreground">
              {format(task.createdOn, "MMM dd, yyyy, hh:mm a")}
            </span>
          </span>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
