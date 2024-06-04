import { useState, useEffect } from 'react';

const StartTryout = () => {
  const [timeLeft, setTimeLeft] = useState('1j :40m :0d');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('x');
  const [answers, setAnswers] = useState(Array(5).fill('x')); // static array for answers
  const [showModal, setShowModal] = useState(false);

  const questions = [
    {
      question: 'What is the capital of France?',
      choices: [
        { text: 'Paris', key: 'a' },
        { text: 'London', key: 'b' },
        { text: 'Berlin', key: 'c' },
        { text: 'Madrid', key: 'd' },
        { text: 'Rome', key: 'e' },
      ],
    },
    {
      question: 'What is the capital of Thailand?',
      choices: [
        { text: 'Bangkok', key: 'a' },
        { text: 'Bangdick', key: 'b' },
        { text: 'Bangpussy', key: 'c' },
        { text: 'Bangcock', key: 'd' },
        { text: 'Bangass', key: 'e' },
      ],
    },
  ];

  const totalQuestions = questions.length;

  const handleNavigate = (index) => {
    setCurrentQuestion(index);
    setSelectedAnswer(answers[index]);
  };

  const updateSelectedAnswer = (answer) => {
    setSelectedAnswer(answer);
  };

  const nextQuestion = () => {
    updateAnswers(selectedAnswer);
    setSelectedAnswer(answers[currentQuestion + 1]);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setSelectedAnswer(answers[currentQuestion - 1]);
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const updateAnswers = (answer) => {
    let newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const handleConfirm = () => {
    // postAnswers logic
    setShowModal(false);
    setTimeout(() => {
      window.location.href = '/'; // Redirect to home page
    }, 3000);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const callNextAndSubmit = () => {
    nextQuestion();
    setShowModal(true);
  };

  useEffect(() => {
    // Mocking startCountdown logic
    const interval = setInterval(() => {
      setTimeLeft('Waktu sudah habis!');
      clearInterval(interval);
    }, 10000); // Mock countdown to 10 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='relative'>
      {showModal && (
        <div className={`ease-out duration-300`}>
          <div>Perhatian!</div>
          <div>Apakah anda yakin akan men-submit jawaban?</div>
          <button onClick={handleConfirm}>Accept</button>
          <button onClick={handleCancel}>Reject</button>
        </div>
      )}
      <div className='fixed top-0 left-0 right-0 z-10'>
        <header className='flex justify-between border-b bg-white border-black'>
          <div className='ml-4'>
            <img
              src='https://azvyntaelgowdhbadqbs.supabase.co/storage/v1/object/public/ui/logo-extend.png'
              alt='logo'
              className='w-auto h-16'
            />
          </div>
          <div className='border border-black h-10 w-fit py-2 px-4 my-4 mx-6'>
            <h2 className='font-medium'>{timeLeft}</h2>
          </div>
        </header>
      </div>
      <div className='flex h-screen pt-10 flex-col md:flex-row'>
        <div className='md:w-1/5 flex flex-col'>
          <div className='md:border-r border-b pt-2 border-black mt-8 px-4 pb-2 h-fit w-full'>
            <h1 className='text-xl font-medium'>12345</h1>
          </div>
          <div className='w-full navigation overflow-auto flex md:grid md:grid-cols-2 lg:grid-cols-5 gap-y-4 p-4'>
            {questions.map((question, index) => (
              <div
                key={index}
                onClick={() => handleNavigate(index)}
                className={`text-center border border-black cursor-pointer py-2 flex-shrink-0 w-10 h-10 mr-2 ${
                  currentQuestion === index
                    ? 'bg-gray-600 text-white'
                    : answers[index] !== 'x' && currentQuestion !== index
                    ? 'bg-green-500 text-white'
                    : ''
                }`}
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>
        <div className='md:w-4/5'>
          {currentQuestion !== null && (
            <div className='p-10'>
              <h1 className='text-3xl font-semibold mb-6'>
                Soal {currentQuestion + 1}
              </h1>
              <p className='mb-4 text-xl'>
                {questions[currentQuestion].question}
              </p>
              <div className='flex flex-col'>
                <ul>
                  {questions[currentQuestion].choices.map(
                    (choice, choiceIndex) => (
                      <li key={choiceIndex} className='mb-3'>
                        <button
                          onClick={() => updateSelectedAnswer(choice.key)}
                          className='flex flex-row items-center'
                        >
                          <div
                            className={`text-center border border-black cursor-pointer pt-1 flex-shrink-0 w-9 h-9 mr-3 ${
                              selectedAnswer === choice.key
                                ? 'bg-gray-600 text-white'
                                : 'bg-white'
                            }`}
                          >
                            {choice.key}
                          </div>
                          <p className='text-start'>{choice.text}</p>
                        </button>
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div className='border-b my-4 border-black'></div>
              <div className='mt-4 flex flex-row'>
                <button
                  onClick={prevQuestion}
                  disabled={currentQuestion === 0}
                  className={`flex flex-row items-center font-medium mr-4 px-2 py-1 ${
                    currentQuestion === 0
                      ? 'text-gray-400'
                      : 'text-black hover:bg-gray-100'
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
                {currentQuestion < totalQuestions - 1 && (
                  <button
                    onClick={nextQuestion}
                    className='flex flex-row items-center font-medium px-2 py-1 hover:bg-gray-100'
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
                )}
                {currentQuestion === totalQuestions - 1 && (
                  <button
                    onClick={callNextAndSubmit}
                    className='flex flex-row items-center font-bold px-2 py-1 hover:bg-gray-100'
                  >
                    Submit
                    <span className='ml-2 rounded-full p-1'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        className='w-6 h-6'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z'
                        />
                      </svg>
                    </span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StartTryout;
