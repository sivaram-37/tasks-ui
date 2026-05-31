import AddTaskButton from "./add-task-button";

const EmptyPage = ({
  search,
  setAddTaskModalOpen,
}: {
  search: string;
  setAddTaskModalOpen: (open: boolean) => void;
}) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-2 h-[calc(100vh-228px)]">
      <span className="text-muted-foreground text-2xl font-bold">No tasks found!</span>
      <span className="text-foreground text-sm">
        {!!search ? "Try adjusting your search criteria" : "Add a new task to get started"}
      </span>
      {!search && <AddTaskButton setOpen={setAddTaskModalOpen} />}
    </div>
  );
};

export default EmptyPage;
