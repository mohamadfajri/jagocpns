import Slider from 'react-slick';
import TestiCard from './TestiCard';

const TestiSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    arrows: false,
  };

  const settingsPhone = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const datas = [
    {
      id: 1,
      name: 'PUTRI AULIA SALSABILA',
      sub: 'Lulus CPNS Mahkamah Agung 2023 ',
      desc: 'TIDAK MENYANGKA! Soal-soal latihan dan tryout di website ini sangat mirip dengan soal tes yang sebenarnya. Meskipun soalnya berbeda, konsepnya sudah jelas sehingga memudahkan pemahaman. Banyak pengalaman positif di sini, SUNGGUH HEBAT! Terutama untuk materi TIU, trik-trik yang diberikan sangat membantu. Dalam tes, kita sangat membutuhkan cara cepat, dan di sini adalah tempat terbaik untuk mendapatkannya.',
    },
    {
      id: 2,
      name: 'M Hargo',
      sub: 'Peserta SKD 2023',
      desc: 'Terima kasih atas tryout yang telah diberikan, sangat membantu dalam menghadapi tes CPNS. Saya sudah mengikuti platform ini sejak awal dan tidak pernah ketinggalan tryout yang diberikan.',
    },
    {
      id: 3,
      name: 'MR X',
      sub: 'Lulus CPNS Kejaksaan 2023',
      desc: 'Saya sangat merekomendasikan Website JagoCpns.id Sebagai tempat saran belajar Tryout CPNS2024 , bisa diakses kapan saja dan dimanapun kita berada, tampilan sangat user friendly,ranking serta Soal Soal Sesuai kisi-kisi CPNS ',
    },
    {
      id: 4,
      name: 'Hafizh Nur Fauzi',
      sub: 'Fakultas Hukum UNSOED',
      desc: 'Platform penyedia tryout terbaik yang pernah saya ikuti,sesuai kisi kisi dan membantu dalam belajar cpns',
    },
  ];
  return (
    <section className='sm:h-screen my-12 sm:my-0 flex flex-col justify-center items-center bg-white dark:bg-gray-900'>
      <div className='hidden sm:block text-center dark:text-white'>
        <h1 className='text-4xl font-semibold'>Testimoni</h1>
        <h2 className='text-2xl mt-4'>Kata Mereka Tentang JAGOCPNS.ID</h2>
      </div>
      <div className='slider-container max-w-screen-lg p-4 hidden sm:block'>
        <Slider {...settings}>
          {datas.map((data) => (
            <TestiCard
              key={data.id}
              heading={data.name}
              subheading={data.sub}
              desc={data.desc}
            />
          ))}
        </Slider>
      </div>
      <div className='slider-container w-[100%] p-4 sm:hidden'>
        <Slider {...settingsPhone}>
          {datas.map((data) => (
            <TestiCard
              key={data.id}
              heading={data.name}
              subheading={data.sub}
              desc={data.desc}
            />
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default TestiSection;
