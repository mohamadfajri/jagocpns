import { Button, Modal } from 'flowbite-react';
import { useEffect, useState } from 'react';
import popup from '../../assets/images/popup.png';
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
      <Modal size={'7xl'} show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Tryout Gratis</Modal.Header>
        <Modal.Body>
          <div className='space-y-6'>
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
