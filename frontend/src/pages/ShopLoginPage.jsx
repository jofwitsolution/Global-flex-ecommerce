import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ShopLogin from '../components/Shop/ShopLogin';

const ShopLoginPage = () => {
  const navigate = useNavigate();
  const { userAuth, sellerAuth, adminAuth } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (userAuth === true || sellerAuth === true || adminAuth === true) {
      if (sellerAuth === true) {
        navigate('/dashboard');
      } else {
        navigate('/profile');
      }
    }
  }, [userAuth, sellerAuth, adminAuth, navigate]);
  return (
    <div>
      <ShopLogin />
    </div>
  );
};

export default ShopLoginPage;
