import { useState } from 'react';

const TryoutEditor = () => {
  const [tryout, setTryout] = useState({
    number: '',
    type: '',
    question: '',
    answer: '',
    explanation: '',
    imageUrl: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    optionE: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTryout((prevTryout) => ({
      ...prevTryout,
      [name]: value,
    }));
  };

  const handleNumberClick = (number) => {};
  const questionNumbers = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div className='flex'>
      <div className='w-1/5 bg-white border-r border-gray-300'>
        <div className='fixed top-0 left-0 right-0 bg-white z-10'>
          <header className='flex justify-between border-b border-black h-20'>
            <h1 className='text-2xl m-2 md:m-6 font-medium'>Tryout Editor</h1>
          </header>
        </div>
        <div className='flex flex-col mt-20'>
          <div className='w-full navigation overflow-auto flex md:grid md:grid-cols-2 lg:grid-cols-5 gap-y-4 p-4'>
            {questionNumbers.map((number) => (
              <button
                key={number}
                onClick={() => handleNumberClick(number)}
                className={`text-center border border-black cursor-pointer py-2 flex-shrink-0 w-10 h-10 mr-2 ${
                  tryout.number === number ? 'bg-gray-600 text-white' : ''
                }`}
              >
                {number}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className='w-4/5'>{/* Input fields */}</div>
    </div>
  );
};

export default TryoutEditor;
