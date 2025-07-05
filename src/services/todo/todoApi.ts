import { emptySplitApi } from "../../lib/apiSlice";

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const todoApi = emptySplitApi.injectEndpoints({
  endpoints: (build) => ({
    getTodos: build.query<Todo[], void>({
      query: () => "todos",
    }),
  }),
  overrideExisting: false,
});

export const { useGetTodosQuery } = todoApi;
