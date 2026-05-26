import Searchbar from "./searchbar";

const Actionbar = ({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (search: string) => void;
}) => {
  return (
    <div className="p-4 flex items-center gap-4 sticky top-16 z-10 bg-background">
      <Searchbar search={search} setSearch={setSearch} />
      {/* <FilterButton />
      <Button className="h-10 px-3 text-base">
        <Plus className="h-5 w-5" strokeWidth={3} />
        Add Task
      </Button> */}
    </div>
  );
};

export default Actionbar;
