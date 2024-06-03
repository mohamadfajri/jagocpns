import { Drawer, Label, Modal, TextInput, theme } from 'flowbite-react';
import { HiShoppingCart } from 'react-icons/hi';
import { twMerge } from 'tailwind-merge';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

const CheckoutBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isJoin, setIsJoin] = useState(false);
  const [lists, setLists] = useState([
    { id: 1, email: 'asepbensin@gmail.com' },
    { id: 2, email: 'benitomussolini@gmail.com' },
    { id: 4, email: 'adolfhitler@gmail.com' },
  ]);
  const [newEmail, setNewEmail] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      navigate('/app/tryoutstore');
    }, 200);
  };

  const handleRemove = (id) => {
    setLists((prevLists) => prevLists.filter((list) => list.id !== id));
  };
  const handleAdd = () => {
    if (newEmail.trim() !== '') {
      const newId = lists.length > 0 ? lists[lists.length - 1].id + 1 : 1;
      setLists([...lists, { id: newId, email: newEmail }]);
      setNewEmail('');
    }
  };

  const location = useLocation();
  const navigate = useNavigate();

  const handleJoin = () => {
    setIsJoin(!isJoin);
  };

  useEffect(() => {
    const pathRegex = /^\/app\/tryoutstore\/\d+$/;
    if (pathRegex.test(location.pathname)) {
      setIsOpen(true);
    }
  }, [location.pathname]);

  return (
    <>
      <Drawer open={isOpen} onClose={handleClose}>
        <Drawer.Header title='Checkout' titleIcon={HiShoppingCart} />
        <Drawer.Items>
          <form action='#'>
            <div className='mb-6 mt-3'>
              <Label htmlFor='title' className='mb-2 block'>
                Judul Tryout
              </Label>
              <div className='border rounded-lg p-2 font-medium'>
                <h1>Tryout 1</h1>
              </div>
            </div>
            <div className='mb-6'>
              <Label htmlFor='description' className='mb-2 block'>
                Deskripsi
              </Label>
              <div className='border rounded-lg p-2 font-medium'>
                <p>SKD blablablablablabl 1 Juli 2024 - 5 Juli 2024</p>
              </div>
            </div>
            <div className='mb-6'>
              <Label htmlFor='description' className='mb-2 block'>
                Total Harga
              </Label>
              <div className='border rounded-lg p-2 font-medium'>
                <p>Rp 32.000</p>
              </div>
            </div>
            <label className='inline-flex items-center cursor-pointer my-4'>
              <input
                type='checkbox'
                value={isJoin}
                onChange={handleJoin}
                className='sr-only peer'
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
              <span className='ms-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
                Beli 5
              </span>
            </label>

            {isJoin && (
              <div className='mb-6'>
                <div className='mb-2'>
                  <TextInput
                    disabled={lists.length >= 4}
                    id='guests'
                    name='guests'
                    placeholder='Masukan 4 email peserta lain'
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    type='search'
                    rightIcon={() => (
                      <button
                        disabled={lists.length >= 4}
                        onClick={handleAdd}
                        size='sm'
                        className='[&>span]:items-center [&>span]:px-2 [&>span]:py-0 flex font-medium text-sm border py-1 px-2 rounded-lg bg-[#155E75] text-white'
                      >
                        Add
                      </button>
                    )}
                    theme={{
                      field: {
                        rightIcon: {
                          base: twMerge(
                            theme.textInput.field.rightIcon.base,
                            'pointer-events-auto'
                          ),
                        },
                      },
                    }}
                  />
                </div>
                <div>
                  <ul className='flex flex-col space-y-2'>
                    {lists.map((list) => (
                      <li key={list.id} className='flex flex-row'>
                        <span className='bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300'>
                          {list.email}
                        </span>
                        <button
                          type='button'
                          className='bg-gray-100 rounded-lg'
                          onClick={() => handleRemove(list.id)}
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 24 24'
                            fill='currentColor'
                            className='size-6'
                          >
                            <path
                              fillRule='evenodd'
                              d='M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z'
                              clipRule='evenodd'
                            />
                          </svg>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            <button
              disabled={!(lists.length === 4) && isJoin}
              type='button'
              onClick={() => setOpenModal(true)}
              className='font-medium bg-jago-4 hover:bg-orange-600 rounded-lg disabled:cursor-not-allowed disabled:hover:bg-gray-300 disabled:bg-gray-300 text-white flex py-2 px-4'
            >
              Buat Pesanan
            </button>
          </form>
        </Drawer.Items>
        <Modal
          show={openModal}
          size='md'
          onClose={() => setOpenModal(false)}
          popup
        >
          <Modal.Header />
          <Modal.Body>
            <div className='text-center'>
              <HiOutlineExclamationCircle className='mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200' />
              <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
                Pesanan anda sudah benar?
              </h3>
              <div className='flex justify-center gap-4'>
                <button
                  onClick={() => setOpenModal(false)}
                  className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                >
                  Lanjutkan
                </button>
                <button
                  onClick={() => setOpenModal(false)}
                  className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'
                >
                  Batalkan
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </Drawer>
    </>
  );
};

export default CheckoutBar;
