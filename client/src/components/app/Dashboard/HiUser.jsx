import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import SlideContent from './SlideContent';

const HiUser = () => {
  const [great, setGreat] = useState('datang');
  const [name, setName] = useState('');
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
    setName(shortestWord);
  };

  useEffect(() => {
    times();
    getName('User sangat bodoh');
  }, []);

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
    <div className='flex border rounded-lg'>
      <div className='flex flex-col m-4 w-1/5'>
        <div className='my-4'>
          <h1 className='text-2xl font-medium'>Halo {name}</h1>
          <p className='text-sm'>Selamat {great}.</p>
        </div>
        <div className='my-4 flex justify-start'>
          <button className='bg-jago-4 p-2 hover:bg-jago-2 text-sm font-medium text-white rounded-md'>
            lihat daftar tryout
          </button>
        </div>
      </div>
      <div className='border-l slider-container w-4/5'>
        <Slider {...settings}>
          <SlideContent />
          <SlideContent />
          <SlideContent />
        </Slider>
      </div>
    </div>
  );
};

export default HiUser;
