// eslint-disable-next-line react/prop-types
const TestiCard = ({ heading, subheading, desc, imageUrl }) => {
  return (
    <div className='sm:w-full w-[90%] sm:max-w-sm h-[32rem] bg-white shadow-md m-4 border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700'>
      <div className='flex flex-col items-center pb-10'>
        <img
          className='w-24 h-24 mb-3 rounded-full shadow-sm m-6'
          src={imageUrl}
          alt='Bonnie image'
        />
        <h5 className='mb-1 text-xl font-medium text-gray-900 dark:text-white'>
          {heading}
        </h5>
        <span className='text-sm text-gray-500 dark:text-gray-400'>
          {subheading}
        </span>
        <div className='mt-4 md:mt-6 px-4 text-center dark:text-white'>
          <p>{desc}</p>
        </div>
      </div>
    </div>
  );
};

export default TestiCard;
