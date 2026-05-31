"use client";

import { Spinner } from "@/components/ui/spinner";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-228px)]">
      <Spinner className="h-8 w-8 text-primary" />
      <span className="mt-2 animate-pulse">Fetching tasks...</span>
    </div>
  );
};

export default Loading;
