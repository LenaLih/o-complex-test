import { cartApi } from '@/api/cartApi';
import { productsApi } from '@/api/productsApi';
import { reviewsApi } from '@/api/reviewsApi';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '@/app/features/card/cartSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [reviewsApi.reducerPath]: reviewsApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productsApi.middleware)
      .concat(reviewsApi.middleware)
      .concat(cartApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
