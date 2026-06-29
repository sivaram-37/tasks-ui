import { useCallback } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../../ui/dialog";
import { Button } from "../../ui/button";
import { useCreateTask } from "@/hooks/use-create-task";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addTaskSchema, AddTaskSchemaType } from "./add-task-schema";
import AddTaskForm from "./add-task-form";

const AddTaskModal = ({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) => {
  const { mutate, isPending } = useCreateTask();

  const formId = "add-task-form";
  const { control, handleSubmit, reset } = useForm<AddTaskSchemaType>({
    mode: "onChange",
    resolver: zodResolver(addTaskSchema),
    defaultValues: {
      title: "",
      priority: "low",
    },
  });

  const handleClose = useCallback(() => {
    if (!isPending) {
      setOpen(false);
    }
  }, [isPending, setOpen]);

  const onSubmit = handleSubmit((data) => {
    mutate(
      {
        title: data.title,
        priority: data.priority,
      },
      {
        onSuccess: () => {
          toast.success("Task added successfully!");
        },
        onError: () => {
          toast.error("Failed to add task!");
        },
        onSettled: () => {
          handleClose();
          reset();
        },
      },
    );
  });

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
        </DialogHeader>
        <AddTaskForm formId={formId} control={control} />
        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={isPending}>
            Cancel
          </Button>
          <Button type="button" form={formId} onClick={onSubmit} disabled={isPending}>
            {isPending ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskModal;
