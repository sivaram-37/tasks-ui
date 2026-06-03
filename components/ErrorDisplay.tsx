import { RefreshCcw } from "lucide-react";
import { Button } from "./ui/button";

const ErrorDisplay = ({ onRetry }: { onRetry?: () => void }) => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-228px)] gap-2">
      <span className="text-4xl">⚠️</span>
      <p className="text-red-600 text-lg font-semibold">Failed to load tasks</p>
      <span className="text-muted-foreground">Please try again later.</span>
      {onRetry && (
        <Button className="h-10 px-3 text-base" onClick={onRetry} variant={"outline"}>
          <RefreshCcw className="h-5 w-5" strokeWidth={3} />
          Try again
        </Button>
      )}
    </div>
  );
};

export default ErrorDisplay;
