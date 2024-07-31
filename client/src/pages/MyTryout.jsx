import { Link, Outlet } from 'react-router-dom';
import TryoutCard from '../components/app/MyTryout/TryoutCard';
import { useEffect, useState } from 'react';
import { fetcher } from '../utils/fetcher';
import LoadingTable from '../components/LoadingTable';

const Mytryout = () => {
  const [done, setDone] = useState([{}]);
  const [unDone, setUndone] = useState([{}]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const { data } = await fetcher.get('/user/mylists');
        setDone(data.done);
        setUndone(data.undone);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <>
      <div className='sm:mt-0 sm:p-10 sm:ml-64 dark:bg-black min-h-screen'>
        <main className='flex flex-col'>
          <section className='sm:h-1/2'>
            <div className='m-4 p-4 border rounded-lg'>
              <h1 className='sm:text-2xl'>Belum Dikerjakan</h1>
              {unDone.length !== 0 ? (
                <div className='rounded-lg p-4 my-2 border grid grid-cols-2 sm:grid-cols-5 gap-4'>
                  {isLoading ? (
                    <LoadingTable />
                  ) : (
                    unDone?.map((tryout, index) => (
                      <TryoutCard
                        title={tryout.title}
                        desc={tryout.description}
                        key={index}
                        action={'kerjakan'}
                        url={`tryout/${tryout.tryoutListId}`}
                        imageUrl={tryout.imageUrl}
                      />
                    ))
                  )}
                </div>
              ) : (
                <div className='flex space-x-1 justify-center sm:text-lg m-4'>
                  <h2>
                    Anda belum memiliki tryout,silahkan membeli terlebih dahulu
                    di
                  </h2>
                  <Link
                    to={'/app/tryoutstore'}
                    className='ml-2 text-blue-600 font-semibold hover:underline'
                  >
                    Beli Tryout
                  </Link>
                </div>
              )}
            </div>
          </section>
          <section className='h-1/2'>
            <div className='m-4 p-4 border rounded-lg'>
              <h1 className='sm:text-2xl'>Sudah Dikerjakan</h1>
              {done.length !== 0 ? (
                <div className='rounded-lg p-4 my-2 border grid sm:grid-cols-5 grid-cols-2 gap-4'>
                  {isLoading ? (
                    <LoadingTable />
                  ) : (
                    done?.map((tryout, index) => (
                      <TryoutCard
                        title={tryout.title}
                        desc={tryout.desc}
                        key={index}
                        action={'nilai saya'}
                        url={`score/${tryout.tryoutListId}`}
                        imageUrl={tryout.imageUrl}
                      />
                    ))
                  )}
                </div>
              ) : (
                <div className='flex space-x-1 justify-center sm:text-lg m-4'>
                  <h2>
                    Anda belum mengerjakan tryout apapun, silahkan kerjakan
                    terlebih dahulu!
                  </h2>
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
      <Outlet />
    </>
  );
};

export default Mytryout;
