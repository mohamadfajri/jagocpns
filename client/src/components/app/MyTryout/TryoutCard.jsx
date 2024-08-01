/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import SplitText from '../../SplitText';

const TryoutCard = ({ title, desc, action, url, imageUrl, price }) => {
  const formatIDR = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(number);
  };
  return (
    <div className='max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
      <a href='#'>
        <img className='rounded-t-lg' src={imageUrl} alt='' />
      </a>
      <div className='p-5'>
        <h5 className='mb-2 sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
          {title}
        </h5>
        <div className='mb-3'>{desc && <SplitText text={desc} />}</div>
        {price && (
          <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
            {formatIDR(price)}
          </p>
        )}
        <Link
          to={url}
          className='inline-flex items-center sm:px-3 sm:py-2 p-2 text-sm font-medium text-center text-white bg-orange-700 rounded-lg hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800'
        >
          {action}
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
  );
};

export default TryoutCard;
