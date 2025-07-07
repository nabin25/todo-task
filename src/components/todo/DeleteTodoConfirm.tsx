import { Button } from "../ui/button";
import { useDeleteTodoMutation } from "../../services/todo/todoApi";
import { Check, X } from "lucide-react";
import toast from "react-hot-toast";
import LoadingOverlay from "../LoadingOverlay";
import type { ITodo } from "../../types/todo";
import { Checkbox } from "../ui/checkbox";
import { cn } from "../../lib/utils";
import { useAuth } from "../../providers/AuthProvider";

interface EditTodoProps {
  todo: ITodo;
  setDeletingTodoId: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export function DeleteTodoConfirm({ todo, setDeletingTodoId }: EditTodoProps) {
  const [deleteTodo, { isLoading }] = useDeleteTodoMutation();

  const { user } = useAuth();

  const handleDelete = async (id: number) => {
    try {
      await deleteTodo({ id, userId: user?.id || 0 }).unwrap();
      toast.success("Todo deleted successfully!");
      setDeletingTodoId(undefined);
    } catch (error) {
      toast.error("Failed to delete todo!");
    }
  };
  return (
    <>
      <LoadingOverlay isVisible={isLoading} />
      <div className="flex gap-1 mb-5 items-center p-2 border border-gray-500/50 rounded-md relative">
        <div className="w-10 flex-shrink-0 h-full flex items-center justify-center">
          <Checkbox checked={todo?.completed} />
        </div>
        <div className="flex flex-col gap-2 justify-start w-full">
          <h4
            className={cn(
              "font-semibold transition-all duration-300",
              todo?.completed ? "line-through text-muted-foreground/80" : ""
            )}
          >
            {todo.title}
          </h4>

          <p className="text-red-400">Confirm Delete?</p>

          <div className="absolute bottom-2 right-10 flex justify-between gap-3">
            <Button
              size="sm"
              onClick={() => handleDelete(todo.id)}
              aria-label="Confirm delete"
            >
              <Check />
            </Button>
            <Button
              variant="destructive"
              onClick={() => setDeletingTodoId(undefined)}
              size="sm"
              aria-label="Cancel delete"
            >
              <X />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
