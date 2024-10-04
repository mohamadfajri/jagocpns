import { Table } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { fetchQuestioner } from '../../utils/fetchQuestioner';
import { useEffect, useState } from 'react';

const QuestionerTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const fetchData = async (page) => {
    const response = await fetchQuestioner.get(
      `/tryoutlist?page=${page}&limit=${limit}`
    );
    setData(response.data.data);
    setTotalPages(response.data.meta.totalPages);
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className='overflow-x-auto'>
      <Table striped>
        <Table.Head>
          <Table.HeadCell>Judul</Table.HeadCell>
          <Table.HeadCell>Deskripsi</Table.HeadCell>
          <Table.HeadCell>Harga</Table.HeadCell>
          <Table.HeadCell>Action</Table.HeadCell>
        </Table.Head>
        <Table.Body className='divide-y'>
          {data.map((item, index) => (
            <Table.Row
              key={index}
              className='bg-white dark:border-gray-700 dark:bg-gray-800'
            >
              <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                {item.title}
              </Table.Cell>
              <Table.Cell>{item.description}</Table.Cell>
              <Table.Cell>{item.price}</Table.Cell>
              <Table.Cell>
                <Link
                  to={`/questioner/editor/${item.id}`}
                  className='font-medium text-cyan-600 hover:underline dark:text-cyan-500'
                >
                  Edit
                </Link>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      {/* Pagination Controls */}
      <div className='flex justify-between mt-4'>
        <button
          className={`px-4 py-2 ${
            currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''
          }`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className={`px-4 py-2 ${
            currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''
          }`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default QuestionerTable;
