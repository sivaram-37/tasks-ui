import { useCallback, useState } from "react";
import { FilterTypes } from "./pages/task";
import Dropdown from "./dropdown";
import {
  statusOptions,
  priorityOptions,
  includeAll,
  defaultStatus,
  sortByOptions,
  sortOrderOptions,
} from "@/lib/constants";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

const statusOptionsWithAll = [...includeAll, ...statusOptions];
const priorityOptionsWithAll = [...includeAll, ...priorityOptions];

const FilterSection = ({
  onClose,
  filters,
  setFilters,
}: {
  onClose: () => void;
  filters: FilterTypes;
  setFilters: (filters: FilterTypes) => void;
}) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleSubmit = useCallback(() => {
    setFilters(localFilters);
    onClose();
  }, [localFilters, onClose, setFilters]);

  const handleClose = useCallback(() => {
    setFilters(defaultStatus);
    onClose();
  }, [setFilters, onClose]);

  return (
    <div className="mb-4 animate-in fade-in slide-in-from-top-2 duration-300 mx-4 bg-secondary border border-gray-200 dark:border-border p-4 rounded-md">
      <div className="flex items-center justify-end gap-x-2">
        <Button onClick={handleSubmit}>Apply</Button>
        <Button variant={"outline"} onClick={handleClose}>
          Close
        </Button>
      </div>
      <div className="flex flex-wrap gap-8">
        <div className="flex flex-col gap-2">
          <Label>Status</Label>
          <Dropdown
            options={statusOptionsWithAll}
            value={localFilters.status}
            onChange={(val) => {
              setLocalFilters((filter) => ({ ...filter, status: val }));
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Priority</Label>
          <Dropdown
            options={priorityOptionsWithAll}
            value={localFilters.priority}
            onChange={(val) => {
              setLocalFilters((filter) => ({ ...filter, priority: val }));
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Sort By</Label>
          <Dropdown
            options={sortByOptions}
            value={localFilters.sortBy}
            onChange={(val) => {
              setLocalFilters((filter) => ({ ...filter, sortBy: val }));
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Sort Order</Label>
          <Dropdown
            options={sortOrderOptions}
            value={localFilters.sortOrder}
            onChange={(val) => {
              setLocalFilters((filter) => ({ ...filter, sortOrder: val }));
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
