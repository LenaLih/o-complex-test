'use client';

import { useSendOrderMutation } from '@/api/cartApi';
import { Button } from '@/app/components/ui/Button/Button';
import { clearCart } from '@/app/features/card/cartSlice';
import { useAppDispatch, useAppSelector } from '@/app/hooks/hooks';
import type { RootState } from '@/store';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import s from './cart.module.scss';

export const Cart = () => {
  const cart = useAppSelector((state: RootState) => state.cart.items);
  const dispatch = useAppDispatch();

  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);

  useEffect(() => {
    const savedPhone = localStorage.getItem('phone');
    if (savedPhone) setPhone(savedPhone);
  }, []);

  useEffect(() => {
    localStorage.setItem('phone', phone);
  }, [phone]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    let formatted = '+7 ';
    if (digits.length > 1) formatted += '(' + digits.slice(1, 4);
    if (digits.length >= 4) formatted += ') ' + digits.slice(4, 7);
    if (digits.length >= 7) formatted += '-' + digits.slice(7, 9);
    if (digits.length >= 9) formatted += '-' + digits.slice(9, 11);
    return formatted;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const digits = val.replace(/\D/g, '');
    if (digits.startsWith('8')) {
      setPhone(formatPhone('7' + digits.slice(1)));
    } else if (digits.startsWith('7') || digits.length === 0) {
      setPhone(formatPhone(digits));
    }
  };
  const [sendOrder, { isLoading }] = useSendOrderMutation();

  const isPhoneComplete = (phone: string) => {
    return phone.replace(/\D/g, '').length === 11;
  };
  const handleOrder = async () => {
    if (!isPhoneComplete(phone)) {
      setPhoneError(true);
      return;
    }

    try {
      const response = await sendOrder({
        phone: phone.replace(/\D/g, ''),
        cart: cart.map(({ id, quantity }) => ({ id, quantity })),
      }).unwrap();

      if (response.success === 1) {
        toast.success('Заказ отправлен!');
        dispatch(clearCart());
        setSuccessPopup(true);
      } else {
        toast.error(response.error || 'Ошибка при оформлении заказа');
      }
    } catch {
      toast.error('Сетевая ошибка. Попробуйте позже');
    }
  };

  return (
    <div className={s.cart}>
      <h2 className={s.title}>Добавленные товары</h2>
      {cart.map((item) => (
        <div key={item.id} className={s.item}>
          <p>
            <strong>{item.title}</strong>
          </p>
          <p>X {item.quantity}</p>
          <p> {item.price} ₽</p>
        </div>
      ))}
      <div className={s.total}>
        <p>
          Товаров: <span>{cart.reduce((acc, i) => acc + i.quantity, 0)}</span>
        </p>
        <p>
          Итого: <span>{total} ₽</span>
        </p>
      </div>
      <div className={s.cart_footer}>
        <input
          type="text"
          placeholder=" +7 (___) ___  __ - __"
          value={phone}
          onChange={handlePhoneChange}
          maxLength={18}
          className={phoneError ? s.error : ''}
        />
        <Button onClick={handleOrder} disabled={isLoading}>
          {isLoading ? 'Отправка...' : 'Заказать'}
        </Button>

        {successPopup && (
          <div className={s.popup}>
            <div className={s.popup_content}>
              <p>Заказ успешно оформлен!</p>
              <Button onClick={() => setSuccessPopup(false)}>Закрыть</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
