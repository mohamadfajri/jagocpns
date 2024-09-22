// eslint-disable-next-line react/prop-types
const StatusBox = ({ status, message }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Waiting':
        return 'bg-yellow-100 text-yellow-700 border-yellow-400';
      case 'Processing':
        return 'bg-blue-100 text-blue-700 border-blue-400';
      case 'Success':
        return 'bg-green-100 text-green-700 border-green-400';
      case 'Failed':
        return 'bg-red-100 text-red-700 border-red-400';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-400';
    }
  };

  return (
    <div className='space-y-2'>
      <div
        className={`border-l-4 p-4 rounded-md text-center w-48 ${getStatusColor(
          status
        )}`}
      >
        <p className='text-sm font-semibold'>{status}</p>
      </div>
      {message && <p className='text-red-700'>{message}</p>}
    </div>
  );
};

export default StatusBox;
