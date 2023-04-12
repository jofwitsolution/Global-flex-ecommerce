import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../../styles/styles';
import ProductCard from '../ProductCard/ProductCard';
import { useProducts } from '../../../hooks/useProducts';
import Loader from '../../Layout/Loader';

const FeaturedProduct = () => {
  const { data, isLoading, isError, error, isSuccess, refetch } = useProducts(
    'products',
    {
      page: 1,
      pageSize: 20,
    }
  );

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Featured Products</h1>
        </div>
        {isLoading ? (
          <Loader />
        ) : isSuccess ? (
          <>
            <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-6 border-0'>
              {data?.products?.map((item) => (
                <ProductCard data={item} key={item._id} />
              ))}
            </div>
            <div className='w-full flex justify-center mb-8'>
              <Link
                to='/products'
                className={`${styles.buttonBlue} text-white font-extrabold bg-blue-400 hover:bg-blue-500`}
              >
                View more
              </Link>
            </div>
          </>
        ) : isError ? (
          <div className='my-4 text-red-600 text-2xl'>{error?.message}</div>
        ) : null}
      </div>
    </div>
  );
};

export default FeaturedProduct;
