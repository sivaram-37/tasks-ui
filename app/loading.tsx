"use client";

import { Spinner } from "@/components/ui/spinner";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Spinner className="h-8 w-8 text-primary" />
      <span className="mt-2 animate-pulse">Loading...</span>
    </div>
  );
};

export default Loading;
