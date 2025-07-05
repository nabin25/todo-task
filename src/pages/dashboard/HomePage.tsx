import TodoWrapper from "../../components/todo/TodoWrapper";
import { useGetTodosQuery } from "../../services/todo/todoApi";
import { useEffect } from "react";

const HomePage = () => {
  useEffect(() => {
    document.title = "Todo Dashboard-Home";
  }, []);
  const { data: todos, error, isLoading } = useGetTodosQuery();
  return (
    <>
      <TodoWrapper todos={todos} isLoading={isLoading} />
    </>
  );
};

export default HomePage;
