import { Filter } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const FilterButton = ({
  filterOpen,
  setFilterOpen,
}: {
  filterOpen: boolean;
  setFilterOpen: (val: boolean) => void;
}) => {
  const handleFilterButton = () => {
    setFilterOpen(!filterOpen);
  };
  return (
    <Button
      size={"icon-lg"}
      variant={"secondary"}
      className={cn(
        "h-10 w-10 border-gray-300 dark:border-border",
        filterOpen && "bg-gray-300 dark:bg-gray-700/90 hover:bg-gray-300",
      )}
      onClick={handleFilterButton}>
      <Filter />
    </Button>
  );
};

export default FilterButton;
