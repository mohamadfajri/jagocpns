import info from '../../../assets/images/info-topup.png';
import hp from '../../../assets/images/topup-hp.png';

const TopupInfo = () => {
  return (
    <section className='my-2'>
      <img
        className='h-auto w-3/4 hidden sm:block'
        src={info}
        alt='infotopup'
      />
      <img src={hp} className='sm:hidden' alt='infotopup' />
      {/* <h1 className='text-xl font-medium'>Informasi</h1>
      <ul>
        <li>- Metode Pembayaran Tersedia QRIS dan Transfer Bank</li>
        <li>- Pilih Nominal Top Up yang anda inginkan</li>
        <li>- Pilih Metode Pembayaran</li>
        <li>- Kode Unik akan ditampilkan pada halaman invoice</li>
        <li>
          - Support Untuk Transfer Semua Bank Dan E Wallet
          {'(Dana,Gopay,Shopepay,dll)'}
        </li>
      </ul> */}
    </section>
  );
};

export default TopupInfo;
