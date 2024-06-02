import HiUser from '../components/app/Dashboard/HiUser';
import NewsSection from '../components/app/Dashboard/NewsSection';

const Dashboard = () => {
  return (
    <>
      <div className='sm:p-10 sm:ml-64 dark:bg-black min-h-screen'>
        <HiUser />
        <NewsSection />
      </div>
    </>
  );
};

export default Dashboard;
