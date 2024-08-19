import { Tabs } from 'flowbite-react';
import qris from '../../../assets/images/qris.png';

const CaraTopup = () => {
  return (
    <>
      <div className='overflow-x-auto p-2'>
        <Tabs aria-label='Tabs with underline' variant='underline'>
          <Tabs.Item active title='QRIS'>
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
          <Tabs.Item active title='Transfer Bank'>
            <h1 className='text-lg text-center mt-4'>Transfer Bank</h1>
            <div className='my-6 text-sm'>
              <h1>transfer bank :</h1>
              <p>BCA Sri sunanti</p>
              <p>4230742559</p>
            </div>
          </Tabs.Item>
        </Tabs>
      </div>
    </>
  );
};

export default CaraTopup;
