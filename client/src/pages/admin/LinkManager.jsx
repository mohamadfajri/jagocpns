import {
  Button,
  Drawer,
  FileInput,
  Label,
  Table,
  TextInput,
} from 'flowbite-react';
import { useEffect, useState } from 'react';
import { fetchAdmin } from '../../utils/fetchAdmin';
import { useAlert } from '../../stores/useAlert';

const LinkManager = () => {
  const [data, setData] = useState([{}]);
  const { setAlert } = useAlert();
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState(null);

  const handleClose = () => setIsOpen(false);

  useEffect(() => {
    try {
      const getData = async () => {
        const { data } = await fetchAdmin.get('/links');
        setData(data);
      };
      getData();
    } catch (error) {
      console.error(error);
    }
  }, []);
  const getData = async () => {
    const { data } = await fetchAdmin.get('/links');
    setData(data);
  };
  const handleRemove = async (id) => {
    try {
      const { data } = await fetchAdmin.delete(`/link/${id}`);
      setAlert({ title: 'Success', message: data.message, color: 'success' });
      getData();
    } catch (error) {
      setAlert({ title: 'Failed', message: error.response.data.message });
    }
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setImageUrl(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await fetchAdmin.post(
        '/link',
        {
          title,
          url,
          image: imageUrl,
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setUrl('');
      setTitle('');
      setImageUrl('');
      setIsOpen(false);
      getData();
      setAlert({ title: 'Success', message: data.message, color: 'success' });
    } catch (error) {
      setAlert({
        title: 'Failed',
        message: error.response.data.message,
        color: 'failure',
      });
    }
  };
  return (
    <div className='py-4 ml-64 dark:bg-black min-h-screen'>
      <Button color={'success'} className='m-4' onClick={() => setIsOpen(true)}>
        New Link
      </Button>
      <Drawer open={isOpen} onClose={handleClose} position='right'>
        <Drawer.Header title='New Link' />
        <Drawer.Items>
          <form onSubmit={handleSubmit} className='max-w-md mx-auto'>
            <div className='mb-4'>
              <Label htmlFor='url' value='URL' />
              <TextInput
                id='url'
                type='text'
                placeholder='Enter URL'
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
            </div>
            <div className='mb-4'>
              <Label htmlFor='title' value='Title' />
              <TextInput
                id='title'
                type='text'
                placeholder='Enter Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className='mb-4'>
              <Label htmlFor='imageUrl' value='Image' />
              <FileInput type='file' id='imageUrl' onChange={handleFile} />
            </div>
            <Button color={'success'} type='submit'>
              Submit
            </Button>
          </form>
        </Drawer.Items>
      </Drawer>
      <div className='overflow-x-auto'>
        <Table>
          <Table.Head>
            <Table.HeadCell>No</Table.HeadCell>
            <Table.HeadCell>Image</Table.HeadCell>
            <Table.HeadCell>Title</Table.HeadCell>
            <Table.HeadCell>URL</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
          </Table.Head>
          <Table.Body className='divide-y'>
            {data?.map((item, index) => (
              <Table.Row
                key={index}
                className='bg-white dark:border-gray-700 dark:bg-gray-800'
              >
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                  <img className='h-8' src={item.imageUrl} alt='image' />
                </Table.Cell>
                <Table.Cell>{item.title}</Table.Cell>
                <Table.Cell>{item.url}</Table.Cell>
                <Table.Cell className='flex space-x-2'>
                  <Button
                    onClick={() => handleRemove(item.id)}
                    size={'xs'}
                    color={'failure'}
                  >
                    delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default LinkManager;
