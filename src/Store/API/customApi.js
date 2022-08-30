import {
  createApi,
  fetchBaseQuery
} from "@reduxjs/toolkit/query/react";

export const customApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_URL,
  }),
  endpoints: (builder) => ({
    getTopSales: builder.query({
      query: () => ({
        url: `top-sales`,
      }),
    }),
    getCategories: builder.query({
      query: () => ({
        url: `categories`,
      }),
    }),
    getCatalogItems: builder.query({
      query: (url) => ({
        url: url,
      }),
    }),
    getSearchItems: builder.query({
      query: (url) => ({
        url: url,
      }),
    }),
    getProduc: builder.query({
      query: (url) => ({
        url: url,
      }),
    }),
  }),
});

export const {
  useGetTopSalesQuery,
  useGetCategoriesQuery,
  useGetCatalogItemsQuery,
  useGetSearchItemsQuery,
  useGetProducQuery,
} = customApi;