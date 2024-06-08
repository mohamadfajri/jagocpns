import {
  Button,
  Drawer,
  Modal,
  Pagination,
  Table,
  TextInput,
} from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useState } from 'react';

const TopupManager = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleClose = () => setIsOpen(false);
  return (
    <div className='py-4 ml-64 dark:bg-black min-h-screen'>
      <div className='mb-8 mx-4'>
        <h1 className='text-2xl font-semibold'>Top Up Manager</h1>
      </div>
      <div className='flex'>
        <div className='max-w-md mb-8 mx-4'>
          <TextInput
            placeholder='Search by email'
            id='base'
            type='text'
            sizing='md'
          />
        </div>
        <div className='max-w-md mb-8 mx-4'>
          <TextInput
            placeholder='Search by unique code'
            id='base'
            type='text'
            sizing='md'
          />
        </div>
      </div>
      <div className='overflow-x-auto'>
        <Table striped>
          <Table.Head>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Unique Code</Table.HeadCell>
            <Table.HeadCell>Amount</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
          </Table.Head>
          <Table.Body className='divide-y'>
            <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
              <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                {'Apple MacBook Pro 17"'}
              </Table.Cell>
              <Table.Cell>Sliver</Table.Cell>
              <Table.Cell>Laptop</Table.Cell>
              <Table.Cell>$2999</Table.Cell>
              <Table.Cell>
                <ul className='flex space-x-2'>
                  <li>
                    <Button
                      onClick={() => setIsOpen(true)}
                      color={'blue'}
                      size={'xs'}
                    >
                      Accept
                    </Button>
                  </li>
                  <li>
                    <Button
                      onClick={() => setOpenModal(true)}
                      color={'failure'}
                      size={'xs'}
                    >
                      Reject
                    </Button>
                  </li>
                </ul>
              </Table.Cell>
            </Table.Row>
            <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
              <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                Microsoft Surface Pro
              </Table.Cell>
              <Table.Cell>White</Table.Cell>
              <Table.Cell>Laptop PC</Table.Cell>
              <Table.Cell>$1999</Table.Cell>
              <Table.Cell>
                <ul className='flex space-x-2'>
                  <li>
                    <Button
                      onClick={() => setIsOpen(true)}
                      color={'blue'}
                      size={'xs'}
                    >
                      Accept
                    </Button>
                  </li>
                  <li>
                    <Button
                      onClick={() => setOpenModal(true)}
                      color={'failure'}
                      size={'xs'}
                    >
                      Reject
                    </Button>
                  </li>
                </ul>
              </Table.Cell>
            </Table.Row>
            <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
              <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                Magic Mouse 2
              </Table.Cell>
              <Table.Cell>Black</Table.Cell>
              <Table.Cell>Accessories</Table.Cell>
              <Table.Cell>$99</Table.Cell>
              <Table.Cell>
                <ul className='flex space-x-2'>
                  <li>
                    <Button
                      onClick={() => setIsOpen(true)}
                      color={'blue'}
                      size={'xs'}
                    >
                      Accept
                    </Button>
                  </li>
                  <li>
                    <Button
                      onClick={() => setOpenModal(true)}
                      color={'failure'}
                      size={'xs'}
                    >
                      Reject
                    </Button>
                  </li>
                </ul>
              </Table.Cell>
            </Table.Row>
            <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
              <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                Google Pixel Phone
              </Table.Cell>
              <Table.Cell>Gray</Table.Cell>
              <Table.Cell>Phone</Table.Cell>
              <Table.Cell>$799</Table.Cell>
              <Table.Cell>
                <ul className='flex space-x-2'>
                  <li>
                    <Button
                      onClick={() => setIsOpen(true)}
                      color={'blue'}
                      size={'xs'}
                    >
                      Accept
                    </Button>
                  </li>
                  <li>
                    <Button
                      onClick={() => setOpenModal(true)}
                      color={'failure'}
                      size={'xs'}
                    >
                      Reject
                    </Button>
                  </li>
                </ul>
              </Table.Cell>
            </Table.Row>
            <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
              <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                Apple Watch 5
              </Table.Cell>
              <Table.Cell>Red</Table.Cell>
              <Table.Cell>Wearables</Table.Cell>
              <Table.Cell>$999</Table.Cell>
              <Table.Cell>
                <ul className='flex space-x-2'>
                  <li>
                    <Button
                      onClick={() => setIsOpen(true)}
                      color={'blue'}
                      size={'xs'}
                    >
                      Accept
                    </Button>
                  </li>
                  <li>
                    <Button
                      onClick={() => setOpenModal(true)}
                      color={'failure'}
                      size={'xs'}
                    >
                      Reject
                    </Button>
                  </li>
                </ul>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
      <div className='flex overflow-x-auto sm:justify-center mt-8'>
        <Pagination
          currentPage={1}
          totalPages={100}
          onPageChange={() => {
            console.log('changed');
          }}
          showIcons
        />
      </div>
      <Drawer open={isOpen} onClose={handleClose} position='right'>
        <Drawer.Header title='Drawer' />
        <Drawer.Items>
          <p className='mb-6 text-sm text-gray-500 dark:text-gray-400'>
            Supercharge your hiring by taking advantage of our&nbsp;
            <a
              href='#'
              className='text-cyan-600 underline hover:no-underline dark:text-cyan-500'
            >
              limited-time sale
            </a>
            &nbsp;for Flowbite Docs + Job Board. Unlimited access to over 190K
            top-ranked candidates and the #1 design job board.
          </p>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <a
              href='#'
              className='rounded-lg border border-gray-200 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-cyan-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700'
            >
              Learn more
            </a>
            <a
              href='#'
              className='inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800'
            >
              Get access&nbsp;
              <svg
                className='ms-2 h-3.5 w-3.5 rtl:rotate-180'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 14 10'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M1 5h12m0 0L9 1m4 4L9 9'
                />
              </svg>
            </a>
          </div>
        </Drawer.Items>
      </Drawer>
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
              Are you sure you want to delete this user?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={() => setOpenModal(false)}>
                {"Yes, I'm sure"}
              </Button>
              <Button color='gray' onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TopupManager;
