'use client';
import { Cart } from '@/app/components/cart/Cart';
import { Products } from '@/app/components/products/Products';
import { Reviews } from '@/app/components/reviews/Reviews';
import s from './page.module.scss';

export default function Home() {
  return (
    <div className={s.container}>
      <Reviews />
      <Cart />
      <Products />
    </div>
  );
}
