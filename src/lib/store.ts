import { configureStore } from "@reduxjs/toolkit";
import { emptySplitApi } from "./apiSlice";
import { signUserApi } from "../services/auth/signUserApi";

export const store = configureStore({
  reducer: {
    [emptySplitApi.reducerPath]: emptySplitApi.reducer,
    [signUserApi.reducerPath]: signUserApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(emptySplitApi.middleware)
      .concat(signUserApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
