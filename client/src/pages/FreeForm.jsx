import { useState } from 'react';
import { Button, FileInput } from 'flowbite-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo-extend.png';
import { fetcher } from '../utils/fetcher';
import { useAlert } from '../stores/useAlert';

const FreeForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { setAlert } = useAlert();
  const [files, setFiles] = useState({});

  const handleSubmit = async () => {
    try {
      await fetcher.post(`/user/free/${id}`);
      setAlert({
        color: 'success',
        title: 'Sukses!',
        message: 'Sedang diverifikasi',
      });
      navigate('/app/mytryouts');
    } catch (error) {
      setAlert({
        color: 'failure',
        title: 'Error',
        message: error.message,
      });
    }
  };

  const handleFileChange = (event, key) => {
    setFiles({
      ...files,
      [key]: event.target.files[0],
    });
  };

  const allFilesSelected = Object.keys(files).length === 3;

  const year = new Date().getFullYear();
  return (
    <div className='flex flex-col h-screen justify-between pt-8'>
      <div className='flex items-center'>
        <div className='w-full'>
          <img src={logo} alt='jagocpns' className='mx-auto h-24' />
          <div className='flex flex-col sm:flex-row justify-between p-8 mx-auto shadow-md rounded-lg max-w-screen-lg'>
            <div className='space-y-2'>
              <h1 className='text-lg font-semibold my-4'>
                Tryout Gratis JagoCPNS
              </h1>
              <div className='border-b'></div>
              <p className='font-medium my-2'>Persyaratan</p>
              <ul className='space-y-1'>
                <li>
                  Follow Account Instagram Berikut :
                  <span className='text-jago-4 hover:underline'>
                    <Link to={'#'}> jagocpnsid</Link>
                  </span>
                </li>
                <li>
                  Comment dan Tag 5 Teman Kamu di :
                  <span className='text-jago-4 hover:underline'>
                    <Link to={'#'}> postingan ini</Link>
                  </span>
                </li>
                <li>
                  Upload/Repost ke Story Instagram Kamu :
                  <span className='text-jago-4 hover:underline'>
                    <Link to={'#'}> postingan ini</Link>
                  </span>
                </li>
              </ul>
            </div>
            <div className='space-y-2'>
              <h1 className='text-lg font-medium my-8'>
                Upload Bukti Persyaratan
              </h1>
              <ul className='space-y-1'>
                <li>
                  Follow Account Instagram Berikut :
                  <span className='text-jago-4 hover:underline my-2'>
                    <Link to={'#'}> jagocpnsid</Link>
                  </span>
                  <FileInput
                    size={'sm'}
                    id='file-upload-1'
                    onChange={(e) => handleFileChange(e, 'file1')}
                  />
                </li>
                <li>
                  Comment dan Tag 5 Teman Kamu di :
                  <span className='text-jago-4 hover:underline my-2'>
                    <Link to={'#'}> postingan ini</Link>
                  </span>
                  <FileInput
                    size={'sm'}
                    id='file-upload-2'
                    onChange={(e) => handleFileChange(e, 'file2')}
                  />
                </li>
                <li>
                  Upload/Repost ke Story Instagram Kamu :
                  <span className='text-jago-4 hover:underline my-2'>
                    <Link to={'#'}> postingan ini</Link>
                  </span>
                  <FileInput
                    size={'sm'}
                    id='file-upload-3'
                    onChange={(e) => handleFileChange(e, 'file3')}
                  />
                </li>
              </ul>
              <Button
                onClick={handleSubmit}
                color={'success'}
                className='w-full'
                disabled={!allFilesSelected}
              >
                Kirim
              </Button>
            </div>
          </div>
        </div>
      </div>
      <footer className='bg-white dark:bg-gray-900'>
        <div className='w-full max-w-screen-xl mx-auto p-4 md:py-8'>
          <hr className='my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8' />
          <span className='block text-sm text-gray-500 sm:text-center dark:text-gray-400'>
            © {year}{' '}
            <a href='https://jagocpns.id/' className='hover:underline'>
              JagoCPNS
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </div>
  );
};

export default FreeForm;
