import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { fetchAdmin } from '../../utils/fetchAdmin';
import dayjs from 'dayjs';

const MonthlyChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [month, setMonth] = useState(new Date().getMonth() + 1); // 1-based month
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const { data } = await fetchAdmin(
          `/charts/monthly-data?month=${month}&year=${year}`
        );
        setData(data.dailyData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch chart data');
        setLoading(false);
      }
    };

    fetchChartData();
  }, [month, year]);

  if (loading) return <div className='text-center'>Loading...</div>;
  if (error) return <div className='text-center text-red-500'>{error}</div>;

  const usersData = data.map(({ date, users }) => ({
    date: dayjs(date).format('D'),
    users,
  }));
  const revenueData = data.map(({ date, revenue }) => ({
    date: dayjs(date).format('D'),
    revenue,
  }));

  return (
    <div className='bg-gray-100 p-6 rounded-xl shadow-md'>
      <h2 className='text-lg font-semibold mb-6'>Monthly Data</h2>
      <div className='flex mb-6'>
        <div className='mr-4'>
          <label className='block'>Month</label>
          <input
            type='number'
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            min={1}
            max={12}
            className='p-2 rounded bg-gray-50'
          />
        </div>
        <div>
          <label className='block'>Year</label>
          <input
            type='number'
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className='p-2 rounded bg-gray-50'
          />
        </div>
      </div>

      <div className='mb-6'>
        <h3 className='text-md font-semibold mb-4'>Daily User Count</h3>
        <ResponsiveContainer width='100%' height={400}>
          <LineChart data={usersData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='date' tickFormatter={(tick) => `${tick}`} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type='monotone'
              dataKey='users'
              stroke='#8884d8'
              strokeWidth={2}
              name='Users'
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div>
        <h3 className='text-md font-semibold mb-4'>Daily Revenue</h3>
        <ResponsiveContainer width='100%' height={400}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='date' tickFormatter={(tick) => `${tick}`} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type='monotone'
              dataKey='revenue'
              stroke='#82ca9d'
              strokeWidth={2}
              name='Revenue'
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlyChart;
