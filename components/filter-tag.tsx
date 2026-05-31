import { X } from "lucide-react";
import { FilterTypes } from "./pages/task";
import { Button } from "./ui/button";

const filterNameMap: Record<string, string> = {
  status: "Status",
  priority: "Priority",
  sortBy: "sort By",
  sortOrder: "Sort Order",
};
const filterValueMap: Record<string, string> = {
  pending: "Pending",
  completed: "Completed",
  low: "Low",
  mediumn: "Medium",
  high: "High",
  title: "Title",
  priority: "Priority",
  createdOn: "Created On",
  asc: "Ascending",
  desc: "Descending",
};
const skipValue = ["createdOn", "asc"];

const FilterTag = ({
  filters,
  setFilters,
}: {
  filters: FilterTypes;
  setFilters: (filter: FilterTypes) => void;
}) => {
  const handleRemoveFilter = (filter: string) => {
    console.log("filter", filter);
    setFilters({
      ...filters,
      [filter]: filter === "sortBy" ? "createdOn" : filter === "sortOrder" ? "asc" : "",
    });
  };

  const filterTags = Object.entries(filters)
    .filter(([, value]) => value && !skipValue.includes(value))
    .map(([key, value]) => (
      <div key={key} className="bg-gray-200 px-2 py-1 text-xs rounded-full flex items-center gap-2">
        {filterNameMap[key]}: {filterValueMap[value]}
        <Button
          variant={"ghost"}
          onClick={() => handleRemoveFilter(key)}
          className="p-0.5 h-5 hover:bg-red-300">
          <X className="h-4 w-4" />
        </Button>
      </div>
    ));

  if (filterTags.length === 0) return null;

  return (
    <div className="mx-4 mb-4 text-sm flex flex-wrap items-center gap-2">Filters:{filterTags}</div>
  );
};

export default FilterTag;
