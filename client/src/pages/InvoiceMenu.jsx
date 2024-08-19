/* eslint-disable react/prop-types */
import { Button } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import { fetcher } from '../utils/fetcher';
import { useAlert } from '../stores/useAlert';
import { useTopup } from '../stores/useTopup';
import CaraTopup from '../components/app/Topup/CaraTopup';

const InvoiceMenu = () => {
  const fileInputRef = useRef(null);
  const { setAlert } = useAlert();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { set } = useTopup();
  const [status, setStatus] = useState('unpaid');
  const [fileName, setFileName] = useState('');

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
    setImage(file);
  };

  useEffect(() => {
    const getStatus = async () => {
      setLoading(true);
      const { data } = await fetcher.get('/user/transaction');
      if (data.transaction === 'checking') {
        setLoading(true);
        setStatus(data.transaction);
      } else {
        setLoading(false);
      }
    };
    getStatus();
  }, []);

  const createVerification = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);

    const getStatus = async () => {
      setLoading(true);
      const { data } = await fetcher.get('/user/transaction');
      if (data.transaction === 'checking') {
        setLoading(true);
        setStatus(data.transaction);
      } else {
        setLoading(false);
      }
    };

    try {
      setLoading(true);
      const { data } = await fetcher.post(
        '/user/transaction/verify',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      getStatus();
      setAlert({ title: 'Info!', message: data.message, color: 'success' });
    } catch (error) {
      setAlert({
        title: 'Info!',
        message: error.response?.data?.message || 'An error occurred',
        color: 'failure',
      });
      setLoading(false);
    }
  };

  const trimString = (str) => {
    if (str.length > 20) {
      return str.slice(0, 20) + '...';
    }
    return str;
  };

  const handleCancel = async () => {
    try {
      setLoading(true);
      const { data } = await fetcher.delete('/user/transaction');
      setAlert({ title: 'Success', message: data.message, color: 'success' });
      set(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setAlert({
        title: 'Gagal',
        message: error.response.data.message,
        color: 'failure',
      });
    }
  };

  return (
    <section className='p-4 border rounded-lg h-fit'>
      <CaraTopup />
      <form className='my-4' onSubmit={createVerification}>
        <div className='mb-2'>
          <div>
            <input
              type='file'
              id='bukti'
              disabled={loading}
              onChange={handleFile}
              ref={fileInputRef}
              className='hidden'
            />
            <label
              htmlFor='bukti'
              className='flex flex-col items-center w-full py-2 px-4 text-center text-sm bg-[#EDEDED] border border-gray-300 rounded-md cursor-pointer'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-10'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5'
                />
              </svg>
              Upload Bukti Pembayaran
              {fileName && (
                <p className='mt-2 text-center text-gray-700'>
                  {trimString(fileName)}
                </p>
              )}
            </label>
          </div>
        </div>
        <div className='border rounded-lg px-2 py-6 w-full text-center text-2xl font-bold text-white bg-green-400 my-2'>
          <h1>Status : {status.toUpperCase()}</h1>
        </div>

        <div className='flex flex-col space-y-1 my-4'>
          <Button
            disabled={loading}
            type='submit'
            size='sm'
            className='bg-[#00A337]'
          >
            Konfirmasi Pembayaran
          </Button>
          <Button
            disabled={loading}
            type='button'
            onClick={handleCancel}
            size='sm'
            className='bg-[#EDEDED] text-red-600'
          >
            Batalkan
          </Button>
        </div>
      </form>
    </section>
  );
};

export default InvoiceMenu;
