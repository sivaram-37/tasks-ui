"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { TOKEN_KEY } from "@/lib/constants";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);

    if (!token) {
      router.push("/login");
    }
  }, [router]);

  return <>{children}</>;
}
