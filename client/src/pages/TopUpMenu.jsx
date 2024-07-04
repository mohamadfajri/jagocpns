import { useEffect, useState } from 'react';
import { useTopup } from '../stores/useTopup';
import { fetcher } from '../utils/fetcher';
import InvoicePage from './InvoicePage';
import TopUpPage from './TopUpPage';
import LoadingTable from '../components/LoadingTable';

const TopUpMenu = () => {
  const { isCheckout, set } = useTopup();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getStatus = async () => {
      try {
        setIsLoading(true);
        const { data } = await fetcher('/user/transaction');
        set(data.status);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        set(false);
      }
    };
    getStatus();
  }, [set]);
  return (
    <>
      {isLoading ? (
        <LoadingTable />
      ) : isCheckout ? (
        <InvoicePage />
      ) : (
        <TopUpPage />
      )}
    </>
  );
};

export default TopUpMenu;
