import { Check, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

const Dropdown = ({
  options,
  value,
  onChange,
  className,
}: {
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (value: string) => {
    onChange(value);
    setOpen(false);
  };

  const displayText = useMemo(() => {
    return options.find((option) => option.value === value)?.label || value;
  }, [value, options]);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-48 h-9 border border-gray-300 dark:border-border", className)}>
          {displayText}
          <ChevronDown className="h-4 w-4 ml-auto" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => handleSelect(option.value)}
            className={cn("cursor-pointer")}>
            {displayText === option.label ? (
              <Check className="h-4 w-4" strokeWidth={3} />
            ) : (
              <div className="w-4" />
            )}
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
