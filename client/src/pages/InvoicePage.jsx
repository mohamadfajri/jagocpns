import { useEffect } from 'react';
import InvoiceMenu from './InvoiceMenu';
import InvoiceTopup from './InvoiceTopup';
import { fetcher } from '../utils/fetcher';
import { useTopup } from '../stores/useTopup';

const InvoicePage = () => {
  const { setData } = useTopup();
  useEffect(() => {
    const getTransaction = async () => {
      const { data: response } = await fetcher('/user/transaction/data');
      setData(response);
    };
    getTransaction();
  }, [setData]);
  return (
    <div className='p-4 border rounded-lg flex justify-center space-x-8'>
      <InvoiceTopup />
      <InvoiceMenu />
    </div>
  );
};

export default InvoicePage;
