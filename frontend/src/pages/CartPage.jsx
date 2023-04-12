import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Footer from '../components/Layout/Footer';
import Header from '../components/Layout/Header';
import styles from '../styles/styles';
import EmptyCart from '../components/cart/EmptyCart';
import Cart from '../components/cart/Cart';

const CartPage = () => {
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Header />
      <br />

      <div className={`${styles.section}`}>
        {cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <Cart cartItems={cartItems} />
        )}
      </div>

      <br />
      <Footer />
    </div>
  );
};

export default CartPage;
