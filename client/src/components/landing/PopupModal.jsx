import { Button, Modal } from 'flowbite-react';
import { useEffect, useState } from 'react';
import popup from '../../assets/images/popup.jpg';
import useAuth from '../../stores/useAuth';
import { useNavigate } from 'react-router-dom';

const PopupModal = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    if (!token) {
      setOpenModal(true);
    }
  }, [token]);

  return (
    <>
      <Modal size={'xl'} show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Tryout Premium 02</Modal.Header>
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
