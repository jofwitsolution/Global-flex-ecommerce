import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../../styles/styles';
import ProductCard from '../ProductCard/ProductCard';
import { useFilteredProducts } from '../../../hooks/useProducts';
import { setBestDeals } from '../../../redux/actions/product';
import Loader from '../../Layout/Loader';

const BestDeals = () => {
  const dispatch = useDispatch();
  const { bestDeals } = useSelector((state) => state.products);

  const { data, isLoading, isError, error, isSuccess, refetch } =
    useFilteredProducts('products/filter-by/best-deals', {});

  useEffect(() => {
    if (isSuccess) {
      dispatch(setBestDeals(data?.products));
    }

    refetch();
  }, [data, isSuccess, dispatch, refetch]);

  return (
    <div className='mt-[30px] sm:mt-0'>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Best Deals</h1>
        </div>
        {isLoading ? (
          <Loader />
        ) : isSuccess ? (
          <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0'>
            {bestDeals?.map((item) => (
              <ProductCard data={item} key={item._id} />
            ))}
          </div>
        ) : isError ? (
          <div className='my-4 text-red-600 text-2xl'>{error?.message}</div>
        ) : null}
      </div>
    </div>
  );
};

export default BestDeals;
