import { useEffect, useState } from 'react';
import { fetcher } from '../utils/fetcher';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Modal } from 'flowbite-react';
import { useCbt } from '../stores/useCbt';
import { useAlert } from '../stores/useAlert';

const CbtTryout = () => {
  const [soal, setSoal] = useState([]);
  const [activeSoal, setActiveSoal] = useState({});
  const [numbers, setNumbers] = useState([]);
  const [activeNumber, setActiveNumber] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const { answers, setAnswers, setIsWorking, initialTime, setInitialTime } =
    useCbt();
  const [timeLeft, setTimeLeft] = useState('02:00:00');
  const { id } = useParams();
  const { setAlert } = useAlert();
  const navigate = useNavigate();

  useEffect(() => {
    const getSoal = async () => {
      try {
        const response = await fetcher.get(`/user/getallsoal/${id}`);
        const { data } = response;
        const createNumbers = (total) => {
          const numbers = [];
          for (let i = 1; i <= total; i++) {
            numbers.push(i);
          }
          return numbers;
        };

        setSoal(data);
        setNumbers(createNumbers(data.length));
        setActiveSoal(data[0]);
        setIsWorking(id);
      } catch (error) {
        console.error('Failed to fetch soals:', error);
        const message = encodeURIComponent(error.response.data.message);
        setIsWorking(null);
        navigate(`/error/${message}`);
        setAlert({
          title: 'Error!',
          message: error.response.data.message,
          color: 'failure',
        });
      }
    };

    getSoal();
  }, [id, setAnswers, setIsWorking, navigate, setAlert]);

  useEffect(() => {
    if (initialTime) {
      const now = new Date().getTime();
      const initial = new Date(initialTime).getTime();
      const diff = now - initial;

      if (diff >= 2 * 60 * 60 * 1000) {
        setTimeLeft('00:00:00');
      } else {
        const remainingTime = 2 * 60 * 60 * 1000 - diff;
        const hours = Math.floor(remainingTime / (1000 * 60 * 60));
        const minutes = Math.floor(
          (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
        setTimeLeft(
          `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
            2,
            '0'
          )}:${String(seconds).padStart(2, '0')}`
        );
      }
    } else {
      const now = new Date();
      setInitialTime(now);
      setTimeLeft('02:00:00');
    }
  }, [initialTime, setInitialTime]);

  useEffect(() => {
    const postAnswers = async () => {
      try {
        const { data } = await fetcher.post(`/user/answer/${id}`, {
          answers: answers,
        });
        setAlert({ title: 'Sukses!', message: data.message, color: 'success' });
        setIsWorking(null);
        setInitialTime(null);
        setAnswers([]);
        navigate('/app/dashboard');
      } catch (error) {
        setAlert({
          title: 'Gagal!',
          message: error.response.data.error,
          color: 'failure',
        });
      }
    };

    if (timeLeft === '00:00:00') {
      postAnswers();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        const [hours, minutes, seconds] = prevTime.split(':').map(Number);
        const totalSeconds = hours * 3600 + minutes * 60 + seconds - 1;

        if (totalSeconds <= 0) return '00:00:00';

        const newHours = Math.floor(totalSeconds / 3600);
        const newMinutes = Math.floor((totalSeconds % 3600) / 60);
        const newSeconds = totalSeconds % 60;

        return [
          String(newHours).padStart(2, '0'),
          String(newMinutes).padStart(2, '0'),
          String(newSeconds).padStart(2, '0'),
        ].join(':');
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [
    timeLeft,
    navigate,
    answers,
    id,
    setAlert,
    setIsWorking,
    setInitialTime,
    setAnswers,
  ]);

  useEffect(() => {
    if (answers.length === 0) {
      setAnswers(Array(soal.length).fill('x'));
    }
  }, [setAnswers, answers.length, soal]);

  const handleNavigate = (index) => {
    setActiveSoal(soal[index]);
    setActiveNumber(index + 1);
  };

  const updateSelectedAnswer = (key) => {
    const newAnswers = [...answers];
    newAnswers[activeNumber - 1] = key;
    setAnswers(newAnswers);
    console.log(newAnswers);
  };

  const handleConfirm = () => {
    console.log('Answers submitted:', answers);
    postAnswers();
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const prevQuestion = () => {
    if (activeNumber > 1) {
      handleNavigate(activeNumber - 2);
    }
  };

  const nextQuestion = () => {
    if (activeNumber < soal.length) {
      handleNavigate(activeNumber);
    }
  };

  const callNextAndSubmit = () => {
    setShowModal(true);
  };

  const postAnswers = async () => {
    try {
      const { data } = await fetcher.post(`/user/answer/${id}`, {
        answers: answers,
      });
      setAlert({ title: 'Sukses!', message: data.message, color: 'success' });
      setIsWorking(null);
      setInitialTime(null);
      setAnswers([]);
      navigate('/app/dashboard');
    } catch (error) {
      setAlert({
        title: 'Gagal!',
        message: error.response.data.error,
        color: 'failure',
      });
    }
  };

  const renderOption = (key, text, image) => (
    <li key={key} className='mb-3'>
      <button
        onClick={() => updateSelectedAnswer(key)}
        className='flex flex-row items-center'
      >
        <div
          className={`text-center border border-black cursor-pointer pt-1 flex-shrink-0 w-9 h-9 mr-3 ${
            answers[activeNumber - 1] === key
              ? 'bg-gray-600 text-white'
              : 'bg-white'
          }`}
        >
          {key}
        </div>
        <div className='text-start'>
          {text && <p>{text}</p>}
          {image && (
            <img src={image} alt={`Option ${key}`} className='w-32 h-auto' />
          )}
        </div>
      </button>
    </li>
  );

  return (
    <>
      <div className='relative'>
        {
          <div className={`ease-out duration-300`}>
            <Modal show={showModal} onClose={() => setShowModal(false)}>
              <Modal.Header>Submit Jawaban?</Modal.Header>
              <Modal.Body>
                <p>apakah anda sudah yakin dengan jawaban anda?</p>
              </Modal.Body>
              <Modal.Footer>
                <Button color={'success'} onClick={handleConfirm}>
                  I accept
                </Button>
                <Button color='gray' onClick={handleCancel}>
                  Decline
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        }
        <div className='fixed top-0 left-0 right-0 bg-white'>
          <header className='flex justify-between border-b bg-white border-black'>
            <div className='ml-4'>
              <img
                src='https://azvyntaelgowdhbadqbs.supabase.co/storage/v1/object/public/ui/logo-extend.png'
                alt='logo'
                className='w-auto h-16'
              />
            </div>
            <div className='flex space-x-2 items-center mx-6'>
              <Button color={'success'} onClick={callNextAndSubmit}>
                Submit
              </Button>
              <div className='border border-black h-10 w-fit py-2 px-4 my-4'>
                <h2 className='font-medium'>{timeLeft}</h2>
              </div>
            </div>
          </header>
        </div>
        <div className='flex h-screen pt-10 flex-col md:flex-row'>
          <div className='md:w-1/5 flex flex-col sm:overflow-y-auto mt-8 border-r border-black'>
            <div className='w-full navigation overflow-auto flex md:grid md:grid-cols-2 lg:grid-cols-5 gap-y-4 p-4'>
              {numbers.map((number, index) => (
                <div
                  key={index}
                  onClick={() => handleNavigate(index)}
                  className={`text-center border border-black cursor-pointer py-2 flex-shrink-0 w-10 h-10 mr-2 ${
                    activeNumber === number
                      ? 'bg-gray-600 text-white'
                      : answers[index] !== 'x' && activeNumber !== number
                      ? 'bg-green-500 text-white'
                      : ''
                  }`}
                >
                  {number}
                </div>
              ))}
            </div>
          </div>
          <div className='md:w-4/5 overflow-y-auto mb-8'>
            {activeSoal && (
              <div className='p-10'>
                <h1 className='text-xl font-semibold mb-6'>
                  Soal {activeNumber}
                </h1>
                <div className='mb-8'>
                  {activeSoal.question && <p>{activeSoal.question}</p>}
                  {activeSoal.imageUrl && (
                    <img
                      src={activeSoal.imageUrl}
                      alt='Question'
                      className='w-64 h-auto'
                    />
                  )}
                </div>
                <div className='flex flex-col'>
                  <ul>
                    {renderOption('A', activeSoal.optionA, activeSoal.imageA)}
                    {renderOption('B', activeSoal.optionB, activeSoal.imageB)}
                    {renderOption('C', activeSoal.optionC, activeSoal.imageC)}
                    {renderOption('D', activeSoal.optionD, activeSoal.imageD)}
                    {renderOption('E', activeSoal.optionE, activeSoal.imageE)}
                  </ul>
                </div>
                <div className='fixed bottom-4 bg-white border border-black rounded-lg'>
                  <div className='flex flex-row text-sm my-1'>
                    <button
                      onClick={prevQuestion}
                      disabled={activeNumber === 1}
                      className={`flex flex-row items-center font-medium mr-4 px-2 py-1 ${
                        activeNumber === 1
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
                    {activeNumber < numbers.length && (
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
                    {activeNumber === numbers.length && (
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
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CbtTryout;
