import NewsList from './NewsList';

const NewsSection = () => {
  return (
    <div className='flex mt-12'>
      <div className='w-1/3'>
        <ul className='border rounded-lg mr-4'>
          <li>
            <div className='m-4 p-4 border rounded-lg text-center'>
              <h1 className='text-xs'>Saldo Saya</h1>
              <h2 className='text-2xl font-semibold'>Rp 100.000,00</h2>
            </div>
          </li>
          <li>
            <div className='m-4 p-4 border rounded-lg text-center'>
              <h1 className='text-xs'>Paket Tryout Saya</h1>
              <h2 className='text-2xl font-semibold'>3</h2>
            </div>
          </li>
          <li>
            <div className='m-4 p-4 border rounded-lg text-center'>
              <h1 className='text-xs'>Jumlah User Terdaftar</h1>
              <h2 className='text-2xl font-semibold'>3</h2>
            </div>
          </li>
        </ul>
      </div>
      <div className='w-2/3'>
        <div className='border rounded-lg p-4'>
          <h1 className='text-2xl font-semibold m-4'>Berita Terbaru</h1>
          <ul>
            <li className='my-2 mx-4 p-2 rounded-lg border'>
              <NewsList
                title={'Kiamat Zombie Telah Tiba'}
                desc={
                  'Kiamat zombie adalah wabah zombie yang bisa terjadi di dunia nyata. Meskipun tidak ada bukti bahwa kiamat zombie bisa terjadi, beberapa penyakit memiliki ciri-ciri zombie.'
                }
              />
            </li>
            <li className='my-2 mx-4 p-2 rounded-lg border'>
              <NewsList
                title={'Telur Dinosaurus Berhasil Ditetaskan Oleh Ilmuwan'}
                desc={
                  'Dalam dunia nyata, pernah ada eksperimen rekayasa genetika yang terbukti berhasil menghidupkan kembali hewan yang telah punah. Eksperimen tersebut terjadi pada tahun 2003 terhadap spesies domba gunung yang disebut Celia.'
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
