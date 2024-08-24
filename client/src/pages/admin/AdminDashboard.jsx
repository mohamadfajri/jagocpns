import { useEffect, useState } from 'react';
import { fetchAdmin } from '../../utils/fetchAdmin';
import MonthlyChart from './MonthlyChart';

const AdminDashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [transactionSummary, setTransactionSummary] = useState([]);
  const [tryoutParticipation, setTryoutParticipation] = useState(0);
  const [balanceSummary, setBalanceSummary] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user count
        const { data: userCountData } = await fetchAdmin('/users/count');
        setUserCount(userCountData);

        // Fetch transaction summary
        const { data: transactionSummaryData } = await fetchAdmin(
          '/transactions/summary'
        );
        setTransactionSummary(transactionSummaryData.summary);

        // Fetch tryout participation
        const { data: tryoutParticipationData } = await fetchAdmin(
          '/tryouts/participation'
        );
        setTryoutParticipation(tryoutParticipationData);

        // Fetch balance summary
        const { data: balanceSummaryData } = await fetchAdmin(
          '/balance/summary'
        );
        setBalanceSummary(balanceSummaryData);

        setLoading(false);
      } catch (err) {
        setError('Failed to fetch dashboard data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatToIDR = (amount) => {
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0, // Jumlah digit desimal yang diinginkan
    });
    return formatter.format(amount);
  };

  if (loading) return <div className='text-center'>Loading...</div>;
  if (error) return <div className='text-center text-red-500'>{error}</div>;

  return (
    <div className='p-4 ml-64 dark:bg-black min-h-screen'>
      <h1 className='text-2xl font-bold mb-6 text-black'>Dashboard Summary</h1>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
        <div className='bg-gray-100 p-6 rounded-xl shadow-md'>
          <h2 className='text-lg font-semibold mb-4'>User Count</h2>
          <p className='text-4xl'>{userCount.count}</p>
        </div>
        <div className='bg-gray-100 p-6 rounded-xl shadow-md'>
          <h2 className='text-lg font-semibold mb-4'>Transaction Summary</h2>
          <ul>
            {transactionSummary.map((item) => (
              <li key={item.status} className='mb-2'>
                <span className='font-medium'>{item.status}:</span>{' '}
                {formatToIDR(item._sum.amount)} ({item._count._all}{' '}
                transactions)
              </li>
            ))}
          </ul>
        </div>
        <div className='bg-gray-100 p-6 rounded-xl shadow-md'>
          <h2 className='text-lg font-semibold mb-4'>Tryout Participation</h2>
          <p className='text-4xl'>{tryoutParticipation.participation}</p>
        </div>
        <div className='bg-gray-100 p-6 rounded-xl shadow-md'>
          <h2 className='text-lg font-semibold mb-4'>Balance Summary</h2>
          <p className='text-4xl'>{formatToIDR(balanceSummary.balance)}</p>
        </div>
      </div>
      <div className='col-span-4 my-4'>
        <MonthlyChart />
      </div>
    </div>
  );
};

export default AdminDashboard;
