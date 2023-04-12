import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Login from '../components/Login/Login.jsx';

const LoginPage = () => {
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
      <Login />
    </div>
  );
};

export default LoginPage;
