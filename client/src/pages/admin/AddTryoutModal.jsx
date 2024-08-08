import { Button, Modal, Select } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { fetchAdmin } from '../../utils/fetchAdmin';
import { useAlert } from '../../stores/useAlert';

// eslint-disable-next-line react/prop-types
const AddTryoutModal = ({ isOpen, userId, setStatus }) => {
  const [openModal, setOpenModal] = useState(false);
  const [list, setList] = useState({});
  const [data, setData] = useState([]);
  const { setAlert } = useAlert();

  useEffect(() => {
    const getData = async () => {
      const { data } = await fetchAdmin.get(`/tryout`);
      setData(data.data);
    };
    getData();
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setList(e.target.value);
  };

  useEffect(() => {
    if (isOpen === true) {
      setOpenModal(true);
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    try {
      const { data } = await fetchAdmin.post('/addTryout', {
        userId,
        tryoutListId: list,
      });
      setOpenModal(false);
      setAlert({ title: 'Sukses!', message: data.message, color: 'success' });
      setStatus(true);
    } catch (error) {
      setAlert({
        title: 'Gagal',
        message: error.response.data.message,
        color: 'failure',
      });
    }
  };
  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Toggle modal</Button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Add Tryout To User</Modal.Header>
        <Modal.Body>
          <Select id='tryout' onChange={handleChange} required>
            <option>Pilih Tryout</option>
            {data.map((item, index) => (
              <option key={index} value={item.id}>
                {item.title}
              </option>
            ))}
          </Select>
        </Modal.Body>
        <Modal.Footer>
          <Button color={'success'} onClick={handleSubmit}>
            Save
          </Button>
          <Button
            color='gray'
            onClick={() => {
              setOpenModal(false);
              setStatus(true);
            }}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddTryoutModal;
