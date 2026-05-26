import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Titlebar from "@/components/titlebar";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import QueryProvider from "@/components/providers/query-provider";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "My Tasks",
  description: "Manage your tasks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full antialiased">
      <body
        className={cn(
          "flex flex-col font-sans min-h-full bg-background tracking-wide",
          outfit.variable,
        )}>
        <ThemeProvider>
          <QueryProvider>
            <TooltipProvider>
              <Titlebar />
              {children}
            </TooltipProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
