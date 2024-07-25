import logo from '../../assets/images/logo-extend.png';

const FooterSection = () => {
  const year = new Date().getFullYear();
  return (
    <div className='bg-[#1A1A49] px-6 dark:bg-gray-900'>
      <footer className='bg-[#1A1A49] dark:bg-gray-900'>
        <div className='w-full max-w-screen-xl mx-auto p-4 md:py-8'>
          <div className='sm:flex sm:items-center sm:justify-between'>
            <a
              href='https://jagocpns.id/'
              className='flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse'
            >
              <img src={logo} className='h-10' alt='Flowbite Logo' />
            </a>
            <ul className='flex flex-wrap items-center mb-6 text-sm font-medium text-white sm:mb-0 dark:text-gray-400'>
              <li>
                <a href='#' className='hover:underline me-4 md:me-6'>
                  Information
                </a>
              </li>
              <li>
                <a href='#' className='hover:underline me-4 md:me-6'>
                  F.A.Q
                </a>
              </li>
              <li>
                <a href='#' className='hover:underline'>
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <hr className='my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8' />
          <span className='block text-sm text-white sm:text-center dark:text-gray-400'>
            © {year}{' '}
            <a href='https://jagocpns.id/' className='hover:underline'>
              JagoCPNS
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </div>
  );
};

export default FooterSection;
