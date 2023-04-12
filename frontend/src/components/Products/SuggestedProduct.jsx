import React, { useEffect } from 'react';
import styles from '../../styles/styles';
import ProductCard from '../Route/ProductCard/ProductCard';
import { useFilteredProducts } from '../../hooks/useProducts';
import Loader from '../Layout/Loader';

const SuggestedProduct = ({ data }) => {
  const {
    data: dataResponse,
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = useFilteredProducts('products/filter-by/any', {
    field: 'category',
    keyword: data?.category,
    qty: 5,
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div>
      {isSuccess ? (
        <div className={`p-4 ${styles.section}`}>
          <h2
            className={`${styles.heading} text-[25px] font-[500] border-b mb-5`}
          >
            Related Product
          </h2>
          <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12'>
            {dataResponse &&
              dataResponse.products.map((item) => (
                <ProductCard data={item} key={item._id} />
              ))}
          </div>
        </div>
      ) : null}
      {isLoading && <Loader />}
      {isError && (
        <div className='my-4 text-red-600 text-2xl'>Network Error</div>
      )}
    </div>
  );
};

export default SuggestedProduct;
