"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

import { THEME_KEY } from "@/lib/constants";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      storageKey={THEME_KEY}
      defaultTheme="light"
      enableSystem={false}>
      {children}
    </NextThemesProvider>
  );
}
