import { Label, TextInput } from 'flowbite-react';
import TopupInfo from '../components/app/Topup/TopupInfo';
import { useState } from 'react';

const TopUpPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [total, setTotal] = useState(0);

  const updateTotal = (event) => {
    const value = event.target.value;
    setInputValue(value);
    const parsedValue = parseInt(value, 10);
    if (!isNaN(parsedValue)) {
      setTotal(parsedValue * 20000);
    } else {
      setTotal(0);
    }
  };

  const formatIDR = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(number);
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
        </div>
      </div>
    </div>
  );
};

export default TopUpPage;
