import { useEffect, useState } from 'react';

const ProgressLogger = () => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Waiting');
  const [end, setEnd] = useState(false);

  useEffect(() => {
    const eventSource = new EventSource('/api/events');

    // Ketika pesan diterima dari server
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setStatus(data.status);
      if (data.progress) setProgress(data.progress);
    };

    // Membersihkan koneksi SSE saat komponen unmount
    if (end) {
      eventSource.close();
    }
    return () => eventSource.close();
  }, [end]);

  return (
    <div className='flex flex-col items-center'>
      <p>Status: {status}</p>
      <p>Progress: {progress}%</p>
      <button onClick={() => setEnd(true)}>end</button>
    </div>
  );
};

export default ProgressLogger;
