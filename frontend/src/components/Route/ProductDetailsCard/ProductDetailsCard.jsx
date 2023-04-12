import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from 'react-icons/ai';
import { RxCross1 } from 'react-icons/rx';
import styles from '../../../styles/styles';
import { useProductCart } from '../../../hooks/useProducts';
import { addToCart } from '../../../redux/actions/cart';
import { toast } from 'react-toastify';
import ButtonLoader from '../../Loaders/ButtonLoader';

const ProductDetailsCard = ({ setOpen, data }) => {
  const dispatch = useDispatch();

  const [click, setClick] = useState(false);

  const {
    data: dataProduct,
    isSuccess: isSuccessProduct,
    refetch: fetchProduct,
    isFetching,
  } = useProductCart(
    `products/${data?._id}/product`,
    'product-details-card-cart'
  );

  const handleMessageSubmit = () => {};

  const handleAddToCart = () => {
    fetchProduct();
    toast.success('Product added to cart');
  };

  useEffect(() => {
    if (isSuccessProduct) {
      dispatch(addToCart(dataProduct?.product, 4));
    }

    return () => dispatch;
  }, [isSuccessProduct, dataProduct, dispatch]);

  return (
    <>
      {data ? (
        <div className='fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center'>
          <div className='w-[90%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4'>
            <RxCross1
              size={30}
              className='absolute right-3 top-3 z-50 text-red-600 font-bold'
              onClick={() => setOpen(false)}
            />

            <div className='block w-full 800px:flex'>
              <div className='w-full 800px:w-[50%]'>
                <img src={data.images[0].url} alt='product_image' />
                <div className='flex'>
                  <img
                    src={data.shop?.avatar?.url}
                    alt='shop avatar'
                    className='w-[120px] mr-2'
                  />
                  <div>
                    <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                    <h5 className='pb-3 text-[15px]'>
                      ({data.shop.rating}) Ratings
                    </h5>
                  </div>
                </div>
                <div
                  className={`${styles.button} bg-[#000] mt-4 rounded-[4px] h-11`}
                  onClick={handleMessageSubmit}
                >
                  <span className='text-[#fff] flex items-center'>
                    Send Message <AiOutlineMessage className='ml-1' />
                  </span>
                </div>
                <h5 className='text-[16px] text-[red] mt-5'>
                  ({data.soldOut}) Sold out
                </h5>
              </div>

              <div className='w-full 800px:w-[50%] pt-5 pl-[5px] pr-[5px]'>
                <h1 className={`${styles.productTitle} text-[20px]`}>
                  {data.name}
                </h1>
                <p>{data.briefDescription}</p>

                <div className='flex pt-3'>
                  <h4 className={`${styles.productDiscountPrice}`}>
                    {data.discountPrice}$
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {data.originalPrice === data.discountPrice
                      ? null
                      : data.originalPrice + ' $'}
                  </h3>
                </div>
                <div className='flex items-center mt-12 justify-between pr-3'>
                  <div>
                    {data?.numberInStock === 0 ? (
                      <span className='text-red-400 font-semibold'>
                        Out of stock
                      </span>
                    ) : (
                      <>
                        <span className='text-black font-semibold'>
                          {data?.numberInStock} left
                        </span>
                      </>
                    )}
                  </div>
                  <div>
                    {click ? (
                      <AiFillHeart
                        size={30}
                        className='cursor-pointer'
                        onClick={() => setClick(!click)}
                        color={click ? 'red' : '#333'}
                        title='Remove from wishlist'
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className='cursor-pointer'
                        onClick={() => setClick(!click)}
                        color={click ? 'red' : '#333'}
                        title='Add to wishlist'
                      />
                    )}
                  </div>
                </div>
                {data?.numberInStock === 0 ? null : (
                  <button
                    onClick={() => handleAddToCart()}
                    disabled={isFetching}
                    className={`${styles.button} mt-6 rounded-[4px] h-11 flex items-center`}
                  >
                    {isFetching ? (
                      <ButtonLoader color={'white'} width={25} />
                    ) : (
                      <span className='text-[#fff] flex items-center'>
                        Add to cart <AiOutlineShoppingCart className='ml-1' />
                      </span>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ProductDetailsCard;
