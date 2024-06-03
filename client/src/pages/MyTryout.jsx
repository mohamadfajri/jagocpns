import { Link, Outlet } from 'react-router-dom';
import TryoutCard from '../components/app/MyTryout/TryoutCard';

const Mytryout = () => {
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
  ];

  return (
    <>
      <div className='sm:p-10 sm:ml-64 dark:bg-black min-h-screen'>
        <main className='flex flex-col'>
          <section className='h-1/2'>
            <div className='m-4 p-4 border rounded-lg'>
              <h1 className='text-2xl'>Belum Dikerjakan</h1>
              {tryouts ? (
                <div className='rounded-lg p-4 my-2 border grid grid-cols-5 gap-4'>
                  {tryouts?.map((tryout) => (
                    <TryoutCard
                      title={tryout.title}
                      desc={tryout.desc}
                      key={tryout.id}
                      action={'kerjakan'}
                      url={`/confirmation/${tryout.id}`}
                    />
                  ))}
                </div>
              ) : (
                <div className='flex space-x-1 justify-center text-lg m-4'>
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
              <h1 className='text-2xl'>Sudah Dikerjakan</h1>
              {tryouts ? (
                <div className='rounded-lg p-4 my-2 border grid grid-cols-5 gap-4'>
                  {tryouts?.map((tryout) => (
                    <TryoutCard
                      title={tryout.title}
                      desc={tryout.desc}
                      key={tryout.id}
                      action={'nilai saya'}
                      url={`score/${tryout.id}`}
                    />
                  ))}
                </div>
              ) : (
                <div className='flex space-x-1 justify-center text-lg m-4'>
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
