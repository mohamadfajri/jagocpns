import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../stores/useAuth';

const SignOut = () => {
  const { removeToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    removeToken();
    localStorage.clear();
    navigate('/auth/signin');
  }, [removeToken, navigate]);

  return (
    <main className='flex h-screen justify-center items-center'>
      <h1>Signing out...</h1>
    </main>
  );
};

export default SignOut;
