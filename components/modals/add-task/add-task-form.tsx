import { priorityOptions } from "@/lib/constants";
import Dropdown from "../../dropdown";
import { Input } from "../../ui/input";
import { Controller, UseFormReturn } from "react-hook-form";
import { AddTaskSchemaType } from "./add-task-schema";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

const AddTaskForm = ({
  formId,
  control,
}: {
  formId: string;
  control: UseFormReturn<AddTaskSchemaType>["control"];
}) => {
  return (
    <form id={formId} className="mt-2 space-y-6">
      <Controller
        control={control}
        name="title"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="title" className="text-foreground">
              Title
            </FieldLabel>
            <Input
              {...field}
              id="title"
              className="h-8 border border-border text-foreground"
              placeholder="Title"
            />
            <FieldError errors={fieldState.error ? [fieldState.error] : undefined} />
          </Field>
        )}
      />
      <Controller
        control={control}
        name="priority"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="priority">Priority</FieldLabel>
            <Dropdown
              options={priorityOptions}
              value={field.value || "low"}
              onChange={(val) => field.onChange(val as "low" | "medium" | "high")}
              className="h-8 w-full"
            />
            <FieldError errors={fieldState.error ? [fieldState.error] : undefined} />
          </Field>
        )}
      />
    </form>
  );
};

export default AddTaskForm;
