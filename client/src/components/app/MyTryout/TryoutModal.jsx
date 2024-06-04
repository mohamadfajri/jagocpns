import { Modal } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const TryoutModal = () => {
  const [openModal, setOpenModal] = useState(true);
  const [countdown, setCountdown] = useState(5);

  const navigate = useNavigate();
  const location = useLocation();
  const pathParts = location.pathname.split('/');
  const id = pathParts[pathParts.length - 1];

  const handleBack = () => {
    setOpenModal(false);
    navigate('/app/mytryouts');
  };

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [countdown]);

  return (
    <>
      <Modal dismissible show={openModal} onClose={handleBack}>
        <Modal.Header>Mulai Tryout ?</Modal.Header>
        <Modal.Body>
          <div className='mb-6'>
            <h1 className='font-semibold'>Syarat Kelulusan</h1>
            <ul>
              <li>TWK : 65</li>
              <li>TIU : 80</li>
              <li>TKP : 166</li>
            </ul>
          </div>
          <div>
            <ul className='my-6'>
              <li>Waktu : 100 Menit</li>
              <li>Jumlah Soal : 40</li>
            </ul>
            <p>
              Tryout hanya dapat dikerjakan sekali pastikan anda benar-benar
              siap untuk mengerjakan, semoga berhasil
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {countdown !== 0 ? (
            <button
              disabled
              onClick={handleBack}
              className='inline-flex items-center px-8 py-2 text-sm font-medium text-center text-gray-800 rounded-lg bg-gray-300'
            >
              {countdown}
            </button>
          ) : (
            <Link
              to={`/start-tryout/${id}`}
              className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            >
              Mulai
            </Link>
          )}
          <button
            onClick={handleBack}
            className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'
          >
            Kembali
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TryoutModal;
