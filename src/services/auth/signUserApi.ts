import { generateRandomToken } from "../../utils/generateRandomToken";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const signUserApi = createApi({
  reducerPath: "accountApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_MOCK_ENDPOINT}`,
  }),
  endpoints: (build) => ({
    checkAccountAvailability: build.mutation<any, { email: string }>({
      query: ({ email }) => ({
        url: "users",
        params: { email },
        method: "GET",
      }),
    }),

    createAccount: build.mutation<
      any,
      { email: string; password: string; full_name: string }
    >({
      query: ({ email, password, full_name }) => ({
        url: "users",
        method: "POST",
        body: {
          email,
          password,
          full_name,
          token: generateRandomToken(),
        },
      }),
    }),
  }),
});

export const { useCheckAccountAvailabilityMutation, useCreateAccountMutation } =
  signUserApi;
