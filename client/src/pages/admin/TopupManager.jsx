import {
  Alert,
  Button,
  Modal,
  Pagination,
  Spinner,
  Table,
  TextInput,
} from 'flowbite-react';
import { useEffect, useState } from 'react';
import { fetchAdmin } from '../../utils/fetchAdmin';
import { useAlert } from '../../stores/useAlert';

const TopupManager = () => {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState([{}]);
  const [detail, setDetail] = useState({});
  const [acc, setAcc] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState({ email: '', unique: '' });
  const { setAlert } = useAlert();

  const formatIDR = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(number);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await fetchAdmin(`/transaction?page=${currentPage}`);
        setTotalPage(data.meta.totalPages);
        setData(data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setAlert({
          title: 'Error!',
          message: error.response.data.message,
          color: 'failure',
        });
      }
    };
    fetchData();
  }, [currentPage, setAlert]);

  const handleAcept = () => {
    setAcc(true);
  };
  const handleReject = async (id) => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await fetchAdmin(`/transaction?page=${currentPage}`);
        setTotalPage(data.meta.totalPages);
        setData(data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setAlert({
          title: 'Error!',
          message: error.response.data.message,
          color: 'failure',
        });
      }
    };
    try {
      const { data } = await fetchAdmin.delete(`/transaction/${id}`);
      setAlert({
        title: 'Sukses!',
        message: data.message,
        color: 'success',
      });
      fetchData();
    } catch (error) {
      setAlert({
        title: 'Gagal!',
        message: error.response.data.message,
        color: 'failure',
      });
    }
  };

  useEffect(() => {
    let timer;
    if (acc) {
      timer = setTimeout(() => {
        if (!cancel) {
          const acceptData = async () => {
            try {
              const getData = async () => {
                const { data } = await fetchAdmin(
                  `/transaction?page=${currentPage}`
                );
                setTotalPage(data.meta.totalPages);
                setData(data.data);
              };
              await fetchAdmin.post(`/transaction`, { id: detail.id });
              getData();
            } catch (error) {
              console.error('Failed to accept transaction:', error);
            }
          };
          acceptData();
          setAcc(false);
        }
      }, 2000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [acc, cancel, detail, currentPage]);

  const handleCancel = () => {
    setCancel(true);
    setAcc(false);
  };

  const searchEmail = async () => {
    const { data } = await fetchAdmin(
      `/transaction?page=${currentPage}&email=${search.email}&unique=${search.unique}`
    );
    setTotalPage(data.meta.totalPages);
    setData(data.data);
  };

  const handleEmailEnter = (event) => {
    if (event.key === 'Enter') {
      searchEmail();
    }
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    const id = event.target.id;
    setSearch((prev) => ({ ...prev, [id]: value }));
  };
  const onPageChange = (page) => setCurrentPage(page);

  return (
    <div className='py-4 ml-64 dark:bg-black min-h-screen'>
      <div className='mb-8 mx-4'>
        <h1 className='text-2xl font-semibold'>Top Up Manager</h1>
      </div>
      <div className='flex'>
        <div className='max-w-md mb-8 mx-4'>
          <TextInput
            placeholder='Search by email'
            id='email'
            type='text'
            sizing='md'
            onChange={handleSearchChange}
            onKeyDown={handleEmailEnter}
          />
        </div>
        <div className='max-w-md mb-8 mx-4'>
          <TextInput
            placeholder='Search by unique code'
            id='unique'
            type='text'
            sizing='md'
            onChange={handleSearchChange}
            onKeyDown={handleEmailEnter}
          />
        </div>
      </div>
      <div className='overflow-x-auto'>
        {loading ? (
          <div className='ml-6'>
            <Spinner aria-label='spinner' /> <span>Loading</span>
          </div>
        ) : (
          <Table striped>
            <Table.Head>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Unique Code</Table.HeadCell>
              <Table.HeadCell>Amount</Table.HeadCell>
              <Table.HeadCell>Detail</Table.HeadCell>
              <Table.HeadCell>Action</Table.HeadCell>
            </Table.Head>
            <Table.Body className='divide-y'>
              {data.length === 0 ? (
                data?.map((item, index) => (
                  <Table.Row
                    key={index}
                    className='bg-white dark:border-gray-700 dark:bg-gray-800'
                  >
                    <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                      {item.name}
                    </Table.Cell>
                    <Table.Cell>{item.email}</Table.Cell>
                    <Table.Cell>{item.unique}</Table.Cell>
                    <Table.Cell>{formatIDR(item.amount)}</Table.Cell>
                    <Table.Cell>
                      <button
                        onClick={() => {
                          setDetail(item);
                          setOpenModal(true);
                        }}
                        className='text-blue text-blue-500 hover:underline'
                      >
                        Lihat Bukti Transfer
                      </button>
                    </Table.Cell>
                    <Table.Cell>
                      <ul className='flex space-x-2'>
                        <li>
                          <Button
                            onClick={() => {
                              setDetail(item);
                              handleAcept();
                            }}
                            color={'blue'}
                            size={'xs'}
                          >
                            Accept
                          </Button>
                        </li>
                        <li>
                          <Button
                            onClick={() => {
                              handleReject(item.id);
                            }}
                            color={'failure'}
                            size={'xs'}
                          >
                            Reject
                          </Button>
                        </li>
                      </ul>
                    </Table.Cell>
                  </Table.Row>
                ))
              ) : (
                <h1 className='text-center'>Belum ada transaksi</h1>
              )}
            </Table.Body>
          </Table>
        )}
      </div>
      <div className='flex overflow-x-auto sm:justify-center mt-8'>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPage}
          onPageChange={onPageChange}
          showIcons
        />
      </div>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Body>
          <div>
            <img src={detail.bukti} alt='image' />
          </div>
        </Modal.Body>
      </Modal>
      {acc && (
        <div className='fixed bottom-4 right-4'>
          <Alert color='success' onDismiss={() => setAcc(false)}>
            <div className='flex justify-between items-center space-x-6'>
              <div>
                <span>
                  {' '}
                  Saldo{' '}
                  <strong className='font-semibold'>
                    {' '}
                    {formatIDR(detail.amount)}
                  </strong>{' '}
                  ditambahkan ke <strong>{detail.name}</strong>
                </span>
              </div>
              <div>
                <button
                  onClick={handleCancel}
                  className='underline rounded-lg text-green-600 hover:bg-green-200 p-2'
                >
                  UNDO
                </button>
              </div>
            </div>
          </Alert>
        </div>
      )}
    </div>
  );
};

export default TopupManager;
