import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const TryoutCards = ({ title, imageUrl }) => {
  return (
    <div className='max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
      <Link to='/auth/signup'>
        <img className='rounded-t-lg' src={imageUrl} alt='' />
      </Link>
      <div className='flex justify-center'>
        <div className='flex flex-col items-center p-5'>
          <Link to='/auth/signup'>
            <h5 className='mb-2 font-bold tracking-tight text-gray-900 dark:text-white'>
              {title}
            </h5>
          </Link>
          <Link
            to='/auth/signup'
            className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-orange-700 rounded-lg hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800'
          >
            Daftar
            <svg
              className='rtl:rotate-180 w-3.5 h-3.5 ms-2'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 14 10'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M1 5h12m0 0L9 1m4 4L9 9'
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TryoutCards;
