import TryoutCards from './TryoutCards';

const TryoutSection = () => {
  return (
    <section className='h-screen flex flex-col justify-center items-center bg-white dark:bg-gray-900'>
      <div className='text-center dark:text-white'>
        <h1 className='text-4xl font-semibold'>Tryout</h1>
        <h2 className='text-2xl mt-4'>Tryout mantap dari JagoCPNS</h2>
      </div>
      <div className='p-4 max-w-screen-xl '>
        <div className='grid grid-cols-2 sm:grid-cols-3 gap-12'>
          <TryoutCards />
          <TryoutCards />
          <TryoutCards />
          <TryoutCards />
          <TryoutCards />
          <TryoutCards />
        </div>
      </div>
    </section>
  );
};

export default TryoutSection;
