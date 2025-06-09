import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type OrderItem = {
    id: number;
    quantity: number;
};

type OrderRequest = {
    phone: string;
    cart: OrderItem[];
};

type OrderResponseSuccess = {
    success: 1;
};

type OrderResponseError = {
    success: 0;
    error: string;
};

type OrderResponse = OrderResponseSuccess | OrderResponseError;

export const cartApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://o-complex.com:1337',
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    endpoints: (builder) => ({
        sendOrder: builder.mutation<OrderResponse, OrderRequest>({
            query: (body) => ({
                url: '/order',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { useSendOrderMutation } = cartApi;
