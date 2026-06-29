import { z } from "zod";

export const addTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  priority: z.enum(["low", "medium", "high"]).optional(),
});

export type AddTaskSchemaType = z.infer<typeof addTaskSchema>;
