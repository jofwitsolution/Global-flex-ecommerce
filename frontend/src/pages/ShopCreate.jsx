import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ShopCreate from '../components/Shop/ShopCreate';

const ShopCreatePage = () => {
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
      <ShopCreate />
    </div>
  );
};

export default ShopCreatePage;
