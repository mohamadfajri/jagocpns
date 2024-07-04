import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetcher } from '../utils/fetcher';

const LinkList = () => {
  const [links, setlinks] = useState([{}]);

  useEffect(() => {
    const getLinks = async () => {
      const { data } = await fetcher.get('/public/links');
      setlinks(data);
    };
    getLinks();
  }, []);
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white shadow-lg rounded-lg p-6 max-w-sm w-full'>
        <h1 className='text-2xl font-bold mb-6 text-center'>My Links</h1>
        <ul className='space-y-4'>
          {links.map((item, index) => (
            <li key={index}>
              <Link
                to={item.url}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100'
              >
                <img
                  src={item.imageUrl}
                  alt='Instagram'
                  className='w-6 h-6 mr-2'
                />
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LinkList;
