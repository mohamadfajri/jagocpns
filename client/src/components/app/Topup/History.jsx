import { Table } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { fetcher } from '../../../utils/fetcher';

const History = () => {
  const [data, setData] = useState([{}]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    const second = date.getSeconds().toString().padStart(2, '0');
    return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
  };

  const formatIDR = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(number);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await fetcher.get('/user/transaction/success');
        setData(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  return (
    <div className='overflow-x-auto'>
      <Table>
        <Table.Head>
          <Table.HeadCell>Tanggal</Table.HeadCell>
          <Table.HeadCell>ID Topup</Table.HeadCell>
          <Table.HeadCell>Saldo</Table.HeadCell>
        </Table.Head>
        <Table.Body className='divide-y'>
          {data.map((item, index) => (
            <Table.Row
              key={index}
              className='bg-white dark:border-gray-700 dark:bg-gray-800'
            >
              <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                {formatDate(item.date)}
              </Table.Cell>
              <Table.Cell>{item.description}</Table.Cell>
              <Table.Cell>{formatIDR(item.amount)}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default History;
