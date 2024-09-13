import { Tabs } from 'flowbite-react';
import qris from '../../../assets/images/qris.jpg';
import tf from '../../../assets/images/tf.png';
import { useTopup } from '../../../stores/useTopup';
import { useAlert } from '../../../stores/useAlert';

const CaraTopup = () => {
  const { method } = useTopup();
  const { setAlert } = useAlert();

  const handleCopy = () => {
    navigator.clipboard.writeText('4230742559').then(() => {
      setAlert({
        title: 'Copied',
        message: 'no rek disalin',
        color: 'success',
      });
    });
  };

  return (
    <>
      <div className='overflow-x-auto p-2'>
        <Tabs aria-label='Tabs with underline' variant='underline'>
          <Tabs.Item active={method === 'qris'} title='QRIS'>
            <img className='w-96' src={qris} alt='qris' />

            {/* <div className='my-6 text-sm'>
              <h1 className='font-medium'>Cara Pembayaran :</h1>
              <ul>
                <li>
                  <p>
                    1. Buka aplikasi mobile-banking, OVO, Gojek, Dana, Link Aja
                    Atau Lainnya.
                  </p>
                </li>
                <li>
                  <p>
                    2. Pilih opsi bayar lalu unggah screenshoot/scan QR Code
                    melalui menu di kanan atas.
                  </p>
                </li>
                <li>
                  <p>
                    3. Input jumlah nominal sesuai dengan nominal total pada
                    invoice.
                  </p>
                </li>
                <li>
                  <p>4. Lalu klik Bayar.</p>
                </li>
                <li>
                  <p>
                    5. Kemudian Konfirmasi dengan klik{' '}
                    <strong>{"'Saya Sudah Transfer'"}</strong> dan tunggu kami
                    memverifikasi .
                  </p>
                </li>
                <li>
                  <p>
                    6. Apabila status <strong>{"'CHECKING'"}</strong> dan anda
                    ingin membatalkan pesanan silahkan hubungi{' '}
                    <a className='text-blue-500 hover:underline' href='#'>
                      admin
                    </a>
                  </p>
                </li>
              </ul>
            </div> */}
          </Tabs.Item>
          <Tabs.Item active={method === 'tf'} title='Transfer Bank'>
            <div className='flex flex-col items-center'>
              <img className='w-96' src={tf} alt='transfer bank' />
              <button
                className='flex space-x-2 p-2 m-2 rounded-md bg-gray-200'
                onClick={handleCopy}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='size-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75'
                  />
                </svg>
                Salin Nomer Rekening
              </button>
            </div>
          </Tabs.Item>
        </Tabs>
      </div>
    </>
  );
};

export default CaraTopup;
