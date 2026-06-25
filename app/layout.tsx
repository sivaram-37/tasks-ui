import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import QueryProvider from "@/components/providers/query-provider";
import { Toaster } from "@/components/providers/toaster-provider";
import AuthGuard from "@/components/providers/auth-guard";

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
              <AuthGuard>
                {children}
                <Toaster position="top-center" duration={2000} />
              </AuthGuard>
            </TooltipProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
