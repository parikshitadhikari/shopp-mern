import { PRODUCTS_URL } from "../../constants";
import { apiSlice } from "./apiSlice";

//instead of having endpoints in apiSlice, we can have them here
export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL, // /api/products get all the products (query)
        method: "GET",
      }),
      keepUnusedDataFor: 5, //keep the data for 5 seconds
    }),
    getProductById: builder.query({
      query: (id) => ({
        url: `${PRODUCTS_URL}/${id}`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
    createProduct: builder.mutation({
      query: () => ({
        url: `${PRODUCTS_URL}`,
        method: "POST",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery, useCreateProductMutation } = productsApiSlice;
