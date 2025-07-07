import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormField,
  FormItem,
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
import { useEditTodoMutation } from "../../services/todo/todoApi";
import { Check, X } from "lucide-react";
import toast from "react-hot-toast";
import LoadingOverlay from "../LoadingOverlay";
import type { ITodo } from "../../types/todo";
import { Checkbox } from "../ui/checkbox";

const extendedTodoSchema = todoSchema.extend({
  completed: z.boolean(),
});

type TodoFormValues = z.infer<typeof extendedTodoSchema>;

interface EditTodoProps {
  todo: ITodo;
  setEditingTodoId: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export function EditTodoForm({ todo, setEditingTodoId }: EditTodoProps) {
  const form = useForm<TodoFormValues>({
    resolver: zodResolver(extendedTodoSchema),
    defaultValues: {
      title: todo?.title,
      due_date: new Date(todo?.due_date),
      priority: todo?.priority,
      completed: todo?.completed,
    },
  });

  const [editTodo, { isLoading }] = useEditTodoMutation();

  const onSubmit = async (data: TodoFormValues) => {
    try {
      await editTodo({ ...data, id: todo.id }).unwrap();
      toast.success("Todo edited successfully!");
      setEditingTodoId(undefined);
      form.reset();
    } catch (err) {
      toast.error("Error editing todo!");
    }
  };

  return (
    <Form {...form}>
      <LoadingOverlay isVisible={isLoading} />
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex gap-1 mb-5 items-center p-2 border border-gray-500/50 rounded-md relative">
          <div className="w-10 flex-shrink-0 h-full flex items-center justify-center">
            <FormField
              control={form.control}
              name="completed"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="hover:cursor-pointer"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-2 justify-start w-full">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      aria-label="Todo title"
                      placeholder="Todo title"
                      {...field}
                      className="bg-white dark:bg-black"
                      autoFocus
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="w-1/2">
              <FormField
                control={form.control}
                name="due_date"
                render={({ field }) => (
                  <DatePickerField
                    label=""
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
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger
                          className="w-full bg-white dark:bg-black mt-3"
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
            </div>
            <div className="absolute bottom-2 right-10 flex justify-between gap-3">
              <Button size="sm" type="submit" aria-label="Confirm edit">
                <Check />
              </Button>
              <Button
                variant="destructive"
                onClick={() => setEditingTodoId(undefined)}
                size="sm"
                type="button"
                aria-label="Cancel edit"
              >
                <X />
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
