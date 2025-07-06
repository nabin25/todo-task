import { useAuth } from "../../providers/AuthProvider";
import { CreateTodoForm } from "../../components/todo/CreateTodoForm";
import TodoWrapper from "../../components/todo/TodoWrapper";
import { useGetTodosQuery } from "../../services/todo/todoApi";
import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { CheckCircle, Clock, ListTodo } from "lucide-react";
import LoadingOverlay from "../../components/LoadingOverlay";
import NoDataFound from "../../components/NoDataFound";

const HomePage = () => {
  useEffect(() => {
    document.title = "Todo Dashboard - Home";
  }, []);

  const [completed, setCompleted] = useState<boolean | undefined>();

  const { user } = useAuth();
  const {
    data: todos,
    error,
    isLoading,
  } = useGetTodosQuery({ userId: user?.id ?? 0, completed });

  const tabs = [
    { label: "All", value: undefined, icon: ListTodo },
    { label: "Completed", value: true, icon: CheckCircle },
    {
      label: "Pending",
      value: false,
      icon: Clock,
    },
  ];

  return (
    <div className="flex h-full gap-4">
      <LoadingOverlay isVisible={isLoading} />
      <div className="grow">
        <div className="flex gap-2 px-4 py-2 border-b sticky top-20 bg-white dark:bg-black">
          {tabs.map(({ label, value, icon: Icon }) => (
            <Button
              key={label}
              variant={completed === value ? "default" : "outline"}
              onClick={() => setCompleted(value)}
              className="text-[11px] h-7"
            >
              <Icon className="w-4 h-4" />
              <span className="hidden lg:block">{label}</span>
            </Button>
          ))}
        </div>
        <div className="overflow-y-auto">
          {error ? (
            <NoDataFound />
          ) : (
            <TodoWrapper
              completed={completed}
              todos={todos}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>

      <div className="w-[300px] lg:w-[400px] p-4 hidden md:block">
        <div className="sticky top-20">
          <CreateTodoForm />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
