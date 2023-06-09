import React, { useState, useEffect } from 'react';
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../../styles/styles';
import { useProductCart } from '../../hooks/useProducts';
import { addToCart } from './../../redux/actions/cart';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import ButtonLoader from './../Loaders/ButtonLoader';
import { percentageReduction } from '../../utils/price';

const ProductDetails = ({ data }) => {
  const dispatch = useDispatch();

  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate();

  const {
    data: dataProduct,
    isSuccess: isSuccessProduct,
    refetch: fetchProduct,
    isFetching,
  } = useProductCart(`products/${data?._id}/product`, 'product-details-cart');

  const incrementCount = () => {
    if (count < data?.numberInStock) setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleMessageSubmit = () => {
    navigate('/inbox?conversation=507ebjver884ehfdjeriv84');
  };

  const handleAddToCart = () => {
    fetchProduct();
    toast.success('Product added to cart');
  };

  useEffect(() => {
    if (isSuccessProduct) {
      dispatch(addToCart(dataProduct?.product, count));
    }
  }, [isSuccessProduct, dataProduct, count, dispatch]);

  return (
    <div className='bg-white'>
      {data && (
        <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
          <div className='w-full py-5'>
            <div className='block w-full 800px:flex'>
              <div className='w-full 800px:w-[50%]'>
                <img
                  src={data?.images[currentImage].url}
                  alt={currentImage}
                  className='w-[80%] max-h-[500px] mb-4'
                />
                <div className='w-full flex'>
                  {data?.images?.map((item, index) => (
                    <div
                      key={item.public_id}
                      className={`${
                        currentImage === index
                          ? 'border-2 border-black'
                          : 'null'
                      } cursor-pointer mr-2`}
                    >
                      <img
                        src={item.url}
                        alt=''
                        className='w-[80px]'
                        onClick={() => setCurrentImage(index)}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className='w-full 800px:w-[50%] pt-5'>
                <h1 className={`${styles.productTitle}`}>{data?.name}</h1>
                <p>{data.briefDescription}</p>
                <div className='flex pt-3'>
                  <h4 className={`${styles.productDiscountPrice}`}>
                    {data.discountPrice}$
                  </h4>
                  <h3 className={`${styles.price} !text-[rgba(0,0,0,0.5)]`}>
                    {data.originalPrice === data.discountPrice
                      ? null
                      : data.originalPrice + ' $'}
                  </h3>
                  <h3 className='ml-3 text-red-500 font-bold'>
                    <sup>
                      {percentageReduction(
                        data.originalPrice,
                        data.discountPrice
                      )}
                    </sup>
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
                        <button
                          className='bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out'
                          onClick={decrementCount}
                        >
                          -
                        </button>
                        <span className='bg-gray-200 text-gray-800 font-medium px-4 py-[11px]'>
                          {count}
                        </span>
                        <button
                          className='bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out'
                          onClick={incrementCount}
                        >
                          +
                        </button>
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
                    disabled={isFetching}
                    onClick={() => handleAddToCart()}
                    className={`${styles.button} !mt-6 !rounded !h-11 flex items-center`}
                  >
                    {isFetching ? (
                      <ButtonLoader color={'white'} width={25} />
                    ) : (
                      <span className='text-white flex items-center'>
                        Add to cart <AiOutlineShoppingCart className='ml-1' />
                      </span>
                    )}
                  </button>
                )}

                <div className='flex items-center pt-8'>
                  <img
                    src={data.shop?.avatar?.url}
                    alt='shop avatar'
                    className='w-[120px] mr-2'
                  />
                  <div className='pr-8'>
                    <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                      {data.shop.name}
                    </h3>
                    <h5 className='pb-3 text-[15px]'>
                      ({data.shop.rating}) Ratings
                    </h5>
                  </div>
                  <div
                    className={`${styles.button} bg-[#6443d1] mt-4 !rounded !h-11`}
                    onClick={handleMessageSubmit}
                  >
                    <span className='text-white flex items-center'>
                      Send Message <AiOutlineMessage className='ml-1' />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ProductDetailsInfo data={data} />
          <br />
          <br />
        </div>
      )}
    </div>
  );
};

const ProductDetailsInfo = ({ data }) => {
  const [active, setActive] = useState(1);

  return (
    <div className='bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded'>
      {data && (
        <>
          <div className='w-full flex justify-between border-b pt-10 pb-2'>
            <div className='relative'>
              <h5
                className={
                  'text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]'
                }
                onClick={() => setActive(1)}
              >
                Product Details
              </h5>
              {active === 1 ? (
                <div className={`${styles.active_indicator}`} />
              ) : null}
            </div>
            <div className='relative'>
              <h5
                className={
                  'text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]'
                }
                onClick={() => setActive(2)}
              >
                Product Reviews
              </h5>
              {active === 2 ? (
                <div className={`${styles.active_indicator}`} />
              ) : null}
            </div>
            <div className='relative'>
              <h5
                className={
                  'text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]'
                }
                onClick={() => setActive(3)}
              >
                Seller Information
              </h5>
              {active === 3 ? (
                <div className={`${styles.active_indicator}`} />
              ) : null}
            </div>
          </div>
          {active === 1 ? (
            <>
              <div
                dangerouslySetInnerHTML={{
                  __html: data?.fullDescription,
                }}
                className='py-2 text-[18px] leading-8 pb-10 whitespace-pre-line'
              ></div>
            </>
          ) : null}

          {active === 2 ? (
            <div className='w-full justify-center min-h-[40vh] flex items-center'>
              <p>No Reviews yet!</p>
            </div>
          ) : null}

          {active === 3 && (
            <div className='w-full block 800px:flex p-5'>
              <div className='w-full 800px:w-[50%]'>
                <div className='flex items-center'>
                  <img
                    src={data.shop?.avatar?.url}
                    className='w-[120px]'
                    alt='shop avatar'
                  />
                  <div className='pl-3'>
                    <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                    <h5 className='pb-2 text-[15px]'>
                      ({data.shop.rating}) Ratings
                    </h5>
                  </div>
                </div>
                <div className='pt-2'>{data.shop.description}</div>
              </div>
              <div className='w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end'>
                <div className='text-left'>
                  <h5 className='font-[600]'>
                    Joined on:{' '}
                    <span className='font-[500]'>
                      {new Date(data.shop.createdAt).toDateString()}
                    </span>
                  </h5>
                  <h5 className='font-[600] pt-3'>
                    Total Products:{' '}
                    <span className='font-[500]'>
                      {data.shop?.products?.length}
                    </span>
                  </h5>
                  <h5 className='font-[600] pt-3'>
                    Total Reviews:{' '}
                    <span className='font-[500]'>
                      {data.shop?.reviews?.length}
                    </span>
                  </h5>
                  <Link to='/'>
                    <div
                      className={`${styles.button} !rounded-[4px] !h-[39.5px] mt-3`}
                    >
                      <h4 className='text-white'>Visit Shop</h4>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductDetails;
