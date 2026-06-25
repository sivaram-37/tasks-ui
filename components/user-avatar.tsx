"use client";

import { useSyncExternalStore } from "react";

import { getUserAvatar } from "@/lib/utils";

const emptySubscribe = () => () => {};

const UserAvatar = () => {
  const initial = useSyncExternalStore(
    emptySubscribe,
    () => getUserAvatar(),
    () => "U",
  );
  return (
    <div className="w-10 h-10 tracking-wider rounded-full flex items-center justify-center bg-primary text-primary-foreground">
      {initial}
    </div>
  );
};

export default UserAvatar;
