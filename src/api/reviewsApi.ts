import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

type Review = {
    id: number;
    text: string;
};

export const reviewsApi = createApi({
    reducerPath: 'reviewsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://o-complex.com:1337/',
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getReviews: builder.query<Review[], void>({
            query: () => 'reviews',
        }),
    }),
});

export const { useGetReviewsQuery } = reviewsApi;