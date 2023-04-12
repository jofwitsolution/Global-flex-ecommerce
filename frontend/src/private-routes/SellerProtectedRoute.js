import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Layout/Loader';

const SellerProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isLoading, isSeller } = useSelector((state) => state.seller);

  useEffect(() => {
    if (!isSeller) {
      navigate(`/shop-login`);
    }
  }, [isLoading, navigate, isSeller]);

  return <>{isSeller ? children : <Loader />}</>;
};

export default SellerProtectedRoute;
