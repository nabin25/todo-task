import { useGetTodosQuery } from "../../services/todo/todoApi";
import { useEffect } from "react";

const HomePage = () => {
  useEffect(() => {
    document.title = "Todo Dashboard-Home";
  }, []);
  const { data: todos, error, isLoading } = useGetTodosQuery();
  return <div>{todos?.map((singleTodo) => <p>{singleTodo?.title}</p>)}</div>;
};

export default HomePage;
