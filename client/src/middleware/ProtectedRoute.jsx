import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useAuth from '../stores/useAuth';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const { token, expired } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenExpiration = () => {
      if (token && expired) {
        const currentTime = new Date().getTime();
        if (currentTime > expired) {
          navigate('/auth/signin');
        }
      }
    };

    checkTokenExpiration();
  }, [token, expired, navigate]);

  if (!token) {
    return <Navigate to='/auth/signin' />;
  }
  return children;
};

export default ProtectedRoute;
