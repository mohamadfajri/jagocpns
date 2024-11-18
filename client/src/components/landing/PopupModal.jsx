import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';
import popup from '../../assets/images/popupLanding.jpg';
import { useNavigate } from 'react-router-dom';

const PopupModal = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(true);

  return (
    <>
      <Modal size={'xl'} show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>{`Tryout SKB (Semua Formasi) 2024`}</Modal.Header>
        <Modal.Body>
          <div className='space-y-6 flex justify-center'>
            <img src={popup} alt='' />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            color={'success'}
            onClick={() => {
              setOpenModal(false);
              navigate('/auth/signup');
            }}
          >
            Daftar
          </Button>
          <Button color='failure' onClick={() => setOpenModal(false)}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default PopupModal;
