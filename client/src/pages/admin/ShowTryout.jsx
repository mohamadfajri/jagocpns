import { useState } from 'react';

const ShowTryout = () => {
  const [tryout, setTryout] = useState([
    {
      number: '1',
      type: 'TWK', // or 'text' or 'both'
      question: 'Ini adalah soal pertama',
      explanation: 'Penjelasan untuk soal pertama.',
      image: '',
      optionA: 'Ini adalah optionA',
      optionB: 'Ini adalah optionB',
      optionC: 'Ini adalah optionC',
      optionD: 'Ini adalah optionD',
      optionE: 'Ini adalah optionE',
      scoreA: 20,
      scoreB: 30,
      scoreC: 0,
      scoreD: 0,
      scoreE: 50,
    },
    {
      number: '1',
      type: 'TWK', // or 'text' or 'both'
      question: 'Ini adalah soal pertama',
      explanation: 'Penjelasan untuk soal pertama.',
      image: '',
      optionA: 'Ini adalah optionA',
      optionB: 'Ini adalah optionB',
      optionC: 'Ini adalah optionC',
      optionD: 'Ini adalah optionD',
      optionE: 'Ini adalah optionE',
      scoreA: 20,
      scoreB: 30,
      scoreC: 0,
      scoreD: 0,
      scoreE: 50,
    },
    {
      number: '1',
      type: 'TWK', // or 'text' or 'both'
      question: 'Ini adalah soal pertama',
      explanation: 'Penjelasan untuk soal pertama.',
      image: '',
      optionA: 'Ini adalah optionA',
      optionB: 'Ini adalah optionB',
      optionC: 'Ini adalah optionC',
      optionD: 'Ini adalah optionD',
      optionE: 'Ini adalah optionE',
      scoreA: 20,
      scoreB: 30,
      scoreC: 0,
      scoreD: 0,
      scoreE: 50,
    },
  ]);
  return (
    <>
      <nav className='fixed top-0 left-64 right-0 z-20 border-b p-4 bg-white'>
        SKD-1
      </nav>
      <div className='sm:px-10 py-16 sm:ml-64'>
        <div className='p-5'>
          {tryout.map((item, index) => (
            <div key={index} className='mb-10 p-4 border rounded-lg shadow-md'>
              <div className='mb-4 font-medium'>{item.type}</div>
              <div className='mb-4'>
                <span className='font-bold'>{item.number}. </span>
                {item.question && <span>{item.question}</span>}
                {item.image && (
                  <div className='mt-2'>
                    <img
                      src={item.image}
                      alt={`Soal ${item.number}`}
                      className='w-full h-auto'
                    />
                  </div>
                )}
              </div>

              <div className='mb-4'>
                {item.optionA && <div>a. {item.optionA}</div>}
                {item.optionB && <div>b. {item.optionB}</div>}
                {item.optionC && <div>c. {item.optionC}</div>}
                {item.optionD && <div>d. {item.optionD}</div>}
                {item.optionE && <div>e. {item.optionE}</div>}
              </div>

              <div className='mb-4'>
                <span className='font-bold'>Jawaban: </span>
                <ul className='list-disc ml-5'>
                  {item.scoreA > 0 && <li>a. nilai {item.scoreA}</li>}
                  {item.scoreB > 0 && <li>b. nilai {item.scoreB}</li>}
                  {item.scoreC > 0 && <li>c. nilai {item.scoreC}</li>}
                  {item.scoreD > 0 && <li>d. nilai {item.scoreD}</li>}
                  {item.scoreE > 0 && <li>e. nilai {item.scoreE}</li>}
                </ul>
              </div>

              <div>
                <span className='font-bold'>Pembahasan: </span>
                <p>{item.explanation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ShowTryout;
