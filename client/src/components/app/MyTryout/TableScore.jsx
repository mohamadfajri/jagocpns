import { Table } from 'flowbite-react';

const TableScore = () => {
  return (
    <div className='overflow-x-auto'>
      <Table>
        <Table.Head>
          <Table.HeadCell>Jenis</Table.HeadCell>
          <Table.HeadCell>Nilai</Table.HeadCell>
          <Table.HeadCell>Keterangan</Table.HeadCell>
        </Table.Head>
        <Table.Body className='divide-y'>
          <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
            <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
              TWK
            </Table.Cell>
            <Table.Cell>65</Table.Cell>
            <Table.Cell>LULUS</Table.Cell>
          </Table.Row>
          <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
            <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
              TIU
            </Table.Cell>
            <Table.Cell>80</Table.Cell>
            <Table.Cell>LULUS</Table.Cell>
          </Table.Row>
          <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
            <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
              TKP
            </Table.Cell>
            <Table.Cell>166</Table.Cell>
            <Table.Cell>LULUS</Table.Cell>
          </Table.Row>
          <Table.Row className='bg-gray-100 dark:border-gray-700 dark:bg-gray-800'>
            <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
              Total
            </Table.Cell>
            <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
              311
            </Table.Cell>
            <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
              LULUS
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
};

export default TableScore;
