import TopupInfo from '../components/app/Topup/TopupInfo';
import { useState, useEffect } from 'react';
import { useTopup } from '../stores/useTopup';
import { fetcher } from '../utils/fetcher';
import { useAlert } from '../stores/useAlert';

const TopUpPage = () => {
  const [total, setTotal] = useState(0);
  const [balance, setBalance] = useState(0);
  const { set, setMethodState } = useTopup();
  const { setAlert } = useAlert();
  const [next, setNext] = useState(false);
  const [method, setMethod] = useState('');

  useEffect(() => {
    const getBalance = async () => {
      try {
        const { data } = await fetcher.get('/user/summary');
        setBalance(data.balance);
      } catch (error) {
        console.error(error);
      }
    };
    getBalance();
  }, []);

  const handleChoose = (val) => {
    setTotal(val);
  };

  const handleMethod = (val) => {
    setMethod(val);
    setMethodState(val);
  };

  const formatIDR = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(number);
  };

  const handleNext = () => {
    setNext(true);
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
    <>
      <div className='p-4 border rounded-lg'>
        <TopupInfo />
      </div>
      <div className='flex justify-between my-6 w-full sm:w-1/2 border-b border-black py-4'>
        <h1 className='text-sm'>Saldo saat ini</h1>
        <h1 className='text-3xl font-bold'>{formatIDR(balance)}</h1>
      </div>
      <div>
        <h1 className='text-sm'>Jumlah Top Up</h1>
      </div>
      <div className='sm:w-1/2 w-full flex flex-col items-center border-b border-black py-4'>
        <ul className='grid grid-cols-3 gap-4 sm:text-2xl font-semibold'>
          <li>
            <button
              onClick={() => handleChoose(20000)}
              className={`sm:w-64 w-24 py-6 rounded-xl ${
                total === 20000 ? 'bg-[#FFCB01]' : 'bg-[#EDEDED]'
              } hover:bg-[#FFCB01]`}
            >
              20.000
            </button>
          </li>
          <li>
            <button
              onClick={() => handleChoose(40000)}
              className={`sm:w-64 w-24 py-6 rounded-xl ${
                total === 40000 ? 'bg-[#FFCB01]' : 'bg-[#EDEDED]'
              } hover:bg-[#FFCB01]`}
            >
              40.000
            </button>
          </li>
          <li>
            <button
              onClick={() => handleChoose(60000)}
              className={`sm:w-64 w-24 py-6 rounded-xl ${
                total === 60000 ? 'bg-[#FFCB01]' : 'bg-[#EDEDED]'
              } hover:bg-[#FFCB01]`}
            >
              60.000
            </button>
          </li>
          <li>
            <button
              onClick={() => handleChoose(80000)}
              className={`sm:w-64 w-24 py-6 rounded-xl ${
                total === 80000 ? 'bg-[#FFCB01]' : 'bg-[#EDEDED]'
              } hover:bg-[#FFCB01]`}
            >
              80.000
            </button>
          </li>
          <li>
            <button
              onClick={() => handleChoose(100000)}
              className={`sm:w-64 w-24 py-6 rounded-xl ${
                total === 100000 ? 'bg-[#FFCB01]' : 'bg-[#EDEDED]'
              } hover:bg-[#FFCB01]`}
            >
              100.000
            </button>
          </li>
          <li>
            <button
              onClick={() => handleChoose(120000)}
              className={`sm:w-64 w-24 py-6 rounded-xl ${
                total === 120000 ? 'bg-[#FFCB01]' : 'bg-[#EDEDED]'
              } hover:bg-[#FFCB01]`}
            >
              120.000
            </button>
          </li>
        </ul>
      </div>
      {!next && (
        <div className='w-full my-4'>
          <button
            disabled={total === 0}
            onClick={handleNext}
            className='bg-[#00A337] hover:bg-[#047a2b] disabled:bg-[#cac8c8] rounded-xl text-white sm:w-1/2 w-full py-2 text-2xl font-bold'
          >
            Lanjut
          </button>
        </div>
      )}
      {next && (
        <div>
          <div className='py-4'>
            <h1 className='text-sm'>Metode Pembayaran</h1>
          </div>
          <div className='sm:w-1/2 w-full flex flex-col items-center'>
            <ul className='grid grid-cols-2 gap-4 sm:text-xl font-semibold'>
              <li>
                <button
                  onClick={() => handleMethod('qris')}
                  className={`sm:w-96 w-40 py-4 rounded-xl ${
                    method === 'qris' ? 'bg-[#FFCB01]' : 'bg-[#EDEDED]'
                  } hover:bg-[#FFCB01]`}
                >
                  QRIS
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleMethod('tf')}
                  className={`sm:w-96 w-40 py-4 rounded-xl ${
                    method === 'tf' ? 'bg-[#FFCB01]' : 'bg-[#EDEDED]'
                  } hover:bg-[#FFCB01]`}
                >
                  Transfer Bank
                </button>
              </li>
            </ul>
          </div>
          <div className='w-full my-4'>
            <button
              disabled={method === ''}
              onClick={createTransaction}
              className='bg-[#00A337] hover:bg-[#047a2b] disabled:bg-[#cac8c8] rounded-xl text-white sm:w-1/2 w-full py-2 text-2xl font-bold'
            >
              Top Up
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TopUpPage;
