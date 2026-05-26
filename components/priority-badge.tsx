import { cn } from "@/lib/utils";

const style = {
  low: "text-blue-800 bg-blue-100 border border-blue-800",
  medium: "text-amber-800 bg-amber-100 border border-amber-800",
  high: "text-red-800 bg-red-100 border border-red-800",
};

const PriorityBadge = ({ priority }: { priority: "low" | "medium" | "high" }) => {
  return (
    <div
      className={cn(
        "px-1.5 py-px text-[11px] font-semibold tracking-widest rounded-md capitalize",
        style[priority],
      )}>
      {priority}
    </div>
  );
};

export default PriorityBadge;
