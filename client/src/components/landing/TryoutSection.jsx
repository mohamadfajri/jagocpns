import TryoutCards from './TryoutCards';

const TryoutSection = () => {
  return (
    <section className='h-screen flex flex-col justify-center items-center bg-white dark:bg-gray-900'>
      <div className='text-center dark:text-white'>
        <h1 className='sm:text-4xl font-semibold'>Tryout</h1>
        <h2 className='sm:text-xl mt-4'>
          Ikuti tryout gratis & Premium setiap minggu serentak bersama peserta
          di seluruh Indonesia
        </h2>
      </div>
      <div className='p-4 max-w-screen-xl '>
        <div className='grid grid-cols-2 sm:grid-cols-3 sm:gap-12 gap-4'>
          <TryoutCards title={'Tryout Gratis'} />
          <TryoutCards title={'Tryout Gratis'} />
          <TryoutCards title={'Tryout Gratis'} />
          <TryoutCards title={'Tryout Premium'} />
          <TryoutCards title={'Tryout Premium'} />
          <TryoutCards title={'Tryout Premium'} />
        </div>
      </div>
    </section>
  );
};

export default TryoutSection;
