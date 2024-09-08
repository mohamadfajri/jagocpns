import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetcher } from '../utils/fetcher';
import logo from '../assets/images/logo-extend-black.png';

const LinkList = () => {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const getLinks = async () => {
      const { data } = await fetcher.get('/public/links');
      setLinks(data);
    };
    getLinks();
  }, []);

  return (
    <div className='flex flex-col items-center justify-between py-6 min-h-screen'>
      <div className='bg-white rounded-xl py-8 max-w-xl w-full'>
        <div className='w-full flex flex-col items-center mb-6'>
          <img src={logo} alt='logo' className='w-36' />
          <h1 className='text-2xl font-semibold mt-4'>
            Let{"'"}s get in touch!
          </h1>
        </div>
        <ul className='space-y-3 px-6'>
          {links.map((item, index) => (
            <li key={index}>
              <Link
                to={item.url}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center text-center text-lg justify-center px-4 py-3 border border-gray-300 rounded-lg text-gray-800 hover:bg-gray-200 transition duration-150 ease-in-out'
              >
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className='w-6 h-6 mr-3'
                  />
                )}
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <footer className='mt-6 text-sm text-gray-600'>
        &copy; jagocpns.id 2024
      </footer>
    </div>
  );
};

export default LinkList;
