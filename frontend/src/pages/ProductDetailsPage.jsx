import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../components/Layout/Footer';
import Header from '../components/Layout/Header';
import ProductDetails from '../components/Products/ProductDetails';
import SuggestedProduct from '../components/Products/SuggestedProduct';
import { useProduct } from '../hooks/useProducts';
import Loader from '../components/Layout/Loader';

const ProductDetailsPage = () => {
  const { productUrl } = useParams();

  const { data, isLoading, isError, isSuccess, refetch } = useProduct(
    'products/product',
    productUrl
  );

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productUrl]);

  return (
    <div>
      <Header />
      {isLoading ? (
        <Loader />
      ) : isSuccess ? (
        <>
          <ProductDetails data={data?.product ? data.product : null} />
          <SuggestedProduct data={data?.product ? data.product : null} />
        </>
      ) : isError ? (
        <div className='my-4 text-red-600 text-2xl'>Network Error</div>
      ) : null}

      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
