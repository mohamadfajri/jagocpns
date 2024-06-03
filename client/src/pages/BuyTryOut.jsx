import { Outlet } from 'react-router-dom';
import TryoutCard from '../components/app/MyTryout/TryoutCard';

const BuyTryOut = () => {
  const tryouts = [
    {
      id: 1,
      title: 'Tryout 1',
      desc: 'SKD 1 Juli 2024 - 5 Juli 2024',
    },
    {
      id: 2,
      title: 'Tryout 2',
      desc: 'SKD 6 Juli 2024 - 10 Juli 2024',
    },
    {
      id: 3,
      title: 'Tryout 3',
      desc: 'SKD 11 Juli 2024 - 15 Juli 2024',
    },
    {
      id: 4,
      title: 'Tryout 4',
      desc: 'SKD 16 Juli 2024 - 20 Juli 2024',
    },
    {
      id: 5,
      title: 'Tryout 5',
      desc: 'SKD 21 Juli 2024 - 25 Juli 2024',
    },
    {
      id: 6,
      title: 'Tryout 6',
      desc: 'SKD 1 Juli 2024 - 5 Juli 2024',
    },
    {
      id: 7,
      title: 'Tryout 7',
      desc: 'SKD 6 Juli 2024 - 10 Juli 2024',
    },
    {
      id: 8,
      title: 'Tryout 8',
      desc: 'SKD 11 Juli 2024 - 15 Juli 2024',
    },
    {
      id: 9,
      title: 'Tryout 9',
      desc: 'SKD 16 Juli 2024 - 20 Juli 2024',
    },
    {
      id: 10,
      title: 'Tryout 10',
      desc: 'SKD 21 Juli 2024 - 25 Juli 2024',
    },
  ];
  return (
    <div className='sm:p-10 sm:ml-64 dark:bg-black min-h-screen'>
      <section>
        <div className='m-4 p-4 border rounded-lg'>
          <h1 className='text-2xl'>Beli Tryout</h1>
          {tryouts ? (
            <div className='rounded-lg p-4 my-2 border grid grid-cols-5 gap-4'>
              {tryouts?.map((tryout) => (
                <TryoutCard
                  title={tryout.title}
                  desc={tryout.desc}
                  key={tryout.id}
                  action={'Beli'}
                  url={`/app/tryoutstore/${tryout.id}`}
                />
              ))}
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
