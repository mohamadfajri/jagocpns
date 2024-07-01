import { Button, Pagination } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { HiOutlineArrowUpOnSquare } from 'react-icons/hi2';
import { fetcher } from '../utils/fetcher';
import { useParams } from 'react-router-dom';

const TryoutCbt = () => {
  const { id } = useParams();
  const [meta, setMeta] = useState({
    title: 'Tryout 1',
  });
  const [answer, setAnswer] = useState('');
  const [soal, setSoal] = useState({
    id: 1,
    number: 1,
    question: '',
    imageUrl: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    optionE: '',
    answer: '',
    imageA: '',
    imageB: '',
    imageC: '',
    imageD: '',
    imageE: '',
  });

  const [number, setNumber] = useState([]);
  const [activeNumber, setActiveNumber] = useState(1);
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    const fetchMeta = async () => {
      const response = await fetcher.get(`/user/cbt-data/${id}`);
      setMeta({ title: response.data.tryoutList });
      const numbers = Array.from(
        { length: response.data.totalSoal },
        (_, i) => i + 1
      );
      setNumber(numbers);
    };

    fetchMeta();
  }, [id]);

  useEffect(() => {
    const fetchSoal = async () => {
      const response = await fetcher.get(`/user/cbt/${id}/${activeNumber}`);
      setSoal({
        id: response.data.id,
        number: response.data.number,
        question: response.data.question,
        imageUrl: response.data.imageUrl,
        optionA: response.data.optionA,
        optionB: response.data.optionB,
        optionC: response.data.optionC,
        optionD: response.data.optionD,
        optionE: response.data.optionE,
        imageA: response.data.imageA,
        imageB: response.data.imageB,
        imageC: response.data.imageC,
        imageD: response.data.imageD,
        imageE: response.data.imageE,
      });
    };

    fetchSoal();
  }, [id, activeNumber]);

  const onPageChange = (page) => {
    setActiveNumber(page);
    setAnswer('');
  };

  const [timeLeft, setTimeLeft] = useState(() => {
    const savedEndTime = localStorage.getItem('endTime');
    if (savedEndTime) {
      return Math.max(0, savedEndTime - Date.now());
    }
    return 120 * 60 * 1000;
  });

  useEffect(() => {
    let endTime = localStorage.getItem('endTime');
    if (!endTime) {
      endTime = Date.now() + 120 * 60 * 1000;
      localStorage.setItem('endTime', endTime);
    }
    const interval = setInterval(() => {
      const now = Date.now();
      const newTimeLeft = Math.max(0, endTime - now);
      setTimeLeft(newTimeLeft);
      if (newTimeLeft === 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchAnswers = async () => {
      const response = await fetcher.get('user/get-answered', {
        params: { tryoutListId: id },
      });
      setNumbers(response.data);
    };

    fetchAnswers();
  }, [id, answer]);

  const createAnswer = async (ans) => {
    setAnswer(ans);
    setNumbers((prevNumbers) => [...prevNumbers, activeNumber]);
    console.log(numbers);
    await fetcher.post('/user/cbt', {
      tryoutListId: id,
      number: activeNumber,
      answer: ans,
    });
  };

  useEffect(() => {
    const fetchAnswer = async () => {
      const response = await fetcher.get('/user/get-answer', {
        params: {
          tryoutListId: id,
          number: activeNumber,
        },
      });
      setAnswer(response.data.answer);
    };

    fetchAnswer();
  }, [id, activeNumber]);

  const createScore = async () => {
    const response = await fetcher.post(`/user/finish/${id}`);
    console.log(response);
  };

  const minutes = Math.floor(timeLeft / 1000 / 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);
  const time = `${minutes} Menit, ${seconds} Detik`;

  return (
    <>
      <main className='h-screen'>
        <section className='flex'>
          <aside className='w-1/5 border-r h-screen overflow-auto pt-4'>
            <div className='grid grid-cols-5 gap-4 p-4'>
              {number.map((item, index) => (
                <button
                  onClick={() => {
                    setActiveNumber(item);
                    setAnswer('');
                  }}
                  key={index}
                  className={`btn btn-sm border border-black
                    ${
                      activeNumber === item && numbers.includes(item)
                        ? 'bg-green-500 text-white'
                        : numbers.includes(item)
                        ? 'bg-blue-500 text-white'
                        : activeNumber === item
                        ? 'bg-green-500 text-white'
                        : ''
                    }  p-2 rounded`}
                >
                  {item}
                </button>
              ))}
            </div>
          </aside>
          <div className='pt-8 h-screen w-4/5'>
            <div className='space-y-6 h-4/5 pb-2 pl-12 overflow-y-auto'>
              {soal.question && (
                <h1 className='font-semibold text-xl my-2'>
                  Soal {activeNumber}
                </h1>
              )}
              {soal.imageUrl && (
                <img className='max-h-60' src={soal.imageUrl} alt='' />
              )}
              <div className='soal'>{soal.question}</div>
              <ul className='space-y-4'>
                <li className='flex items-center'>
                  <button
                    onClick={() => createAnswer('optionA')}
                    className={`h-fit btn btn-sm py-2 px-4 rounded-lg border border-black ${
                      answer === 'optionA'
                        ? 'bg-blue-500 text-white'
                        : 'bg-white text-black'
                    }`}
                  >
                    A
                  </button>
                  <span>
                    {soal.optionA && (
                      <p className='mx-4 font-normal'>{soal.optionA}</p>
                    )}
                    {soal.imageA && (
                      <img className='mx-4 max-h-44' src={soal.imageA} />
                    )}
                  </span>
                </li>
                <li className='flex items-center'>
                  <button
                    onClick={() => createAnswer('optionB')}
                    className={`h-fit btn btn-sm py-2 px-4 rounded-lg border border-black ${
                      answer === 'optionB'
                        ? 'bg-blue-500 text-white'
                        : 'bg-white text-black'
                    }`}
                  >
                    B
                  </button>
                  <span>
                    {soal.optionB && (
                      <p className='mx-4 font-normal'>{soal.optionB}</p>
                    )}
                    {soal.imageB && (
                      <img className='mx-4 max-h-44' src={soal.imageB} />
                    )}
                  </span>
                </li>
                <li className='flex items-center'>
                  <button
                    onClick={() => createAnswer('optionC')}
                    className={`h-fit btn btn-sm py-2 px-4 rounded-lg border border-black ${
                      answer === 'optionC'
                        ? 'bg-blue-500 text-white'
                        : 'bg-white text-black'
                    }`}
                  >
                    C
                  </button>
                  <span>
                    {soal.optionC && (
                      <p className='mx-4 font-normal'>{soal.optionC}</p>
                    )}
                    {soal.imageC && (
                      <img className='mx-4 max-h-44' src={soal.imageC} />
                    )}
                  </span>
                </li>
                <li className='flex items-center'>
                  <button
                    onClick={() => createAnswer('optionD')}
                    className={`h-fit btn btn-sm py-2 px-4 rounded-lg border border-black ${
                      answer === 'optionD'
                        ? 'bg-blue-500 text-white'
                        : 'bg-white text-black'
                    }`}
                  >
                    D
                  </button>
                  <span>
                    {soal.optionD && (
                      <p className='mx-4 font-normal'>{soal.optionD}</p>
                    )}
                    {soal.imageD && (
                      <img className='mx-4 max-h-44' src={soal.imageD} />
                    )}
                  </span>
                </li>
                <li className='flex items-center'>
                  <button
                    onClick={() => createAnswer('optionE')}
                    className={`h-fit btn btn-sm py-2 px-4 rounded-lg border border-black ${
                      answer === 'optionE'
                        ? 'bg-blue-500 text-white'
                        : 'bg-white text-black'
                    }`}
                  >
                    E
                  </button>
                  <span>
                    {soal.optionE && (
                      <p className='mx-4 font-normal'>{soal.optionE}</p>
                    )}
                    {soal.imageE && (
                      <img className='mx-4 max-h-44' src={soal.imageE} />
                    )}
                  </span>
                </li>
              </ul>

              <Pagination
                layout='navigation'
                currentPage={activeNumber}
                totalPages={number.length}
                onPageChange={onPageChange}
                showIcons
              />
            </div>
            <div className='h-1/6 border-t p-6 flex justify-between'>
              <div className='space-y-4 flex flex-col'>
                <div className='text-2xl font-semibold'>
                  <h1>{meta.title}</h1>
                </div>
                <Button onClick={createScore} color={'success'}>
                  Submit Jawaban
                  <HiOutlineArrowUpOnSquare className='ml-2 h-5 w-5' />
                </Button>
              </div>
              <div className='space-y-2 flex flex-col w-fit'>
                <h1>Sisa Waktu :</h1>
                <div className='p-2 border border-black'>{time}</div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default TryoutCbt;
