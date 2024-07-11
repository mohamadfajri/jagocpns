const TopupInfo = () => {
  return (
    <section className='my-8 space-y-2'>
      <h1 className='text-xl font-medium'>Informasi</h1>
      <ul>
        <li>- Metode Pembayaran Tersedia QRIS dan Transfer Bank</li>
        <li>- Jumlah pembayaran adalah {'(input x 20.000) + kode unik'}</li>
        <li>- Kode Unik Muncul pada invoice</li>
        <li className='text-red-500'>
          - Contoh saya akan topup sebanyak <strong>Rp 40.000</strong> maka saya
          memasukan angka <strong>2</strong> ke input dan misal uniknya adalah
          124 maka saya harus membayar <strong>Rp 40.124</strong>
        </li>
        <li>
          - Support Untuk Transfer Semua Bank Dan E Wallet
          {'(Dana,Gopay,Shopepay,dll)'}
        </li>
      </ul>
    </section>
  );
};

export default TopupInfo;
