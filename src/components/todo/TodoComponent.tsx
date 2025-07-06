import type { ITodo } from "../../types/todo";
import { Checkbox } from "../ui/checkbox";
import { cn } from "../../lib/utils";
import {
  CalendarRange,
  CheckCircle2,
  LoaderCircle,
  OctagonAlert,
  ShieldAlert,
  TriangleAlert,
} from "lucide-react";
import { getRelativeTime } from "../../utils/getRelativeTime";
import { Badge } from "../ui/badge";
import { useUpdateTodoStatusMutation } from "../../services/todo/todoApi";
import { useAuth } from "../../providers/AuthProvider";
import { useState } from "react";

const TodoComponent = ({ todo }: { todo: ITodo }) => {
  const { user } = useAuth();
  const [updateTodoStatus, { isLoading: isStatusUpdating }] =
    useUpdateTodoStatusMutation();

  const [isEditMode, setIsEditMode] = useState(false);
  return (
    <>
      <div className="flex gap-3 mb-5 items-center p-2 border border-gray-500/50 rounded-md">
        <div className="w-10 flex-shrink-0 h-full flex items-center justify-center">
          {!isStatusUpdating ? (
            <Checkbox
              className="hover:cursor-pointer"
              checked={todo?.completed}
              onCheckedChange={(checked) => {
                updateTodoStatus({
                  id: todo.id,
                  completed: !!checked,
                  userId: user?.id ?? 0,
                });
              }}
            />
          ) : (
            <LoaderCircle className="animate-spin" />
          )}
        </div>
        <div className="flex flex-col gap-2 justify-start">
          <h4
            className={cn(
              "font-semibold transition-all duration-300",
              todo?.completed ? "line-through text-muted-foreground/80" : ""
            )}
          >
            {todo.title}
          </h4>
          {todo?.completed ? (
            <p className="flex gap-2 text-xs items-center text-green-400">
              <span>
                <CheckCircle2 className="w-4 h-4" />
              </span>
              Completed
            </p>
          ) : (
            <p
              className={`flex gap-2 text-xs items-center ${
                getRelativeTime(todo?.due_date).startsWith("Overdue")
                  ? "text-red-500"
                  : "text-gray-400"
              }`}
            >
              <span>
                <CalendarRange className="w-4 h-4" />
              </span>
              {getRelativeTime(todo?.due_date)}
            </p>
          )}

          <Badge
            variant="secondary"
            className={cn(
              todo?.priority === "HIGH"
                ? "bg-red-500 text-red-100"
                : todo?.priority === "MEDIUM"
                  ? "bg-blue-500 text-blue-100"
                  : "bg-gray-500 text-gray-100"
            )}
          >
            {todo?.priority === "HIGH" ? (
              <OctagonAlert className="w-5 h-5" />
            ) : todo?.priority === "MEDIUM" ? (
              <TriangleAlert />
            ) : (
              <ShieldAlert />
            )}
            {todo?.priority}
          </Badge>
        </div>
      </div>
    </>
  );
};

export default TodoComponent;
