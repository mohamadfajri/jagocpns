const HeroSection = () => {
  return (
    <section className='bg-white dark:bg-gray-900 sm:h-screen flex items-center'>
      <div className='grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12'>
        <div className='mr-auto place-self-center lg:col-span-7'>
          <h1 className='text-yellow-400 max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-yellow-400'>
            Tryout Cpns 2024
          </h1>
          <h1 className='max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white'>
            Tempat Terbaik Persiapan Tryout CPNS 2024
          </h1>
          <a
            href='#'
            className='inline-flex mr-2 items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800'
          >
            Daftar Sekarang
          </a>
          <a
            href='#'
            className='inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800'
          >
            Login
          </a>
        </div>
        <div className='my-6 sm:my-0 lg:mt-0 lg:col-span-5 lg:flex'>
          <img
            src='https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png'
            alt='mockup'
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
