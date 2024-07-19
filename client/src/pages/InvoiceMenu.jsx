/* eslint-disable react/prop-types */
import { Button, FileInput, Label } from 'flowbite-react';
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

  const handleFile = (e) => {
    const file = e.target.files[0];
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
      <form onSubmit={createVerification}>
        <CaraTopup />
        <div className='mb-2'>
          <div>
            <Label htmlFor='bukti' value='Upload Bukti Transfer' />
          </div>
          <FileInput
            disabled={loading}
            ref={fileInputRef}
            id='bukti'
            sizing='sm'
            onChange={handleFile}
          />
        </div>
        <div className='border rounded-lg p-2 w-fit text-white bg-green-400 my-2'>
          <h1>Status : {status.toUpperCase()}</h1>
        </div>

        <div className='flex justify-center space-x-2'>
          <Button
            disabled={loading}
            type='button'
            onClick={handleCancel}
            size='sm'
            color='failure'
          >
            Batalkan Topup
          </Button>
          <Button disabled={loading} type='submit' size='sm' color='success'>
            Saya Sudah Transfer
          </Button>
        </div>
      </form>
    </section>
  );
};

export default InvoiceMenu;
