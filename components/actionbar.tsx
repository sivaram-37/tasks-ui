import Searchbar from "./searchbar";
import AddTaskButton from "./add-task-button";

const Actionbar = ({
  search,
  setSearch,
  setAddTaskModalOpen,
}: {
  search: string;
  setSearch: (search: string) => void;
  setAddTaskModalOpen: (open: boolean) => void;
}) => {
  return (
    <div className="p-4 flex items-center gap-4 sticky top-16 z-10 bg-background">
      <Searchbar search={search} setSearch={setSearch} />
      {/* <FilterButton /> */}
      <AddTaskButton setOpen={setAddTaskModalOpen} />
    </div>
  );
};

export default Actionbar;
