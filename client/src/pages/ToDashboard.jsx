import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ToDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/app/dashboard');
  }, [navigate]);

  return null;
};

export default ToDashboard;
