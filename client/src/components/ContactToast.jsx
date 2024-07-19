import { useState, useRef } from 'react';
import { SiTelegram } from 'react-icons/si';
import { SiWhatsapp } from 'react-icons/si';
import { Link } from 'react-router-dom';

const ContactToast = () => {
  const [showBox, setShowBox] = useState(false);
  const [hidden, setHidden] = useState(true);
  const boxRef = useRef(null);

  const clickButton = () => {
    setTimeout(() => {
      setHidden(!hidden);
    }, 50);
    setShowBox(!showBox);
  };

  return (
    <div className='fixed bottom-4 right-4 z-20 text-xs'>
      <button
        onClick={clickButton}
        className='bg-jago-4 text-white p-4 rounded-full shadow-lg focus:outline-none'
      >
        {!showBox ? (
          <div className='flex flex-col items-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='size-9'
            >
              <path
                fillRule='evenodd'
                d='M4.804 21.644A6.707 6.707 0 0 0 6 21.75a6.721 6.721 0 0 0 3.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 0 1-.814 1.686.75.75 0 0 0 .44 1.223ZM8.25 10.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25ZM10.875 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z'
                clipRule='evenodd'
              />
            </svg>
            <h1>Butuh Bantuan?</h1>
          </div>
        ) : (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='size-9'
          >
            <path
              fillRule='evenodd'
              d='M13.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L11.69 12 4.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z'
              clipRule='evenodd'
            />
            <path
              fillRule='evenodd'
              d='M19.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06L17.69 12l-6.97-6.97a.75.75 0 0 1 1.06-1.06l7.5 7.5Z'
              clipRule='evenodd'
            />
          </svg>
        )}
      </button>
      <div
        ref={boxRef}
        className={`absolute bottom-0 right-20 rounded transition-all duration-300 ease-in-out transform ${
          showBox ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
        } ${hidden ? 'hidden' : 'block'}`}
      >
        <div>
          <ul className='space-x-2 flex'>
            <li>
              <Link to={'https://t.me/jagocpnsindonesia'}>
                <button className='bg-orange-700 text-white p-4 rounded-full shadow-lg focus:outline-none'>
                  <SiTelegram size={36} />
                </button>
              </Link>
            </li>
            <li>
              <Link
                to={
                  'https://wa.me/6285171547130?text=Halo%20min%20Jago!.%0ASaya%20butuh%20bantuan%20nih!!'
                }
              >
                <button className='bg-orange-700 text-white p-4 rounded-full shadow-lg focus:outline-none'>
                  <SiWhatsapp size={36} />
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContactToast;
