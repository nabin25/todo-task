import { emptySplitApi } from "../../lib/apiSlice";
import type { ITodo } from "../../types/todo";

const todoApi = emptySplitApi.injectEndpoints({
  endpoints: (build) => ({
    getTodos: build.query<ITodo[], { userId: number; completed?: boolean }>({
      query: ({ userId, completed }) => {
        const params: Record<string, any> = {
          userId,
          sortBy: "createdAt",
        };

        if (completed !== undefined) {
          params.completed = completed;
        }

        return {
          url: "todos",
          params,
        };
      },
      providesTags: ["Todo"],
    }),
    addTodo: build.mutation<ITodo, Partial<ITodo>>({
      query: (newTodo) => ({
        url: "todos",
        method: "POST",
        body: { ...newTodo, completed: false },
      }),
      invalidatesTags: ["Todo"],
    }),
    updateTodoStatus: build.mutation<
      ITodo,
      Pick<ITodo, "completed" | "id" | "userId">
    >({
      query: ({ id, completed }) => ({
        url: `todos/${id}`,
        method: "PUT",
        body: { completed },
      }),
      async onQueryStarted(
        { id, completed, userId },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          todoApi.util.updateQueryData("getTodos", { userId }, (draft) => {
            const todo = draft.find((t) => t.id === id);
            if (todo) {
              todo.completed = completed;
            }
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ["Todo"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoStatusMutation,
} = todoApi;
