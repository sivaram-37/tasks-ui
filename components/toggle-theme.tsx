"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const themes = [
  { value: "light", label: "Light mode", icon: Sun },
  { value: "dark", label: "Dark mode", icon: Moon },
] as const;

export function ToggleTheme() {
  const { resolvedTheme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <div className="bg-background relative flex h-10 items-center rounded-full border p-1">
      {mounted && (
        <span
          aria-hidden
          className={cn(
            "bg-primary absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full shadow-sm transition-transform duration-300 ease-in-out",
            isDark && "translate-x-full",
          )}
        />
      )}
      {themes.map(({ value, label, icon: Icon }) => {
        const isActive = mounted && resolvedTheme === value;
        return (
          <button
            key={value}
            type="button"
            aria-label={label}
            aria-pressed={isActive}
            onClick={() => setTheme(value)}
            title={label}
            className={cn(
              "relative z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-colors",
              isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground",
            )}>
            <Icon size={18} strokeWidth={2.5} className="shrink-0" />
          </button>
        );
      })}
    </div>
  );
}
