import { Table } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { fetchQuestioner } from '../../utils/fetchQuestioner';
import { useEffect, useState } from 'react';

const QuestionerTable = () => {
  const [data, setData] = useState([{}]);

  const fetchData = async () => {
    const response = await fetchQuestioner.get('/tryoutlist');
    setData(response.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);
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
          {data.map((item) => (
            <Table.Row
              key={item.id}
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
    </div>
  );
};

export default QuestionerTable;
