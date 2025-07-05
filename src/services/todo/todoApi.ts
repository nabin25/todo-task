import { emptySplitApi } from "../../lib/apiSlice";
import type { ITodo } from "../../types/todo";

const todoApi = emptySplitApi.injectEndpoints({
  endpoints: (build) => ({
    getTodos: build.query<ITodo[], void>({
      query: () => "todos",
    }),
  }),
  overrideExisting: false,
});

export const { useGetTodosQuery } = todoApi;
