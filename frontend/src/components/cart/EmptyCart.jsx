import React from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import styles from '../../styles/styles';
import { Link } from 'react-router-dom';

const EmptyCart = () => {
  return (
    <div className='w-full flex flex-col items-center py-8'>
      <div className='w-[50px] h-[50px] sm:w-[80px] sm:h-[80px] rounded-full bg-white shadow-md flex items-center justify-center'>
        <span className='text-[30px] sm:text-[50px] text-black'>
          <AiOutlineShoppingCart />
        </span>
      </div>
      <h2 className='text-black font-bold mt-4'>Your cart is empty!</h2>
      <p className='mt-4'>Browse our categories and discover our best deals!</p>
      <Link to='/' className={`${styles.buttonBlue} text-white mt-4`}>
        START SHOPPING
      </Link>
    </div>
  );
};

export default EmptyCart;
