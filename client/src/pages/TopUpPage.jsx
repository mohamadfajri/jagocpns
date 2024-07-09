import { Button, TextInput } from 'flowbite-react';
import TopupInfo from '../components/app/Topup/TopupInfo';
import { useState } from 'react';
import { useTopup } from '../stores/useTopup';
import { fetcher } from '../utils/fetcher';
import { useAlert } from '../stores/useAlert';

const TopUpPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [total, setTotal] = useState(0);
  const { set } = useTopup();
  const { setAlert } = useAlert();

  const updateTotal = (event) => {
    const value = event.target.value;
    const parsedValue = parseInt(value, 10);

    if (value === '' || (parsedValue >= 1 && parsedValue <= 10)) {
      setInputValue(value);
      if (!isNaN(parsedValue)) {
        setTotal(parsedValue * 20000);
      } else {
        setTotal(0);
      }
    }
  };

  const formatIDR = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(number);
  };

  const createTransaction = async () => {
    try {
      const { data } = await fetcher.post('/user/transaction', {
        amount: total,
      });
      setAlert({ title: 'Info!', message: data.message, color: 'success' });
      set(true);
    } catch (error) {
      setAlert({
        title: 'Error!',
        message: error.response.data.message,
        color: 'failure',
      });
    }
  };

  return (
    <div className='p-4 border rounded-lg'>
      <TopupInfo />
      <div className='p-2 border rounded-lg'>
        <div className='space-y-4'>
          <h1 className='font-medium'>Jumlah Topup</h1>
          <TextInput
            placeholder='Masukan jumlah'
            addon='x20000'
            id='large'
            type='number'
            sizing='lg'
            value={inputValue}
            onChange={updateTotal}
            min={1}
            max={10}
          />
          <h1 className='font-medium'>Topup detail</h1>
          <TextInput
            addon='Admin'
            value={formatIDR(0)}
            type='text'
            id='disabledInput2'
            placeholder='Disabled readonly input'
            readOnly
          />
          <TextInput
            addon='Total'
            value={formatIDR(total)}
            type='text'
            id='disabledInput2'
            placeholder='Disabled readonly input'
            readOnly
          />
          <Button as={'button'} onClick={createTransaction} color='blue'>
            Buat Pesanan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopUpPage;
