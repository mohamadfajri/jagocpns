import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import SlideContent from './SlideContent';
import { Link } from 'react-router-dom';
import useAuth from '../../../stores/useAuth';

const HiUser = () => {
  const [great, setGreat] = useState('Datang');
  const [nameRes, setNameRes] = useState('User');
  const { profile } = useAuth();

  const times = () => {
    const sekarang = new Date();
    const jam = sekarang.getHours();

    if (jam < 12) {
      setGreat('Pagi');
    } else if (jam < 15) {
      setGreat('Siang');
    } else if (jam < 18) {
      setGreat('Sore');
    } else {
      setGreat('Malam');
    }
  };

  const getName = (sentence) => {
    const words = sentence.split(' ');
    let shortestWord = words[0];

    for (let i = 1; i < words.length; i++) {
      if (words[i].length < shortestWord.length) {
        shortestWord = words[i];
      }
    }
    setNameRes(shortestWord);
  };

  useEffect(() => {
    times();
    getName(profile.name);
  }, [profile]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };

  return (
    <div className='flex flex-col sm:flex-row border rounded-lg'>
      <div className='flex-col m-4 w-1/5 hidden sm:flex'>
        <div className='my-4'>
          <h1 className='text-2xl font-medium'>
            Selamat {great}, {nameRes}.
          </h1>
          <p className='my-2'>Selamat datang di Website JagoCPNS.</p>
        </div>
        <div className='my-8 flex flex-col justify-start'>
          <Link
            to={'/app/mytryouts'}
            className='bg-jago-4 p-2 w-fit mt-1 hover:bg-jago-2 text-sm font-medium text-white rounded-md'
          >
            lihat daftar tryout
          </Link>
        </div>
      </div>
      <div className='border-l slider-container sm:w-4/5 mt-14 sm:mt-0 w-full'>
        <Slider {...settings}>
          <SlideContent
            imageUrl={
              'https://ghcdsezrgytedkcpribk.supabase.co/storage/v1/object/public/information/Selamat_Datang_di_JagoCpns.id_(1).png'
            }
            url={'/free/10'}
          />
          <SlideContent
            url={'/app/dashboard'}
            imageUrl={
              'https://ghcdsezrgytedkcpribk.supabase.co/storage/v1/object/public/information/Selamat_Datang_di_JagoCpns.id_(2).png'
            }
          />{' '}
        </Slider>
      </div>
      <div className='flex flex-col sm:hidden p-6'>
        <h1 className='text-2xl'>
          Selamat {great}, {nameRes}.
        </h1>
        <p className='text-sm'>Selamat datang di dashboard JagoCPNS</p>
        <div className='mt-4'>
          <Link
            to={'/app/mytryouts'}
            className='bg-jago-4 p-2 hover:bg-jago-2 text-sm font-medium text-white rounded-md'
          >
            lihat daftar tryout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HiUser;
