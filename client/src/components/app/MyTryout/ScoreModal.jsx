import { Modal } from 'flowbite-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TableScore from './TableScore';

const ScoreModal = () => {
  const [openModal, setOpenModal] = useState(true);

  const navigate = useNavigate();
  const handleBack = () => {
    setOpenModal(false);
    navigate('/app/mytryouts');
  };

  return (
    <>
      <Modal dismissible show={openModal} onClose={handleBack}>
        <Modal.Header>Nilai Tryout</Modal.Header>
        <Modal.Body>
          <div className='mb-6'>
            <h1 className='font-semibold'>Syarat Kelulusan</h1>
            <ul>
              <li>TWK : 65</li>
              <li>TIU : 80</li>
              <li>TKP : 166</li>
            </ul>
          </div>
          <div className='mb-4'>
            <div className='flex space-x-2'>
              <h1 className='font-semibold'>Judul :</h1>
              <p className='font-normal'>Tryout 1</p>
            </div>
            <div className='flex space-x-2'>
              <h1 className='font-semibold'>Ranking :</h1>
              <p className='font-normal'>5 dari 10</p>
            </div>
          </div>
          <TableScore />
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={handleBack}
            className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            Lihat pembahasan
          </button>
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

export default ScoreModal;
