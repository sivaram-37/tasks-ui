import { useCallback, useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Dropdown from "../dropdown";
import { Button } from "../ui/button";
import { useCreateTask } from "@/hooks/use-create-task";
import { toast } from "sonner";
import { priorityOptions } from "@/lib/constants";

export interface AddTaskFormType {
  title: string;
  priority?: "low" | "medium" | "high";
}

const AddTaskModal = ({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) => {
  const { mutate, isPending } = useCreateTask();

  const [value, setValue] = useState<AddTaskFormType>({
    title: "",
    priority: "low",
  });

  const handleClose = useCallback(() => {
    if (!isPending) {
      setOpen(false);
    }
  }, [isPending, setOpen]);

  const handleSubmit = useCallback(() => {
    mutate(value, {
      onSuccess: () => {
        toast.success("Task added successfully!");
      },
      onError: () => {
        toast.error("Failed to add task!");
      },
      onSettled: () => {
        handleClose();
        setValue({ title: "", priority: "low" });
      },
    });
  }, [mutate, value, handleClose]);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
        </DialogHeader>
        <form className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="title">Title</Label>
            <Input
              name="title"
              value={value.title}
              onChange={(e) => setValue({ ...value, title: e.target.value })}
              className="h-8 border border-border"
              placeholder="Title"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="priority">Priority</Label>
            <Dropdown
              options={priorityOptions}
              value={value.priority || "low"}
              onChange={(val) => setValue({ ...value, priority: val as "low" | "medium" | "high" })}
              className="h-8 w-full"
            />
          </div>
        </form>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={isPending}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSubmit} disabled={isPending}>
            {isPending ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskModal;
