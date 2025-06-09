import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://o-complex.com:1337',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<
      {
        page: number;
        total: number;
        items: {
          id: number;
          image_url: string;
          title: string;
          description: string;
          price: number;
        }[];
      },
      number
    >({
      query: (page) => `/products?page=${page}&page_size=20`,
    }),
  }),
});
export const { useGetProductsQuery } = productsApi;
