import { useEffect, useState } from 'react';
import { fetchAdmin } from '../../utils/fetchAdmin';
import { useParams } from 'react-router-dom';
import LoadingTable from '../../components/LoadingTable';

const ShowTryout = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [tryout, setTryout] = useState([{}]);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const { data } = await fetchAdmin.get(`/showtryouts/${id}`);
        setTryout(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    };
    getData();
  }, [id]);
  return (
    <>
      <nav className='fixed top-0 left-64 right-0 z-20 border-b p-4 bg-white'>
        SKD-1
      </nav>
      {loading ? (
        <LoadingTable />
      ) : (
        <div className='sm:px-10 py-16 sm:ml-64'>
          <div className='p-5'>
            {tryout.map((item, index) => (
              <div
                key={index}
                className='mb-10 p-4 border rounded-lg shadow-md'
              >
                <div className='mb-4 font-medium'>{item.type}</div>
                <div className='mb-4'>
                  <span className='font-bold'>{item.number}. </span>
                  {item.question && <span>{item.question}</span>}
                  {item.imageUrl && (
                    <div className='mt-2'>
                      <img
                        src={item.imageUrl}
                        alt={`Soal ${item.number}`}
                        className='w-44 h-auto'
                      />
                    </div>
                  )}
                </div>

                <div className='mb-4'>
                  {item.optionA && <div>a. {item.optionA}</div>}
                  {item.imageA && (
                    <img className='h-44 w-auto' src={item.imageA} />
                  )}
                  {item.optionB && <div>b. {item.optionB}</div>}
                  {item.imageB && (
                    <img className='h-44 w-auto' src={item.imageB} />
                  )}
                  {item.optionC && <div>c. {item.optionC}</div>}
                  {item.imageC && (
                    <img className='h-44 w-auto' src={item.imageC} />
                  )}
                  {item.optionD && <div>d. {item.optionD}</div>}
                  {item.imageD && (
                    <img className='h-44 w-auto' src={item.imageD} />
                  )}
                  {item.optionE && <div>e. {item.optionE}</div>}
                  {item.imageE && (
                    <img className='h-44 w-auto' src={item.imageE} />
                  )}
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
                  {item.imageExplanation && (
                    <img
                      src={item.imageExplanation}
                      alt={`explain ${item.number}`}
                      className='w-44 h-auto'
                    />
                  )}
                  <p>{item.explanation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ShowTryout;
