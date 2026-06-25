import { UserResponse } from "@/types/user";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { EMAIL_KEY, NAME_KEY, TOKEN_KEY } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const setUserToLocalStorage = (data: UserResponse) => {
  localStorage.setItem(TOKEN_KEY, data.token);
  localStorage.setItem(NAME_KEY, data.fullname);
  localStorage.setItem(EMAIL_KEY, data.email);
};

export const clearUserFromLocalStorage = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(NAME_KEY);
  localStorage.removeItem(EMAIL_KEY);
};

export const getUserAvatar = () => {
  if (typeof window === "undefined") return "U";
  const name = localStorage?.getItem(NAME_KEY);
  const [lastname, firstname] = name?.split(", ") || [];
  return firstname?.charAt(0).toUpperCase() + lastname?.charAt(0).toUpperCase() || "U";
};
