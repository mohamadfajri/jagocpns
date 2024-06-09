import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../../../stores/useAdmin';

const SignOutAdmin = () => {
  const { removeToken } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    removeToken();
    navigate('/admin/auth/signin');
  }, [removeToken, navigate]);

  return null;
};

export default SignOutAdmin;
