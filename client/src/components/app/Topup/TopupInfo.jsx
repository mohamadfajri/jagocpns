const TopupInfo = () => {
  return (
    <section className='my-8 space-y-2'>
      <h1 className='text-xl font-medium'>Informasi</h1>
      <ul>
        <li>- Metode Pembayaran saat ini hanya tersedia QRIS</li>
        <li>- Jumlah pembayaran adalah {'(input x 20.000) + kode unik'}</li>
        <li>- Kode Unik Muncul pada invoice</li>
        <li>
          - Contoh saya akan topup sebanyak Rp 40.000 maka saya memasukan angka
          2 ke input dan misal uniknya adalah 124 maka saya harus membayar Rp
          40.124
        </li>
      </ul>
    </section>
  );
};

export default TopupInfo;
