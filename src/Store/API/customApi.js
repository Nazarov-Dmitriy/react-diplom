import {
  createApi,
  fetchBaseQuery,
  retry
} from "@reduxjs/toolkit/query/react";

const staggeredBaseQueryWithBailOut = retry(
  async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: process.env.REACT_APP_URL
    })(
      args,
      api,
      extraOptions
    )

    // // bail out of re-tries immediately if unauthorized,
    // // because we know successive re-retries would be redundant
    // if (result.error?.status === 500) {
    //   retry.fail(result.error)
    // }

    return result
  }, {
    maxRetries: 5,
  }
)

export const customApi = createApi({
  baseQuery: staggeredBaseQueryWithBailOut,
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
    addPost: builder.mutation({
      query(body) {
        return {
          url: `order`,
          method: 'POST',
          body,
        }
      },
    }),
  }),
});

export const {
  useGetTopSalesQuery,
  useGetCategoriesQuery,
  useGetCatalogItemsQuery,
  useGetSearchItemsQuery,
  useGetProducQuery,
  useAddPostMutation,
} = customApi;