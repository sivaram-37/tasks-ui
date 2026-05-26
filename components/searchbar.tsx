import { Search } from "lucide-react";
import { Input } from "./ui/input";

const Searchbar = ({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (search: string) => void;
}) => {
  return (
    <div className="flex items-center relative w-full">
      <Search className="h-5 w-5 absolute left-2" />
      <Input
        placeholder="Search.."
        className="h-10 w-full pl-10 text-base!"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default Searchbar;
