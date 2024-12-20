import { useEffect, useState } from 'react';
import NewsList from './NewsList';
import { fetcher } from '../../../utils/fetcher';
import { Spinner } from 'flowbite-react';

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
  const [loading, setLoading] = useState(false);

  const countdownTo = () => {
    const now = new Date();
    const targetDate = new Date('2024-10-16T00:00:00');

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
      try {
        setLoading(true);
        const { data } = await fetcher.get('/user/summary');
        setData(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
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
                {loading ? <Spinner /> : formatIDR(data.balance)}
              </h2>
            </div>
          </li>
          <li>
            <div className='m-4 p-4 border rounded-lg text-center'>
              <h1 className='text-xs'>Paket Tryout Saya</h1>
              <h2 className='text-2xl font-semibold'>
                {loading ? <Spinner /> : data.myOwnTryouts}
              </h2>
            </div>
          </li>
          <li>
            <div className='m-4 p-4 border rounded-lg text-center'>
              <h1 className='text-xs'>Jumlah User Terdaftar</h1>
              <h2 className='text-2xl font-semibold'>
                {loading ? <Spinner /> : data.totalUser}
              </h2>
            </div>
          </li>
        </ul>
      </div>
      <div className='w-full sm:w-2/3 mt-4 sm:mt-0'>
        <div className='border rounded-lg p-2'>
          <h1 className='text-2xl font-semibold m-4'>Berita Terbaru</h1>
          <ul className='overflow-y-auto max-h-72'>
            <li className='my-2 mx-4 p-2 rounded-lg border'>
              <NewsList
                title={`Tryout Premium 06`}
                desc={`Tryout Premium 06 Dilaksanakan Pada Tanggal 10-13 Oktober 2024 /enter
Tata Cara: /enter
1. Isi Saldo Terlebih Dahulu Di Menu Topup Saldo /enter
2. Beli Tryout Di Menu Beli Tryout /enter
#TryOutGaperluMahal`}
              />
            </li>
            <li className='my-2 mx-4 p-2 rounded-lg border'>
              <NewsList
                title={`Sisa ${day} Hari Lagi Menuju Tes CPNS`}
                desc={
                  'Test SKD CPNS DILAKSANAKAN Serentak pada tanggal 16 Oktober - 14 November, Latih Terus Kemampuanmu Di TryOut Jagocpns.id John F. Kennedy "Usaha dan keberanian tidak akan pernah cukup tanpa arah dan tujuan perencanaan". "Tidak ada kesuksesan tanpa kerja keras"'
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
