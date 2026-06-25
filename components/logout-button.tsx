"use client";

import { clearUserFromLocalStorage } from "@/lib/utils";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();
  const handleLogout = () => {
    clearUserFromLocalStorage();
    router.push("/login");
  };

  return (
    <Button variant={"outline"} className="px-4 h-10 rounded-full" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
