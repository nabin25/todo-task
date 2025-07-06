import { useEffect, useState } from "react";
import type { ITodo } from "../../types/todo";
import NoDataFound from "../NoDataFound";
import TodoComponent from "./TodoComponent";
import { TodoSkeleton } from "./TodoSkeleton";

const TodoWrapper = ({
  todos,
  isLoading,
  completed,
}: {
  todos?: ITodo[];
  isLoading: boolean;
  completed: boolean | undefined;
}) => {
  const [editingTodoId, setEditingTodoId] = useState<number | undefined>();

  useEffect(() => {
    setEditingTodoId(undefined);
  }, [completed]);

  return (
    <div className="p-4">
      {isLoading &&
        Array.from({ length: 20 }).map((_, i) => <TodoSkeleton key={i} />)}
      {todos &&
        todos?.length > 0 &&
        todos?.map((todo) => (
          <TodoComponent
            key={todo?.id}
            todo={todo}
            editingTodoId={editingTodoId}
            setEditingTodoId={setEditingTodoId}
          />
        ))}
      {!isLoading && todos && todos?.length === 0 && <NoDataFound />}
    </div>
  );
};

export default TodoWrapper;
