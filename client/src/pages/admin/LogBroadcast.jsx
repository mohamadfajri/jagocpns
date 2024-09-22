/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

const LogBroadcast = ({ data }) => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (data) {
      setLogs(data);
    }
  }, [data]);

  const clearLogs = () => {
    setLogs([]);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'sending':
        return 'text-blue-500';
      case 'success':
        return 'text-green-500';
      case 'failed':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };
  const latestLog = logs.length > 0 ? logs[logs.length - 1] : null;

  return (
    <div className='bg-white p-4 rounded shadow-md max-w-4xl'>
      <h1>Log{'(s)'}</h1>
      <div className='overflow-auto max-h-60'>
        {logs.length === 0 ? (
          <p className='text-gray-500'>No logs available.</p>
        ) : (
          logs.map((log) => (
            <div
              key={log.id}
              className='flex justify-between space-x-12 border-b py-2 text-xs'
            >
              <span className='text-gray-600'>{log.id}</span>
              <span className='text-gray-800'>{log.email}</span>
              <span className={getStatusColor(log.status)}>{log.status}</span>
              <span className='text-gray-500 text-sm'>{log.timestamp}</span>
            </div>
          ))
        )}
      </div>

      {latestLog && (
        <div className='flex justify-between space-x-12 border-b text-xs border-t bg-gray-200'>
          <span className='text-gray-600'>{latestLog.id}</span>
          <span className='text-gray-800'>{latestLog.email}</span>
          <span className={getStatusColor(latestLog.status)}>
            {latestLog.status}
          </span>
          <span className='text-gray-500 text-sm'>{latestLog.timestamp}</span>
        </div>
      )}
      <button
        onClick={clearLogs}
        className='mt-4 text-xs bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-3 rounded'
      >
        Clear Log
      </button>
    </div>
  );
};

export default LogBroadcast;
