import { z } from "zod";

export const loginregisterSchema = (activeTab: "login" | "register") =>
  z.object({
    firstname:
      activeTab === "register"
        ? z.string().min(1, "First name is required")
        : z.string().optional(),
    lastname:
      activeTab === "register" ? z.string().min(1, "Last name is required") : z.string().optional(),
    email: z.email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

export type LoginRegisterSchemaType = z.infer<ReturnType<typeof loginregisterSchema>>;
