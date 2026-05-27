import { Plus } from "lucide-react";
import { Button } from "./ui/button";

const AddTaskButton = ({ setOpen }: { setOpen: (open: boolean) => void }) => {
  return (
    <Button className="h-10 px-3 text-base" onClick={() => setOpen(true)}>
      <Plus className="h-5 w-5" strokeWidth={3} />
      Add Task
    </Button>
  );
};

export default AddTaskButton;
