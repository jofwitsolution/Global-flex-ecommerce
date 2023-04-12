import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Footer from '../components/Layout/Footer';
import Header from '../components/Layout/Header';
import ProductCard from '../components/Route/ProductCard/ProductCard';
import styles from '../styles/styles';
import { useSearchProduct } from '../hooks/useProducts';
import Loader from '../components/Layout/Loader';

const CatalogPage = () => {
  const [searchParams] = useSearchParams();
  const searchKeyword = searchParams.get('keyword');

  const { data, isLoading, isError, refetch } = useSearchProduct(
    'products/search',
    {
      keyword: searchKeyword,
      page: 1,
      pageSize: 20,
    }
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div>
      <Header activeHeading={3} />
      <br />
      <br />

      <div className={`${styles.section}`}>
        <>
          {isLoading && <Loader />}
          <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12'>
            {data &&
              data?.products?.map((item) => (
                <ProductCard data={item} key={item._id} />
              ))}
          </div>
        </>

        {isError && (
          <div className='my-4 text-red-600 text-2xl'>Network Error</div>
        )}

        {data?.products && data?.products?.length === 0 ? (
          <h1 className='text-center w-full pb-[100px] text-[20px]'>
            No products Found!
          </h1>
        ) : null}
      </div>
      <Footer />
    </div>
  );
};

export default CatalogPage;
