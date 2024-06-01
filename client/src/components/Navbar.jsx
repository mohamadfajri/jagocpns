import { Link, Outlet } from 'react-router-dom';
import { useState } from 'react';
import logo from '../assets/images/logo-extend.png';

const Navbar = () => {
  const [active, setActive] = useState('home');
  const scrollToFirst = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      setActive('home');
    }
  };

  const scrollToSecond = () => {
    const vh = window.innerHeight;
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: vh,
        behavior: 'smooth',
      });
      setActive('tryout');
    }
  };

  const scrollToThird = () => {
    const vh = window.innerHeight * 2;
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: vh,
        behavior: 'smooth',
      });
      setActive('testimoni');
    }
  };

  const scrollToForth = () => {
    const vh = window.innerHeight * 3;
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: vh,
        behavior: 'smooth',
      });
      setActive('features');
    }
  };

  const scrollToFifth = () => {
    const vh = window.innerHeight / 1;
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: vh,
        behavior: 'smooth',
      });
      setActive('panduan');
    }
  };
  return (
    <>
      <nav className='bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600'>
        <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
          <Link
            to='https://jagocpns.id/'
            className='flex items-center space-x-3 rtl:space-x-reverse'
          >
            <img src={logo} className='h-8' alt='Flowbite Logo' />
          </Link>
          <div className='flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse'>
            <button
              type='button'
              className='hidden sm:block text-white mr-4 bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800'
            >
              Daftar
            </button>
            <button
              type='button'
              className='text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800'
            >
              Masuk
            </button>
            <button
              data-collapse-toggle='navbar-sticky'
              type='button'
              className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
              aria-controls='navbar-sticky'
              aria-expanded='false'
            >
              <span className='sr-only'>Open main menu</span>
              <svg
                className='w-5 h-5'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 17 14'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M1 1h15M1 7h15M1 13h15'
                />
              </svg>
            </button>
          </div>
          <div
            className='items-center justify-between hidden w-full md:flex md:w-auto md:order-1'
            id='navbar-sticky'
          >
            <ul className='flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
              <li>
                <button
                  onClick={scrollToFirst}
                  className={`block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-yellow-700 md:p-0 md:dark:hover:text-yellow-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 
                  ${active === 'home' ? 'text-orange-600' : 'text-gray-900'}`}
                  aria-current='page'
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={scrollToSecond}
                  className={`block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-yellow-700 md:p-0 md:dark:hover:text-yellow-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 
                  ${active === 'tryout' ? 'text-orange-600' : 'text-gray-900'}`}
                >
                  Tryout
                </button>
              </li>
              <li>
                <button
                  onClick={scrollToThird}
                  className={`block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-yellow-700 md:p-0 md:dark:hover:text-yellow-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 
                  ${
                    active === 'testimoni' ? 'text-orange-600' : 'text-gray-900'
                  }`}
                >
                  Testimoni
                </button>
              </li>
              <li>
                <button
                  onClick={scrollToForth}
                  className={`block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-yellow-700 md:p-0 md:dark:hover:text-yellow-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 
                  ${
                    active === 'features' ? 'text-orange-600' : 'text-gray-900'
                  }`}
                >
                  Features
                </button>
              </li>
              <li>
                <button
                  onClick={scrollToFifth}
                  className={`block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-yellow-700 md:p-0 md:dark:hover:text-yellow-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 
                  ${
                    active === 'panduan' ? 'text-orange-600' : 'text-gray-900'
                  }`}
                >
                  Panduan
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
