import { Drawer, Label, Modal, TextInput, theme } from 'flowbite-react';
import { HiShoppingCart } from 'react-icons/hi';
import { twMerge } from 'tailwind-merge';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { fetcher } from '../utils/fetcher';
import { useAlert } from '../stores/useAlert';

const CheckoutBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isJoin, setIsJoin] = useState(false);
  const [lists, setLists] = useState([{}]);
  const [newEmail, setNewEmail] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState({});
  const { setAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [qty, setQty] = useState('');

  useEffect(() => {
    const getMine = async () => {
      const { data } = await fetcher('/user');
      setLists([
        {
          id: data.userId,
          email: data.email,
        },
      ]);
      console.log(data);
    };
    getMine();
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      navigate('/app/tryoutstore');
    }, 200);
  };

  const handleRemove = (id) => {
    setLists((prevLists) => prevLists.filter((list) => list.id !== id));
    console.log(lists);
  };
  const handleAdd = async (e) => {
    e.preventDefault();
    if (newEmail.trim() !== '') {
      try {
        const { data } = await fetcher.get(`/user/search?email=${newEmail}`);
        setLists([...lists, { id: data.id, email: data.email }]);
        console.log(lists);
      } catch (error) {
        setAlert({
          title: 'Error!',
          message: error.response.data.message,
          color: 'failure',
        });
      }
      setNewEmail('');
    }
  };

  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const handleJoin = () => {
    setIsJoin(!isJoin);
  };

  const formatIDR = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(number);
  };

  useEffect(() => {
    const pathRegex = /^\/app\/tryoutstore\/\d+$/;
    if (pathRegex.test(location.pathname)) {
      setIsOpen(true);
    }
  }, [location.pathname]);

  useEffect(() => {
    const getTryoutById = async () => {
      const { data } = await fetcher(`/public/tryout/${id}`);
      setData(data);
    };
    getTryoutById();
  }, [id]);

  const handleChange = async (e) => {
    setNewEmail(e.target.value);
  };

  const handleQty = (e) => {
    const value = e.target.value;
    if (value >= 0) {
      setQty(value);
    }
  };

  const handleCheckout = async () => {
    if (isJoin && qty < 5) {
      setAlert({
        title: 'Error',
        message: 'Jumlah minimal beli banyak adalah 5',
        color: 'failure',
      });
      return;
    }

    try {
      setLoading(true);
      const { data } = await fetcher.post('/user/checkout', {
        target: lists,
        tryoutListId: id,
      });
      setAlert({ title: 'Sukses!', message: data.message, color: 'success' });
      setLoading(false);
    } catch (error) {
      setAlert({
        title: 'Gagal!',
        message: error.response.data.message,
        color: 'failure',
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log({ qty });
  }, [qty]);

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
                <h1>{data.title}</h1>
              </div>
            </div>
            <div className='mb-6'>
              <Label htmlFor='description' className='mb-2 block'>
                Deskripsi
              </Label>
              <div className='border rounded-lg p-2 font-medium'>
                <p>{data.description}</p>
              </div>
            </div>
            <div className='mb-6'>
              <Label htmlFor='description' className='mb-2 block'>
                Total Harga
              </Label>
              <div className='border rounded-lg p-2 font-medium'>
                <p className={isJoin && qty < 5 ? 'text-red-500' : ''}>
                  {isJoin && qty < 5
                    ? 'Minimal beli banyak adalah 5 user'
                    : isJoin
                    ? formatIDR((data.price * qty) / 2)
                    : formatIDR(data.price)}
                </p>
              </div>   
            </div>
            <div className='max-w-md mx-auto text-sm'>
              <table className='table-auto w-full border border-gray-300'>
                <thead>
                  <tr>
                    <th
                      colSpan='2'
                      className='px-4 py-2 text-center bg-gray-100 font-semibold border-b border-gray-300'
                    >
                      Harga Tryout
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='px-4 py-2 border-b border-gray-300'>
                      1-4 Orang
                    </td>
                    <td className='px-4 py-2 border-b border-gray-300 border-l'>
                      Rp 20.000/orang
                    </td>
                  </tr>
                  <tr>
                    <td className='px-4 py-2 border-b border-gray-300'>
                      5-100 Orang
                    </td>
                    <td className='px-4 py-2 border-l'>Rp 10.000/orang</td>
                  </tr>
                </tbody>
              </table>
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
                Beli Banyak
              </span>
            </label>

            {isJoin && (
              <div className='mb-6'>
                <div className='my-2'>
                  <p>Jumlah</p>
                  <TextInput
                    type='number'
                    value={qty}
                    placeholder='Jumlah'
                    name='qty'
                    id='qty'
                    onChange={handleQty}
                  />
                </div>
                <div className='mb-2'>
                  <TextInput
                    disabled={lists?.length >= qty}
                    id='guests'
                    name='guests'
                    placeholder={`Masukan ${
                      !qty ? '' : `${qty - 1} `
                    }email peserta lain`}
                    value={newEmail}
                    onChange={handleChange}
                    type='search'
                    rightIcon={() => (
                      <button
                        disabled={lists?.length >= qty}
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
                    {lists.map((list, index) => (
                      <li key={index} className='flex flex-row'>
                        <span className='bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300'>
                          {list.email?.length > 25
                            ? list.email.slice(0, 25) + '...'
                            : list.email}
                        </span>
                        <button
                          disabled={index === 0}
                          type='button'
                          className='bg-gray-100 rounded-lg disabled:hidden'
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
              disabled={(lists?.length < 2 && isJoin) || loading}
              type='button'
              onClick={() => {
                setOpenModal(true);
              }}
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
                  onClick={() => {
                    setOpenModal(false);
                    handleCheckout();
                  }}
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
