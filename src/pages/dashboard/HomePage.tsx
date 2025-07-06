import { useAuth } from "../../providers/AuthProvider";
import { CreateTodoForm } from "../../components/todo/CreateTodoForm";
import TodoWrapper from "../../components/todo/TodoWrapper";
import { useGetTodosQuery } from "../../services/todo/todoApi";
import { useEffect } from "react";

const HomePage = () => {
  useEffect(() => {
    document.title = "Todo Dashboard-Home";
  }, []);

  const { user } = useAuth();
  const {
    data: todos,
    error,
    isLoading,
  } = useGetTodosQuery({ userId: user?.id ?? 0 });
  return (
    <div className="flex h-full gap-4">
      <div className="w-full overflow-y-auto">
        <TodoWrapper todos={todos} isLoading={isLoading} />
      </div>
      <div className="w-xl p-4">
        <div className="sticky top-20">
          <CreateTodoForm />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
