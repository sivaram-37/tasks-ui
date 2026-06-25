import type { Metadata } from "next";
import "../globals.css";
import Titlebar from "@/components/titlebar";

export const metadata: Metadata = {
  title: "My Tasks",
  description: "Manage your tasks",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Titlebar />
      {children}
    </>
  );
}
