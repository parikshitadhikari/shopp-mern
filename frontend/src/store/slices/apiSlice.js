// this is gonna be parent to other api slices
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../constants";

export const apiSlice = createApi({
//   reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Product", "Order", "User"],
  endpoints: (builder) => ({}),
});
