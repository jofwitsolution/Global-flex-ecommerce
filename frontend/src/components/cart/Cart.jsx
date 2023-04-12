import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateCartItem } from '../../redux/actions/cart';
import {
  AiFillMinusSquare,
  AiFillPlusSquare,
  AiOutlineDelete,
} from 'react-icons/ai';
import { Link } from 'react-router-dom';
import styles from '../../styles/styles';
import { percentageReduction } from '../../utils/price';

const Cart = ({ cartItems }) => {
  const countCartItems = () => {
    let count = 0;
    cartItems.forEach((item) => {
      count = count + item.qty;
    });

    return count;
  };

  const totalPrice = () => {
    const result = cartItems.reduce((acc, item) => {
      return item.discountPrice * item.qty + acc;
    }, 0);

    return result.toFixed(2);
  };

  return (
    <div className='w-full flex flex-col md:flex-row gap-4'>
      <div className='flex-[75%]'>
        <div className='w-full mb-[2px] text-[16px] md:text-[20px] font-bold bg-white rounded-sm shadow-sm px-4 py-2'>
          Cart ({countCartItems()})
        </div>
        {cartItems.map((item) => (
          <CartItem key={item.id} data={item} />
        ))}
      </div>
      <div className='flex-[25%]'>
        <div className='w-full mb-[2px] md:text-[16px] font-semibold bg-white rounded-sm shadow-sm px-2 py-1'>
          CART SUMMARY
        </div>
        <div className='w-full flex justify-between mb-[2px] md:text-[16px] font-semibold bg-white rounded-sm shadow-sm p-2'>
          <span>Subtotal</span>{' '}
          <span className='md:text-[18px] font-bold'>${totalPrice()}</span>
        </div>
        <div className='w-full mb-[2px] md:text-[16px] font-semibold bg-white rounded-sm shadow-sm px-2 py-1'>
          <Link
            to='/checkout'
            className='w-full bg-blue-500 text-white font-semibold flex py-3 justify-center rounded-md'
          >
            CHECKOUT (${totalPrice()})
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;

const CartItem = ({ data }) => {
  const dispatch = useDispatch();

  const handleDecrement = () => {
    if (data?.qty > 1) {
      const product = { ...data };
      product.qty = product.qty - 1;
      dispatch(updateCartItem(product));
    }
  };

  const handleIncrement = () => {
    if (data?.qty < data?.numberInStock) {
      const product = { ...data };
      product.qty = product.qty + 1;
      dispatch(updateCartItem(product));
    }
  };

  return (
    <div className='w-full mb-[2px] font-semibold bg-white rounded-sm shadow-sm px-4 py-2'>
      <div className='w-full'>
        <Link to={`/product/${data.url}`}>
          <div className='w-full flex gap-4'>
            <img
              src={data.image.url}
              alt={data.name}
              className='w-[80px] h-[80px]'
            />

            <div className='w-full flex flex-col gap-2 sm:gap-4 md:flex-row justify-between items-start'>
              <h1 className='text-[14px] sm:text-[16px]'>{data.name}</h1>
              <div className='flex md:flex-col gap-1 md:items-end'>
                <h3 className='md:text-[18px] font-bold'>
                  ${data.discountPrice}
                </h3>
                <div>
                  {data.originalPrice === data.discountPrice ? null : (
                    <span className={`${styles.price} !text-[rgba(0,0,0,0.5)]`}>
                      ${data.originalPrice}
                    </span>
                  )}

                  <span className='text-[#d55b45] ml-2 hidden 400px:inline'>
                    {percentageReduction(
                      data.originalPrice,
                      data.discountPrice
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
        <div className='w-full flex justify-between items-start mt-4'>
          <div
            onClick={() => dispatch(removeFromCart(data.id))}
            className='flex gap-2 items-center text-red-500 cursor-pointer'
          >
            <span>
              <AiOutlineDelete size={20} />
            </span>
            <span className='text-red-500'>REMOVE</span>
          </div>
          <div className='flex justify-between items-center gap-6 md:gap-4'>
            <span
              onClick={handleDecrement}
              className='text-[25px] md:text-[30px] text-blue-500 hover:text-blue-300 active:text-blue-400 cursor-pointer'
            >
              <AiFillMinusSquare />
            </span>
            <span>{data.qty}</span>
            <span
              onClick={handleIncrement}
              className='text-[25px] md:text-[30px] text-blue-500 hover:text-blue-300 active:text-blue-400 cursor-pointer'
            >
              <AiFillPlusSquare />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
