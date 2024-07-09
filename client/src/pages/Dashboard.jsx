import { useEffect, useState } from 'react';
import HiUser from '../components/app/Dashboard/HiUser';
import NewsSection from '../components/app/Dashboard/NewsSection';
import { fetcher } from '../utils/fetcher';
import LoadingTable from '../components/LoadingTable';
import FreeBanner from '../components/app/Dashboard/FreeBanner';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const { data } = await fetcher.get('/public/freetryouts');
        setData(data);
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
      <div className='sm:p-10 sm:ml-64 dark:bg-black min-h-screen'>
        <HiUser />
        {data.length > 0 && (
          <div>
            {isLoading ? (
              <LoadingTable />
            ) : (
              data?.map((tryout, index) => (
                <FreeBanner key={index} url={`/free/${tryout.id}`} />
              ))
            )}
          </div>
        )}
        <NewsSection />
      </div>
    </>
  );
};

export default Dashboard;
