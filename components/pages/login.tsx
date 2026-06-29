"use client";

import { useState } from "react";
import { isAxiosError } from "axios";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useUserLogin } from "@/hooks/use-user-login";
import { useUserRegister } from "@/hooks/use-user-register";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginregisterSchema,
  LoginRegisterSchemaType,
} from "../modals/login-register/login-register-schema";
import LoginRegisterForm from "../modals/login-register/login-register-form";
import { toast } from "sonner";

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

  const formId = "login-register-form";
  const { control, handleSubmit, reset } = useForm<LoginRegisterSchemaType>({
    mode: "onChange",
    resolver: zodResolver(loginregisterSchema(activeTab)),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
  });

  const { mutate: loginMutation, isPending: isLoginPending, error: loginError } = useUserLogin();
  const {
    mutate: registerMutation,
    isPending: isRegisterPending,
    error: registerError,
  } = useUserRegister();

  const isRegister = activeTab === "register";

  const errorMessage = getErrorMessage(isRegister ? registerError : loginError);

  const switchTab = (tab: Tab) => {
    setActiveTab(tab);
    reset();
  };

  const handleSuccess = () => {
    router.push("/");
  };

  const handleError = () => {
    toast.error(errorMessage || "Something went wrong", {
      duration: Infinity,
      action: {
        label: "Close",
        onClick: () => {
          toast.dismiss();
        },
      },
    });
  };

  const onSubmit = handleSubmit((data) => {
    toast?.dismiss();

    if (isRegister) {
      registerMutation(
        {
          email: data.email,
          password: data.password,
          firstname: data.firstname || "",
          lastname: data.lastname || "",
        },
        { onSuccess: handleSuccess, onError: handleError },
      );
    } else {
      loginMutation(
        { email: data.email, password: data.password },
        { onSuccess: handleSuccess, onError: handleError },
      );
    }
  });

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

      <LoginRegisterForm formId={formId} control={control} isRegister={isRegister} />

      <Button
        form={formId}
        type="submit"
        size="lg"
        className="mt-2 w-full"
        onClick={onSubmit}
        disabled={isLoginPending || isRegisterPending}>
        {isRegister
          ? isRegisterPending
            ? "Creating account..."
            : "Create account"
          : isLoginPending
            ? "Logging in..."
            : "Login"}
      </Button>

      <p className="text-muted-foreground mt-6 text-center text-sm">
        {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
        <Button
          variant={"ghost"}
          type="button"
          onClick={() => switchTab(isRegister ? "login" : "register")}
          className="p-0 cursor-pointer text-primary font-medium hover:underline">
          {isRegister ? "Login" : "Register"}
        </Button>
      </p>
    </div>
  );
};

export default LoginPage;
