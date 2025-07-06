import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { DatePickerField } from "../ui/date-picker"; //
import { todoSchema } from "../../schemas/todo.schema";
import { useAddTodoMutation } from "../../services/todo/todoApi";
import { useAuth } from "../../providers/AuthProvider";
import { LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";
import LoadingOverlay from "../LoadingOverlay";

type TodoFormValues = z.infer<typeof todoSchema>;

export function CreateTodoForm() {
  const form = useForm<TodoFormValues>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: "",
      due_date: (() => {
        const date = new Date();
        date.setDate(date.getDate() + 1);
        date.setHours(23, 59, 0, 0);
        return date;
      })(),
      priority: "MEDIUM",
    },
  });

  const { user } = useAuth();

  const [addTodo, { isLoading }] = useAddTodoMutation();

  const onSubmit = async (data: TodoFormValues) => {
    try {
      const res = await addTodo({ ...data, userId: user?.id }).unwrap();
      toast.success("Todo added successfully!");
      form.reset();
    } catch (err) {
      toast.error("Error adding todo!");
    }
  };

  return (
    <Form {...form}>
      <LoadingOverlay isVisible={isLoading} />
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 max-w-md bg-amber-400/20 p-3 rounded-md shadow-2xl dark:bg-amber-600/20"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  aria-label="Todo title"
                  placeholder="Todo title"
                  {...field}
                  className="bg-white dark:bg-black"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="due_date"
          render={({ field }) => (
            <DatePickerField
              label="Due Date"
              field={field}
              ariaLabel="Due date"
            />
          )}
        />

        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger
                    className="w-full bg-white dark:bg-black"
                    aria-label="Select priority"
                  >
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="HIGH">High</SelectItem>
                  <SelectItem value="MEDIUM">Medium</SelectItem>
                  <SelectItem value="LOW">Low</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {!isLoading ? "Add Todo" : <LoaderCircle className="animate-spin" />}
        </Button>
      </form>
    </Form>
  );
}
