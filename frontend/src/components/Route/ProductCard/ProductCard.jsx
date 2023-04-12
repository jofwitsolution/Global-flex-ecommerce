import React, { useState, useEffect } from 'react';
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from 'react-icons/ai';
import { Link } from 'react-router-dom';
import styles from '../../../styles/styles';
import ProductDetailsCard from '../ProductDetailsCard/ProductDetailsCard';
import { useProductCart } from '../../../hooks/useProducts';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../redux/actions/cart';

const ProductCard = ({ data }) => {
  const dispatch = useDispatch();

  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);

  const productUrl = data.url;

  const {
    data: dataProduct,
    isSuccess: isSuccessProduct,
    refetch: fetchProduct,
  } = useProductCart(`products/${data?._id}/product`, 'product-card-cart');

  const handleAddToCart = () => {
    fetchProduct();
    toast.success('Product added to cart');
  };

  useEffect(() => {
    if (isSuccessProduct) {
      dispatch(addToCart(dataProduct?.product, 1));
    }
  }, [isSuccessProduct, dataProduct, dispatch]);

  return (
    <>
      <div className='w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer'>
        <div className='flex justify-end'></div>
        <Link to={`/product/${productUrl}`}>
          <img
            src={data.images[0].url}
            alt=''
            className='w-full h-[170px] object-contain'
          />
        </Link>
        <Link to='/'>
          <h5 className={`${styles.shop_name}`}>{data.shop.name}</h5>
        </Link>
        <Link to={`/product/${productUrl}`}>
          <h4 className='pb-3 font-[500]'>
            {data.name.length > 40 ? data.name.slice(0, 40) + '...' : data.name}
          </h4>

          <div className='flex'>
            <AiFillStar
              className='mr-2 cursor-pointer'
              size={20}
              color='#F6BA00'
            />
            <AiFillStar
              className='mr-2 cursor-pointer'
              size={20}
              color='#F6BA00'
            />
            <AiFillStar
              className='mr-2 cursor-pointer'
              size={20}
              color='#F6BA00'
            />
            <AiFillStar
              className='mr-2 cursor-pointer'
              color='#F6BA00'
              size={20}
            />
            <AiOutlineStar
              size={20}
              className='mr-2 cursor-pointer'
              color='#F6BA00'
            />
          </div>

          <div className='py-2 flex items-center justify-between'>
            <div className='flex'>
              <h5 className={`${styles.productDiscountPrice}`}>
                {data.discountPrice}$
              </h5>
              <h4 className={`${styles.price}`}>
                {data.originalPrice === data.discountPrice
                  ? null
                  : data.originalPrice + ' $'}
              </h4>
            </div>
            <span className='font-[400] text-[17px] text-[#68d284]'>
              {data.soldOut} sold
            </span>
          </div>
        </Link>

        {/* side options */}
        <div>
          {click ? (
            <AiFillHeart
              size={22}
              className='cursor-pointer absolute right-2 top-5'
              onClick={() => setClick(!click)}
              color={click ? 'red' : '#333'}
              title='Remove from wishlist'
            />
          ) : (
            <AiOutlineHeart
              size={22}
              className='cursor-pointer absolute right-2 top-5'
              onClick={() => setClick(!click)}
              color={click ? 'red' : '#333'}
              title='Add to wishlist'
            />
          )}
          <AiOutlineEye
            size={22}
            className='cursor-pointer absolute right-2 top-14'
            onClick={() => setOpen(!open)}
            color='#333'
            title='Quick view'
          />
          {data?.numberInStock === 0 ? null : (
            <AiOutlineShoppingCart
              size={25}
              className='cursor-pointer absolute right-2 top-24'
              onClick={() => handleAddToCart()}
              color='#444'
              title='Add to cart'
            />
          )}

          <div className={`bg-[#fff] ${open ? 'block' : 'hidden'}`}>
            <ProductDetailsCard setOpen={setOpen} data={data} />
          </div>
          {/* {open ?  : null} */}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
