/* eslint-disable react/prop-types */
import { Table } from 'flowbite-react';

const TableScore = ({ data }) => {
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
            <Table.Cell>{data.twk}</Table.Cell>
            <Table.Cell>{data.statusTwk}</Table.Cell>
          </Table.Row>
          <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
            <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
              TIU
            </Table.Cell>
            <Table.Cell>{data.tiu}</Table.Cell>
            <Table.Cell>{data.statusTiu}</Table.Cell>
          </Table.Row>
          <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
            <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
              TKP
            </Table.Cell>
            <Table.Cell>{data.tkp}</Table.Cell>
            <Table.Cell>{data.statusTkp}</Table.Cell>
          </Table.Row>
          <Table.Row className='bg-gray-100 dark:border-gray-700 dark:bg-gray-800'>
            <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
              Total
            </Table.Cell>
            <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
              {data.total}
            </Table.Cell>
            <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
              {data.statusTotal}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
};

export default TableScore;
