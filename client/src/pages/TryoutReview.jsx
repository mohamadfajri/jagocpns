import { useEffect, useState } from 'react';
import watermark from '../assets/images/watermark.png';
import { fetcher } from '../utils/fetcher';
import { useParams } from 'react-router-dom';

const TryoutReview = () => {
  const { id } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState([
    {
      question: '',
      imageUrl: '',
      imageExplanation: '',
      choices: [{ text: '', key: '', image: '' }],
      scoreA: '',
      scoreB: '',
      scoreC: '',
      scoreD: '',
      scoreE: '',
      explain: '',
    },
  ]);
  const [userAnswers, setUserAnswers] = useState(['a']);
  const calculateScore = () => {
    const answers = questions.map((question) => question.answer);
    let score = 0;
    for (let i = 0; i < answers.length; i++) {
      if (answers[i] === userAnswers[i]) {
        score++;
      }
    }
    return score;
  };

  useEffect(() => {
    const getSoal = async () => {
      const { data } = await fetcher.get(`/user/review/${id}`);
      console.log(data);
      const format = data.map((item) => ({
        question: item.question,
        imageUrl: item.imageUrl,
        choices: [
          { text: item.optionA, key: 'a', image: item.imageA },
          { text: item.optionB, key: 'b', image: item.imageB },
          { text: item.optionC, key: 'c', image: item.imageC },
          { text: item.optionD, key: 'd', image: item.imageD },
          { text: item.optionE, key: 'e', image: item.imageE },
        ],
        scoreA: item.scoreA,
        scoreB: item.scoreB,
        scoreC: item.scoreC,
        scoreD: item.scoreD,
        scoreE: item.scoreE,
        explain: item.explanation,
        imageExplanation: item.imageExplanation,
      }));

      setQuestions(format);
    };

    getSoal();
  }, [id]);

  const handleNavigate = (index) => {
    setCurrentQuestion(index);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  const preventCopy = (event) => {
    event.preventDefault();
  };

  const routeParamsId = 'sample_id'; // Dummy data for route parameter

  return (
    <div style={{ userSelect: 'none' }} onCopy={preventCopy}>
      {!userAnswers ? (
        <EmptyPage title='Anda belum mengerjakan tryout ini!' />
      ) : (
        <div className='relative'>
          <div className='fixed top-0 left-0 right-0 bg-white z-10'>
            <header className='flex justify-between border-b border-black h-20'>
              <h1 className='text-2xl m-2 md:m-6 font-medium'>
                {routeParamsId}
              </h1>
              <button
                onClick={() => {
                  /* Navigate to home */
                }}
                className='w-8 h-8 m-6 hover:text-gray-700'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='w-full h-full'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </header>
          </div>
          <div className='flex flex-col md:flex-row md:h-screen'>
            <div className='flex flex-col md:w-1/5 border-r border-black'>
              <div className='border-b border-black mt-20'>
                <div className='hidden md:block ml-4'>
                  <img
                    src='https://azvyntaelgowdhbadqbs.supabase.co/storage/v1/object/public/ui/logo-extend.png'
                    alt=''
                    className='w-auto h-20'
                  />
                </div>
                <div className='flex justify-between mx-6 my-4'>
                  <div className='text-center p-3 w-fit'>
                    <h1 className='text-lg'>Jumlah Soal</h1>
                    <h1 className='text-3xl font-medium'>{questions.length}</h1>
                  </div>
                  <div className='text-center p-3 w-fit'>
                    <h1 className='text-lg'>Jawaban Benar</h1>
                    <h1 className='text-3xl font-medium'>{calculateScore()}</h1>
                  </div>
                </div>
              </div>
              <div className='border-b border-black'>
                <div className='mx-auto my-6 text-center'>
                  <h1 className='text-xl mb-1'>Nilai</h1>
                  <h1 className='text-5xl font-medium'>
                    {calculateScore() * 5}
                  </h1>
                </div>
              </div>

              {/* Navigation */}
              <div className='w-screen md:w-full navigation overflow-auto flex md:grid md:grid-cols-2 lg:grid-cols-5 gap-y-4 p-4'>
                {questions.map((question, index) => (
                  <div
                    key={index}
                    onClick={() => handleNavigate(index)}
                    className={`text-center border border-black cursor-pointer py-2 flex-shrink-0 w-10 h-10 mr-2 ${
                      currentQuestion === index ? 'text-white bg-gray-500' : ''
                    }`}
                  >
                    {index + 1}
                  </div>
                ))}
              </div>
            </div>
            <div
              className='md:w-4/5 md:mt-20 overflow-y-auto'
              style={{
                backgroundImage: `url(${watermark})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'repeat',
                backgroundPosition: 'center',
              }}
            >
              <div className='md:hidden block'>
                <img
                  src='https://azvyntaelgowdhbadqbs.supabase.co/storage/v1/object/public/ui/logo-extend.png'
                  alt=''
                  className='w-auto h-20'
                />
              </div>
              <div className='p-5 md:p-10'>
                <h1 className='text-3xl font-semibold mb-2 md:mb-6'>
                  Soal {currentQuestion + 1}
                </h1>
                {questions[currentQuestion].question && (
                  <p className='text-xl'>
                    {questions[currentQuestion].question}
                  </p>
                )}
                {questions[currentQuestion].imageUrl && (
                  <img
                    className='max-h-60'
                    src={questions[currentQuestion].imageUrl}
                    alt='image'
                  />
                )}

                <div className='flex flex-col'>
                  <ul>
                    {questions[currentQuestion].choices.map((choice, index) => (
                      <li key={index} className='mb-3'>
                        <button disabled className='flex flex-row items-center'>
                          <div
                            className={`text-center border border-black pt-1 flex-shrink-0 w-9 h-9 mr-3 ${
                              choice.key === userAnswers[currentQuestion]
                                ? 'bg-gray-500'
                                : ''
                            }`}
                          >
                            {choice.key}
                          </div>
                          <div className='flex flex-col'>
                            {choice.text && (
                              <p className='text-start'>{choice.text}</p>
                            )}
                            {choice.image && (
                              <img className='max-h-40' src={choice.image} />
                            )}
                          </div>

                          {choice.key === questions[currentQuestion].answer && (
                            <span className='ml-2 text-green-500'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 24 24'
                                fill='currentColor'
                                className='w-8 h-8'
                              >
                                <path
                                  fillRule='evenodd'
                                  d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z'
                                  clipRule='evenodd'
                                />
                              </svg>
                            </span>
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                  {userAnswers[currentQuestion] ===
                  questions[currentQuestion].answer ? (
                    <div className='flex w-fit p-2 bg-gray-200 text-green-600'>
                      <span className='mr-2'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 24 24'
                          fill='currentColor'
                          className='w-6 h-6'
                        >
                          <path
                            fillRule='evenodd'
                            d='M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z'
                            clipRule='evenodd'
                          />
                        </svg>
                      </span>
                      <h1>Jawaban Benar</h1>
                    </div>
                  ) : (
                    <div className='flex w-fit p-2 bg-gray-200 text-red-600'>
                      <span className='mr-2'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 24 24'
                          fill='currentColor'
                          className='w-6 h-6'
                        >
                          <path
                            fillRule='evenodd'
                            d='M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z'
                            clipRule='evenodd'
                          />
                        </svg>
                      </span>
                      <h1>Jawaban Salah</h1>
                    </div>
                  )}
                  <h1 className='font-semibold my-2'>Pembahasan:</h1>
                  <p>{questions[currentQuestion].explain}</p>
                </div>
                <div className='border-b my-4 border-black'></div>
                <div className='justify-center md:justify-start mt-4 flex flex-row'>
                  <button
                    onClick={handlePrev}
                    disabled={currentQuestion === 0}
                    className={`flex flex-row items-center font-medium mr-4 px-2 py-1 ${
                      currentQuestion === 0 ? 'text-gray-300' : ''
                    }`}
                  >
                    <span className='mr-2 border rounded-full p-1'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        fill='currentColor'
                        className='w-6 h-6'
                      >
                        <path
                          fillRule='evenodd'
                          d='M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </span>
                    Sebelumnya
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={currentQuestion === questions.length - 1}
                    className={`flex flex-row items-center font-medium px-2 py-1 ${
                      currentQuestion === questions.length - 1
                        ? 'text-gray-300'
                        : ''
                    }`}
                  >
                    Selanjutnya
                    <span className='ml-2 border rounded-full p-1'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        fill='currentColor'
                        className='w-6 h-6'
                      >
                        <path
                          fillRule='evenodd'
                          d='M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TryoutReview;
