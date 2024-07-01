import { useEffect } from 'react';
import { useTopup } from '../stores/useTopup';
import { fetcher } from '../utils/fetcher';
import InvoicePage from './InvoicePage';
import TopUpPage from './TopUpPage';

const TopUpMenu = () => {
  const { isCheckout, set } = useTopup();

  useEffect(() => {
    const getStatus = async () => {
      const { data } = await fetcher('/user/transaction');
      set(data.status);
    };
    getStatus();
  }, [set]);
  return <>{isCheckout ? <InvoicePage /> : <TopUpPage />}</>;
};

export default TopUpMenu;
