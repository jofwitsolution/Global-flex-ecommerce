import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RxCross1 } from 'react-icons/rx';
import { IoBagHandleOutline } from 'react-icons/io5';
import { HiOutlineMinus, HiPlus } from 'react-icons/hi';
import styles from '../../styles/styles';
import { Link } from 'react-router-dom';
import { removeFromCart, updateCartItem } from '../../redux/actions/cart';

const SidebarCart = ({ setOpenCart }) => {
  const { cartItems } = useSelector((state) => state.cart);

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
    <div className='fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10'>
      <div className='fixed top-0 right-0 h-full w-[25%] overflow-y-scroll hide-scrollbar bg-white flex flex-col justify-between shadow-sm'>
        <div>
          <div className='flex w-full justify-end pt-5 pr-5'>
            <RxCross1
              size={25}
              className='cursor-pointer'
              onClick={() => setOpenCart(false)}
            />
          </div>
          <div className='w-full flex justify-center font-semibold'>
            <Link to='/cart'>Visit Cart</Link>
          </div>
          {/* Total Items */}
          <div className={`${styles.noramlFlex} p-4`}>
            <IoBagHandleOutline size={25} />
            <h5 className='pl-2 text-[20px] font-[500]'>{countCartItems()}</h5>
          </div>

          {/* cart Single Items */}
          <div className='w-full border-t'>
            {cartItems &&
              cartItems.map((item) => <CartSingle key={item.id} data={item} />)}
          </div>
        </div>

        <div className='px-5 mb-3'>
          {/* checkout buttons */}
          <Link to='/checkout'>
            <div
              className={`h-[45px] flex items-center justify-center w-[100%] bg-blue-500 rounded-[5px]`}
            >
              <h1 className='text-[#fff] text-[18px] font-[600]'>
                Checkout Now (USD${totalPrice()})
              </h1>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

const CartSingle = ({ data }) => {
  const dispatch = useDispatch();
  const totalPrice = data.discountPrice * data?.qty;

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
    <div className='border-b p-4'>
      <div className='w-full flex items-center justify-between'>
        <div>
          <div
            className={`bg-blue-500 rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`}
            onClick={() => handleIncrement()}
          >
            <HiPlus size={18} color='#fff' />
          </div>
          <span className='pl-[10px]'>{data?.qty}</span>
          <div
            className='bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer'
            onClick={() => handleDecrement()}
          >
            <HiOutlineMinus size={16} color='#7d879c' />
          </div>
        </div>
        <img src={data.image.url} alt='' className='w-[80px] h-[80px] ml-2' />
        <div className='pl-[5px]'>
          <h1>{data.name}</h1>
          <h4 className='font-[400] text-[15px] text-[#00000082]'>
            ${data.discountPrice} * {data.qty}
          </h4>
          <h4 className='font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto'>
            US${totalPrice.toFixed(2)}
          </h4>
        </div>
        <div className='w-[20px]'>
          <RxCross1
            onClick={() => dispatch(removeFromCart(data.id))}
            className='cursor-pointer'
            size={16}
            color='red'
          />
        </div>
      </div>
    </div>
  );
};

export default SidebarCart;
