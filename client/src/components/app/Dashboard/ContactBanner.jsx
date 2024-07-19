import { Banner, Button } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { AiOutlineInstagram, AiOutlineSend } from 'react-icons/ai';

// eslint-disable-next-line react/prop-types
const ContactBanner = () => {
  return (
    <Banner>
      <div className='flex w-full justify-between px-4 pt-2 dark:border-gray-600 dark:bg-gray-700'>
        <div className='mx-auto flex items-center space-x-2'>
          <Link to={'https://www.instagram.com/jagocpns.id/'}>
            <Button className='flex items-center' color={'success'}>
              <AiOutlineInstagram className='mr-2 h-5 w-5' />
              jagocpns.id
            </Button>
          </Link>
          <Link to={'https://t.me/jagocpnsindonesia'}>
            <Button className='flex items-center' color={'success'}>
              <AiOutlineSend className='mr-2 h-5 w-5' />
              jagocpns
            </Button>
          </Link>
        </div>
      </div>
    </Banner>
  );
};

export default ContactBanner;
