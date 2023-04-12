import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  const { loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (loading === false) {
      if (!isAuthenticated) {
        navigate('/login');
      }
    }
  }, [loading, isAuthenticated, navigate]);

  return <>{isAuthenticated ? children : <div></div>}</>;
};

export default ProtectedRoute;
