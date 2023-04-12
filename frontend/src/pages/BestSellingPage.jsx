import React, { useEffect } from 'react';
import Header from '../components/Layout/Header';
import ProductCard from '../components/Route/ProductCard/ProductCard';
import styles from '../styles/styles';
import { useFilteredProducts } from '../hooks/useProducts';
import Loader from '../components/Layout/Loader';
import Footer from '../components/Layout/Footer';

const BestSellingPage = () => {
  const { data, isLoading, isError, error, isSuccess, refetch } =
    useFilteredProducts('products/filter-by/best-selling', {
      page: 1,
      pageSize: 15,
    });

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div>
      <Header activeHeading={2} />
      <br />
      <br />
      <div className={`${styles.section}`}>
        {isLoading ? (
          <Loader />
        ) : isSuccess ? (
          <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12'>
            {data?.products?.map((item) => (
              <ProductCard data={item} key={item._id} />
            ))}
          </div>
        ) : isError ? (
          <div className='my-4 text-red-600 text-2xl'>{error?.message}</div>
        ) : null}
      </div>
      <Footer />
    </div>
  );
};

export default BestSellingPage;
