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
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`, // /api/users : register user (mutation)
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`, // /api/users/logout : logout user (mutation)
        method: "POST",
      }),
    }),
    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});
export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useProfileMutation } = usersApiSlice;
