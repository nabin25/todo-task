import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const emptySplitApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_MOCK_ENDPOINT,
  }),
  endpoints: () => ({}),
});
