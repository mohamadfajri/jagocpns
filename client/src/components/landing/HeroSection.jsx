import { Link } from 'react-router-dom';
import useAuth from '../../stores/useAuth';
import image from '../../assets/hero.png';

const HeroSection = () => {
  const { token } = useAuth();
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
          {token ? (
            <div>
              <Link
                to={'/app/dashboard'}
                className='inline-flex bg-orange-700 mr-2 items-center justify-center px-5 py-3 text-base font-medium text-center text-white hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800'
              >
                Dashboard
              </Link>
            </div>
          ) : (
            <div>
              <Link
                to={'/auth/signup'}
                className='inline-flex mr-2 items-center bg-orange-700 justify-center px-5 py-3 text-base font-medium text-center text-white hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800'
              >
                Daftar Sekarang
              </Link>
              <Link
                to={'/auth/signin'}
                className='inline-flex bg-yellow-700 text-white items-center justify-center px-5 py-3 text-base font-medium text-center hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800'
              >
                Masuk
              </Link>
            </div>
          )}
        </div>
        <div className='my-6 sm:my-0 lg:mt-0 lg:col-span-5 lg:flex'>
          <img src={image} alt='mockup' />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
