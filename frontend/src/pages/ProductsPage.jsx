import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Footer from '../components/Layout/Footer';
import Header from '../components/Layout/Header';
import ProductCard from '../components/Route/ProductCard/ProductCard';
import styles from '../styles/styles';
import { useFilteredProducts, useProducts } from '../hooks/useProducts';
import Loader from '../components/Layout/Loader';

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryUrl = searchParams.get('category');
  const [products, setProducts] = useState([]);

  const { data, isLoading, isSuccess, refetch } = useProducts('products', {
    page: 1,
    pageSize: 20,
  });

  const {
    data: dataCategory,
    isLoading: isLoadingCategory,
    isSuccess: isSuccessCategory,
  } = useFilteredProducts('products/category', {
    categoryUrl: categoryUrl,
    page: 1,
    pageSize: 20,
  });

  useEffect(() => {
    if (categoryUrl === null && isSuccess) {
      setProducts(data?.products);
    } else if (categoryUrl && isSuccessCategory) {
      setProducts(dataCategory?.products);
    }

    window.scrollTo(0, 0);
  }, [categoryUrl, isSuccess, data, isSuccessCategory, dataCategory]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div>
      <Header activeHeading={3} />
      <br />
      <br />

      <div className={`${styles.section}`}>
        {categoryUrl ? (
          <>
            {isLoadingCategory && <Loader />}
            <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12'>
              {products &&
                products.map((item) => (
                  <ProductCard data={item} key={item._id} />
                ))}
            </div>
          </>
        ) : (
          <>
            {isLoading && <Loader />}
            <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12'>
              {products &&
                products.map((item) => (
                  <ProductCard data={item} key={item._id} />
                ))}
            </div>
          </>
        )}

        {products && products.length === 0 ? (
          <h1 className='text-center w-full pb-[100px] text-[20px]'>
            No products Found!
          </h1>
        ) : null}
      </div>
      <Footer />
    </div>
  );
};

export default ProductsPage;
