"use client";

import { useState } from "react";
import { AlertCircle, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { isAxiosError } from "axios";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useUserLogin } from "@/hooks/use-user-login";
import { useUserRegister } from "@/hooks/use-user-register";
import { useRouter } from "next/navigation";

type Tab = "login" | "register";

const getErrorMessage = (err: Error | null) => {
  if (!err) return null;
  if (isAxiosError(err)) {
    return err.response?.data?.message ?? err.message;
  }
  return err.message;
};

const LoginPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ firstname: "", lastname: "", email: "", password: "" });

  const { mutate: loginMutation, isPending: isLoginPending, error: loginError } = useUserLogin();
  const {
    mutate: registerMutation,
    isPending: isRegisterPending,
    error: registerError,
  } = useUserRegister();

  const isRegister = activeTab === "register";

  const errorMessage = getErrorMessage(isRegister ? registerError : loginError);

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const switchTab = (tab: Tab) => {
    setActiveTab(tab);
    setForm({ firstname: "", lastname: "", email: "", password: "" });
    setShowPassword(false);
  };

  const handleSuccess = () => {
    router.push("/");
  };

  const handleSubmit = (e: React.FormEvent) => {
    console.log({ isRegister, activeTab, form });
    e.preventDefault();
    if (isRegister) {
      registerMutation(
        {
          email: form.email,
          password: form.password,
          firstname: form.firstname,
          lastname: form.lastname,
        },
        { onSuccess: handleSuccess },
      );
    } else {
      loginMutation({ email: form.email, password: form.password }, { onSuccess: handleSuccess });
    }
  };

  return (
    <div className="w-full max-w-lg rounded-xl border bg-background p-8 text-left shadow-lg">
      <header className="mb-6 text-center">
        <h1 className="text-primary text-3xl font-bold">My Tasks</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          {isRegister ? "Create your account to get started" : "Welcome back, please sign in"}
        </p>
      </header>

      <div className="bg-muted relative mb-6 flex items-center rounded-md p-1 text-sm font-medium">
        <span
          aria-hidden
          className={cn(
            "bg-primary absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-sm shadow-sm transition-transform duration-300 ease-in-out",
            isRegister && "translate-x-full",
          )}
        />
        {(["login", "register"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => switchTab(tab)}
            className={cn(
              "cursor-pointer relative z-10 flex-1 rounded-sm py-1.5 capitalize transition-colors",
              activeTab === tab
                ? "text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}>
            {tab}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div
          className={cn(
            "grid transition-all duration-300 ease-in-out",
            isRegister ? "grid-rows-[1fr] opacity-100" : "-mb-4 grid-rows-[0fr] opacity-0",
          )}>
          <div className="overflow-hidden">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="firstname">First name</Label>
                <div className="relative">
                  <User className="text-muted-foreground absolute top-1/2 left-2 size-3.5 -translate-y-1/2" />
                  <Input
                    id="firstname"
                    value={form.firstname}
                    onChange={update("firstname")}
                    placeholder="Jane"
                    className="pl-7"
                    tabIndex={isRegister ? 0 : -1}
                    required={isRegister}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="lastname">Last name</Label>
                <div className="relative">
                  <User className="text-muted-foreground absolute top-1/2 left-2 size-3.5 -translate-y-1/2" />
                  <Input
                    id="lastname"
                    value={form.lastname}
                    onChange={update("lastname")}
                    placeholder="Doe"
                    className="pl-7"
                    tabIndex={isRegister ? 0 : -1}
                    required={isRegister}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="text-muted-foreground absolute top-1/2 left-2 size-3.5 -translate-y-1/2" />
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={update("email")}
              placeholder="you@example.com"
              className="pl-7"
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="text-muted-foreground absolute top-1/2 left-2 size-3.5 -translate-y-1/2" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={update("password")}
              placeholder="••••••••••"
              className="px-7"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="text-muted-foreground hover:text-foreground absolute top-1/2 right-2 -translate-y-1/2">
              {showPassword ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
            </button>
          </div>
        </div>

        {errorMessage && (
          <div
            role="alert"
            className="bg-destructive/10 text-destructive flex items-center gap-2 rounded-md px-3 py-2 text-sm">
            <AlertCircle className="size-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <Button
          type="submit"
          size="lg"
          className="mt-2 w-full"
          disabled={isLoginPending || isRegisterPending}>
          {isRegister
            ? isRegisterPending
              ? "Creating account..."
              : "Create account"
            : isLoginPending
              ? "Logging in..."
              : "Login"}
        </Button>
      </form>

      <p className="text-muted-foreground mt-6 text-center text-sm">
        {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          type="button"
          onClick={() => switchTab(isRegister ? "login" : "register")}
          className="cursor-pointer text-primary font-medium hover:underline">
          {isRegister ? "Login" : "Register"}
        </button>
      </p>
    </div>
  );
};

export default LoginPage;
