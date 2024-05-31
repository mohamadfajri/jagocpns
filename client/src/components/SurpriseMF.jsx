import { useState } from 'react';
import hehe from '../assets/images/hehe.jpg';

const SurpriseMF = () => {
  const [visible, setVisible] = useState();
  return (
    <>
      <button
        className='bg-orange-600 px-6 py-4 text-xl text-white font-semibold'
        onClick={() => setVisible(true)}
      >
        CLICK ME
      </button>
      {visible && (
        <section className='h-screen fixed top-0 bottom-0 left-0 right-0 z-50'>
          <img className='h-screen w-screen' src={hehe} alt='' />
        </section>
      )}
    </>
  );
};

export default SurpriseMF;
