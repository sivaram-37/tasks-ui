import Searchbar from "./searchbar";
import AddTaskButton from "./add-task-button";
import FilterButton from "./filter-button";

const Actionbar = ({
  search,
  setSearch,
  filterOpen,
  setFilterOpen,
  setAddTaskModalOpen,
}: {
  search: string;
  setSearch: (search: string) => void;
  filterOpen: boolean;
  setFilterOpen: (filter: boolean) => void;
  setAddTaskModalOpen: (open: boolean) => void;
}) => {
  return (
    <div className="p-4 flex items-center gap-4 sticky top-16 z-10 bg-background">
      <Searchbar search={search} setSearch={setSearch} />
      <FilterButton filterOpen={filterOpen} setFilterOpen={setFilterOpen} />
      <AddTaskButton setOpen={setAddTaskModalOpen} />
    </div>
  );
};

export default Actionbar;
