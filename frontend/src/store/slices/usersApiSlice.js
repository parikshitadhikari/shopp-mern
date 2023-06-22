import { USERS_URL } from "../../constants";
import { apiSlice } from "./apiSlice";

//instead of having endpoints in apiSlice, we can have them here
export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        //email and the pw will be passed as data
        url: `${USERS_URL}/auth`, // /api/users/auth : login user (mutation)
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation } = usersApiSlice;
