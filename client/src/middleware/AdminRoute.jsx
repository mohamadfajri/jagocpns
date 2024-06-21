import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAdmin } from '../stores/useAdmin';

// eslint-disable-next-line react/prop-types
const AdminRoute = ({ children }) => {
  const { token, expired } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenExpiration = () => {
      if (token && expired) {
        const currentTime = new Date().getTime();
        if (currentTime > expired) {
          navigate('/admin/auth/signin');
        }
      }
    };

    checkTokenExpiration();
  }, [token, expired, navigate]);

  if (!token) {
    return <Navigate to='/admin/auth/signin' />;
  }
  return children;
};

export default AdminRoute;
