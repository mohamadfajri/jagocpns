import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetcher } from '../utils/fetcher';
import logo from '../assets/images/logo-extend-black.png';

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
    <div className='flex flex-col items-center justify-between py-6 min-h-screen'>
      <div className='bg-white rounded-lg py-6 max-w-sm w-full'>
        <div className='w-full flex flex-col items-center my-8'>
          <img src={logo} alt='logo' className='w-40' />
          <h1 className='text-lg font-medium'>Let{"'"}s get in touch!</h1>
        </div>
        <ul className='space-y-4'>
          {links.map((item, index) => (
            <li key={index}>
              <Link
                to={item.url}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center text-lg justify-center px-2 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100'
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
      <footer>&copy;jagocpns.id 2024</footer>
    </div>
  );
};

export default LinkList;
