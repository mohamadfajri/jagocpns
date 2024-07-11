import { Button, Pagination, Table } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { fetchAdmin } from '../../utils/fetchAdmin';
import { useAlert } from '../../stores/useAlert';

const FreeFormApproval = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { setAlert } = useAlert();
  const [totalPages, setTotalPages] = useState(1);
  const onPageChange = (page) => setCurrentPage(page);
  const [data, setData] = useState([
    { id: '', userId: '', email: '', tryoutListId: '' },
  ]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await fetchAdmin(`/freeform?page=${currentPage}`);
      const format = data.data.map((item) => ({
        id: item.id,
        userId: item.userId,
        email: item.user.email,
        tryoutListId: item.tryoutListId,
      }));
      setData(format);
      setTotalPages(data.totalPages);
    };
    getData();
  }, [currentPage]);

  const getData = async () => {
    const { data } = await fetchAdmin(`/freeform?page=${currentPage}`);
    const format = data.data.map((item) => ({
      id: item.id,
      userId: item.userId,
      email: item.user.email,
      tryoutListId: item.tryoutListId,
    }));
    setData(format);
    setTotalPages(data.totalPages);
  };

  const handleConfirm = async (d) => {
    try {
      const response = await fetchAdmin.post('/accform', {
        id: d.id,
        userId: d.userId,
        tryoutListId: d.tryoutListId,
      });
      setAlert({
        color: 'success',
        title: 'Sukses!',
        message: response.data.message,
      });
      await getData();
    } catch (error) {
      setAlert({
        color: 'failure',
        title: 'Error!',
        message: error.message,
      });
    }
  };

  const handleRemove = async (d) => {
    try {
      const response = await fetchAdmin.delete(`/deleteform/${d}`);
      setAlert({
        color: 'success',
        title: 'Sukses!',
        message: response.data.message,
      });
      await getData();
    } catch (error) {
      setAlert({
        color: 'failure',
        title: 'Error!',
        message: error.message,
      });
    }
  };

  const handleConfirmAll = async () => {
    try {
      const { data } = await fetchAdmin.post('/confirmallform');
      setAlert({
        color: 'success',
        title: 'Sukses!',
        message: data.message,
      });
      getData();
    } catch (error) {
      setAlert({
        color: 'failure',
        title: 'Error!',
        message: error.message,
      });
    }
  };

  const handleDeleteAll = async () => {
    try {
      const { data } = await fetchAdmin.delete('/deleteallform');
      setAlert({
        color: 'success',
        title: 'Sukses!',
        message: data.message,
      });
      getData();
    } catch (error) {
      setAlert({
        color: 'failure',
        title: 'Error!',
        message: error.message,
      });
    }
  };

  return (
    <div className='py-4 ml-64 dark:bg-black min-h-screen'>
      <div className='m-4 flex space-x-2'>
        <Button onClick={handleConfirmAll} color={'success'}>
          Accept all request
        </Button>
        <Button onClick={handleDeleteAll} color={'failure'}>
          Reject all request
        </Button>
      </div>
      <div className='overflow-x-auto'>
        <Table>
          <Table.Head>
            <Table.HeadCell>No</Table.HeadCell>
            <Table.HeadCell>email</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
          </Table.Head>
          <Table.Body className='divide-y'>
            {data.map((item, index) => (
              <Table.Row
                key={index}
                className='bg-white dark:border-gray-700 dark:bg-gray-800'
              >
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                  {item.email}
                </Table.Cell>
                <Table.Cell className='flex space-x-2'>
                  <Button
                    onClick={() =>
                      handleConfirm({
                        id: item.id,
                        userId: item.userId,
                        tryoutListId: item.tryoutListId,
                      })
                    }
                    size={'xs'}
                    color={'success'}
                  >
                    acc
                  </Button>
                  <Button
                    onClick={() => handleRemove(item.id)}
                    size={'xs'}
                    color={'failure'}
                  >
                    reject
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <Pagination
          className='mx-4'
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          showIcons
        />
      </div>
    </div>
  );
};

export default FreeFormApproval;
