import { Button } from 'flowbite-react';
import qris from '../assets/images/qris.jpeg';

const InvoiceMenu = () => {
  return (
    <section className='p-4 border rounded-lg h-fit'>
      <h1 className='text-lg text-center mt-4'>QRIS</h1>
      <div className='flex justify-center'>
        <img className='h-64' src={qris} alt='qris' />
      </div>
      <div className='my-6 text-sm'>
        <h1 className='font-medium'>Cara Pembayaran :</h1>
        <ul>
          <li>
            <p>
              1. Buka aplikasi mobile-banking, OVO, Gojek, Dana, Link Aja Atau
              Lainnya.
            </p>
          </li>
          <li>
            <p>
              2. Pilih opsi bayar lalu unggah screenshoot/scan QR Code melalui
              menu di kanan atas.
            </p>
          </li>
          <li>
            <p>
              3. Input jumlah nominal sesuai dengan nominal total pada invoice.
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
        </ul>
      </div>
      <div className='flex justify-center space-x-2'>
        <Button size='sm' color='failure'>
          Batalkan Topup
        </Button>
        <Button size='sm' color='success'>
          Saya Sudah Transfer
        </Button>
      </div>
    </section>
  );
};

export default InvoiceMenu;
