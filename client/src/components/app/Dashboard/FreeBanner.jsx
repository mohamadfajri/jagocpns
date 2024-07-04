import { Banner, Button } from 'flowbite-react';
import { HiX } from 'react-icons/hi';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const FreeBanner = ({ url }) => {
  return (
    <Banner>
      <div className='flex w-full justify-between border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700 my-5'>
        <div className='mx-auto flex items-center'>
          <p className='flex items-center text-sm font-normal space-x-2 text-gray-500 dark:text-gray-400'>
            <strong className='font-semibold text-red-700'>Free!</strong>
            <span className='[&_p]:inline flex items-center'>
              Ingin coba tryout di JagoCPNS GRATIS ?
            </span>
            <Link to={url}>
              <Button color={'failure'} size={'xs'}>
                {' '}
                Klik Disini!
              </Button>
            </Link>
          </p>
        </div>
        <Banner.CollapseButton
          color='gray'
          className='border-0 bg-transparent text-gray-500 dark:text-gray-400'
        >
          <HiX className='h-4 w-4' />
        </Banner.CollapseButton>
      </div>
    </Banner>
  );
};

export default FreeBanner;
