import { useEffect, useState } from 'react';
import NewsList from './NewsList';
import { fetcher } from '../../../utils/fetcher';

const NewsSection = () => {
  const formatIDR = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(number);
  };
  const [day, setDay] = useState(0);
  const [data, setData] = useState({});

  const countdownTo = () => {
    // Get the current date and time
    const now = new Date();
    const targetDate = new Date('2024-07-07T00:00:00');

    const diff = targetDate - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days > 0) {
      setDay(days);
    } else {
      setDay(0);
    }
  };

  useEffect(() => {
    countdownTo();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const { data } = await fetcher.get('/user/summary');
      setData(data);
    };
    getData();
  }, []);
  return (
    <div className='flex sm:flex-row flex-col mt-12 p-4 sm:p-0'>
      <div className='sm:w-1/3 w-full'>
        <ul className='border rounded-lg sm:mr-4'>
          <li>
            <div className='m-4 p-4 border rounded-lg text-center'>
              <h1 className='text-xs'>Saldo Saya</h1>
              <h2 className='text-2xl font-semibold'>
                {formatIDR(data.balance)}
              </h2>
            </div>
          </li>
          <li>
            <div className='m-4 p-4 border rounded-lg text-center'>
              <h1 className='text-xs'>Paket Tryout Saya</h1>
              <h2 className='text-2xl font-semibold'>{data.myOwnTryouts}</h2>
            </div>
          </li>
          <li>
            <div className='m-4 p-4 border rounded-lg text-center'>
              <h1 className='text-xs'>Jumlah User Terdaftar</h1>
              <h2 className='text-2xl font-semibold'>{data.totalUser}</h2>
            </div>
          </li>
        </ul>
      </div>
      <div className='w-full sm:w-2/3 mt-4 sm:mt-0'>
        <div className='border rounded-lg p-4'>
          <h1 className='text-2xl font-semibold m-4'>Berita Terbaru</h1>
          <ul>
            <li className='my-2 mx-4 p-2 rounded-lg border'>
              <NewsList
                title={`Sisa ${day} Hari Lagi Menuju Tes CPNS`}
                desc={
                  'Tes Seleksi Kemampuan Dasar CPNS akan diadakan pada tanggal 7 Juli 2024. Persiapkan diri anda dengan mengikuti tryout terbaik untuk keberhasilan tes CPNS anda hanya di JagoCPNS Indonesia.'
                }
              />
            </li>
            <li className='my-2 mx-4 p-2 rounded-lg border'>
              <NewsList
                title={'Kiamat Zombie Telah Tiba'}
                desc={
                  'Kiamat zombie adalah wabah zombie yang bisa terjadi di dunia nyata. Meskipun tidak ada bukti bahwa kiamat zombie bisa terjadi, beberapa penyakit memiliki ciri-ciri zombie.'
                }
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NewsSection;
