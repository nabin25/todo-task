import type { ITodo } from "../../types/todo";
import TodoComponent from "./TodoComponent";
import { TodoSkeleton } from "./TodoSkeleton";

const TodoWrapper = ({
  todos,
  isLoading,
}: {
  todos?: ITodo[];
  isLoading: boolean;
}) => {
  return (
    <div className="p-4">
      {isLoading &&
        Array.from({ length: 20 }).map((_, i) => <TodoSkeleton key={i} />)}
      {todos?.map((todo) => <TodoComponent key={todo?.id} todo={todo} />)}
    </div>
  );
};

export default TodoWrapper;
