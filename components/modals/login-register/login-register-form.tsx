"use client";

import { Controller, UseFormReturn } from "react-hook-form";
import { LoginRegisterSchemaType } from "./login-register-schema";
import { cn } from "@/lib/utils";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { useState } from "react";

const LoginRegisterForm = ({
  formId,
  control,
  isRegister,
}: {
  formId: string;
  control: UseFormReturn<LoginRegisterSchemaType>["control"];
  isRegister: boolean;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form id={formId} className="flex flex-col gap-4">
      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          isRegister ? "grid-rows-[1fr] opacity-100" : "-mb-4 grid-rows-[0fr] opacity-0",
        )}>
        <div className="overflow-hidden">
          <div className="grid grid-cols-2 gap-3">
            <Controller
              name="firstname"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="firstname" className="text-foreground">
                    First name
                  </FieldLabel>
                  <div className="relative">
                    <User className="text-muted-foreground absolute top-1/2 left-2 size-3.5 -translate-y-1/2" />
                    <Input
                      {...field}
                      id="firstname"
                      placeholder="Jane"
                      className="pl-7 text-foreground"
                      tabIndex={isRegister ? 0 : -1}
                      required={isRegister}
                    />
                  </div>
                  <FieldError errors={fieldState.error ? [fieldState.error] : undefined} />
                </Field>
              )}
            />
            <Controller
              name="lastname"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="lastname" className="text-foreground">
                    Last name
                  </FieldLabel>
                  <div className="relative">
                    <User className="text-muted-foreground absolute top-1/2 left-2 size-3.5 -translate-y-1/2" />
                    <Input
                      {...field}
                      id="lastname"
                      placeholder="Last name"
                      className="pl-7 text-foreground"
                      tabIndex={isRegister ? 0 : -1}
                      required={isRegister}
                    />
                  </div>
                  <FieldError errors={fieldState.error ? [fieldState.error] : undefined} />
                </Field>
              )}
            />
          </div>
        </div>
      </div>

      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="email" className="text-foreground">
              Email
            </FieldLabel>
            <div className="relative">
              <Mail className="text-muted-foreground absolute top-1/2 left-2 size-3.5 -translate-y-1/2" />
              <Input
                {...field}
                id="email"
                placeholder="you@example.com"
                className="pl-7 text-foreground"
                required
              />
            </div>
            <FieldError errors={fieldState.error ? [fieldState.error] : undefined} />
          </Field>
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="password" className="text-foreground">
              Password
            </FieldLabel>
            <div className="relative">
              <Lock className="text-muted-foreground absolute top-1/2 left-2 size-3.5 -translate-y-1/2" />
              <Input
                {...field}
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••"
                className="px-7 text-foreground"
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
            <FieldError errors={fieldState.error ? [fieldState.error] : undefined} />
          </Field>
        )}
      />
    </form>
  );
};

export default LoginRegisterForm;
