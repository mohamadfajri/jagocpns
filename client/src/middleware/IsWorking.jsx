import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useCbt } from '../stores/useCbt';

const IsWorking = ({ children }) => {
  const { isWorking } = useCbt();

  useEffect(() => {
    if (isWorking === null) {
      return;
    } else {
      return <Navigate to={`/start-tryout/${isWorking}`} />;
    }
  }, [isWorking]);

  return children;
};

export default IsWorking;
