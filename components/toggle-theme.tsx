"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function ToggleTheme() {
  const { resolvedTheme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Avoid SSR mismatch
  if (!mounted) {
    return (
      <Button variant="outline" size="icon-lg">
        <div className="h-4 w-4" />
      </Button>
    );
  }

  const isDark = resolvedTheme === "dark";

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={isDark ? "default" : "outline"}
          size="icon-lg"
          className="w-10 h-10 border border-gray-300 dark:border-border"
          onClick={handleToggle}>
          {isDark ? (
            <Sun size={32} strokeWidth={2.5} className="shrink-0" />
          ) : (
            <Moon size={32} strokeWidth={2.5} className="shrink-0" />
          )}
        </Button>
      </TooltipTrigger>

      <TooltipContent>{isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}</TooltipContent>
    </Tooltip>
  );
}
