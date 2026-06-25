import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "My Tasks | Login",
  description: "Login to your account",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary p-4">{children}</div>
  );
}
