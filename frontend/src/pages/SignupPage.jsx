import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Signup from '../components/Signup/Signup';

const SignupPage = () => {
  const navigate = useNavigate();
  const { userAuth, sellerAuth, adminAuth } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (userAuth === true || sellerAuth === true || adminAuth === true) {
      navigate('/');
    }
  }, [userAuth, sellerAuth, adminAuth, navigate]);
  return (
    <div>
      <Signup />
    </div>
  );
};

export default SignupPage;
