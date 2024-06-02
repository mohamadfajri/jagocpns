// eslint-disable-next-line react/prop-types
const NewsList = ({ title, desc }) => {
  return (
    <div id='defaultTabContent'>
      <div
        className='p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800'
        id='about'
        role='tabpanel'
        aria-labelledby='about-tab'
      >
        <h2 className='mb-3 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white'>
          {title}
        </h2>
        <p className='mb-3 text-gray-500 dark:text-gray-400'>{desc}</p>
      </div>
    </div>
  );
};

export default NewsList;
