'use client';

import { Button } from '@/app/components/ui/Button/Button';
import { useAppDispatch, useAppSelector } from '@/app/hooks/hooks';
import type { RootState } from '@/store';
import type { Product } from '@/types';
import { useState, useEffect } from 'react';
import s from './products.module.scss';
import { useGetProductsQuery } from '@/api/productsApi';
import { useInfiniteScroll } from '@/app/hooks/useInfiniteScroll';
import { addToCart, decrease, increase, setQuantity } from '@/app/features/card/cartSlice';

export const Products = () => {
  const [page, setPage] = useState(1);
  const [allItems, setAllItems] = useState<Product[]>([]);
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state: RootState) => state.cart.items);

  const { data, isLoading, isFetching } = useGetProductsQuery(page);

  useEffect(() => {
    if (data?.items) {
      const newItems = data.items.filter(
        (item) => !allItems.some((existing) => existing.id === item.id)
      );
      setAllItems((prev) => [...prev, ...newItems]);
    }
  }, [data]);

  const loadMore = () => {
    if (!isFetching && data?.total && allItems.length < data.total) {
      setPage((prev) => prev + 1);
    }
  };

  const bottomRef = useInfiniteScroll(loadMore);

  return (
    <div className={s.product_list}>
      {allItems.map((product) => {
        const cartItem = cart.find((item) => item.id === product.id);

        return (
          <div key={product.id} className={s.product_card}>
            <img src={product.image_url} alt={product.title} />
            <div className={s.content}>
              <h3 className={s.title}>{product.title}</h3>
              <p>{product.description}</p>
              <strong>цена: {product.price} ₽</strong>
            </div>
            <div>
              <div className={`${s.action} ${!cartItem ? s.fullWidth : ''}`}>
                {cartItem ? (
                  <div className={s.counter}>
                    <Button onClick={() => dispatch(decrease(product.id))}>-</Button>
                    <input
                      type="number"
                      min={1}
                      value={cartItem.quantity}
                      className={s.quality}
                      onChange={(e) => {
                        const parsed = parseInt(e.target.value, 10);
                        if (!isNaN(parsed) && parsed > 0) {
                          dispatch(setQuantity({ id: product.id, quantity: parsed }));
                        }
                      }}
                    />
                    <Button onClick={() => dispatch(increase(product.id))}>+</Button>
                  </div>
                ) : (
                  <Button onClick={() => dispatch(addToCart(product))}>Купить</Button>
                )}
              </div>
            </div>
          </div>
        );
      })}
      {allItems.length > 20 && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            padding: '10px 20px',
            background: '#d9d9d9',
            color: 'black',
            borderRadius: '6px',
            zIndex: 999,
          }}
        >
          ↑ Наверх
        </button>
      )}
      {isLoading && <p>Загрузка...</p>}
      <div ref={bottomRef} style={{ height: '1px' }}></div>
    </div>
  );
};
