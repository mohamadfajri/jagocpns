import { Outlet } from 'react-router-dom';
import TryoutCard from '../components/app/MyTryout/TryoutCard';
import { useEffect, useState } from 'react';
import { fetcher } from '../utils/fetcher';
import LoadingTable from '../components/LoadingTable';

const BuyTryOut = () => {
  const [tryouts, setTryouts] = useState([{}]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getTryouts = async () => {
      setIsLoading(true);
      const { data } = await fetcher.get('/public/tryouts');
      setTryouts(data);
      setIsLoading(false);
    };
    getTryouts();
  }, []);

  return (
    <div className='sm:p-10 sm:ml-64 dark:bg-black min-h-screen sm:mt-0'>
      <section>
        <div className='m-4 p-4 border rounded-lg'>
          <h1 className='text-2xl'>Beli Tryout</h1>
          {tryouts.length > 0 ? (
            <div className='rounded-lg p-4 my-2 border grid grid-cols-2 sm:grid-cols-5 gap-4'>
              {isLoading ? (
                <LoadingTable />
              ) : (
                tryouts?.map((tryout, index) => (
                  <TryoutCard
                    title={tryout.title}
                    desc={tryout.description}
                    key={index}
                    action={'Beli'}
                    url={`/app/tryoutstore/${tryout.id}`}
                    imageUrl={tryout.imageUrl}
                    price={tryout.price}
                  />
                ))
              )}
            </div>
          ) : (
            <div className='flex space-x-1 justify-center text-lg m-4'>
              <h2>Belum ada list Tryout</h2>
            </div>
          )}
          <Outlet />
        </div>
      </section>
    </div>
  );
};

export default BuyTryOut;
