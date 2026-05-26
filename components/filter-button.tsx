import { Filter } from "lucide-react";
import { Button } from "./ui/button";

const FilterButton = () => {
  return (
    <Button size={"icon-lg"} variant={"secondary"} className="h-10 w-10">
      <Filter />
    </Button>
  );
};

export default FilterButton;
