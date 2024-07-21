import { Select } from 'flowbite-react';
import { useState } from 'react';
import { province } from '../../libs/province';
import { instance } from '../../libs/instance';
import { fetcher } from '../../utils/fetcher';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../stores/useAuth';

const FillProfile = () => {
  const navigate = useNavigate();
  const { setProfile } = useAuth();
  const [form, setForm] = useState({
    phone: '',
    province: '',
    name: '',
    gender: 'male',
    instance: 'Kementrian Hukum',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const createProfile = async () => {
    try {
      const response = await fetcher.post('/user/profile', {
        name: form.name,
        province: form.province,
        phone: form.phone,
        gender: form.gender,
        instance: form.instance,
      });
      setProfile(response.data);
    } catch (error) {
      console.error('this error appear on createProfile', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createProfile();
    navigate('/app/dashboard');
  };

  return (
    <>
      <main className='h-screen w-full flex  justify-center items-center'>
        <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
              Lengkapi Profil
            </h1>
            <form className='space-y-4 md:space-y-6' onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor='name'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Nama Lengkap
                </label>
                <input
                  type='text'
                  name='name'
                  id='name'
                  value={form.name}
                  onChange={handleChange}
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='Nama'
                  required
                />
              </div>
              <div>
                <label
                  htmlFor='email'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  No Hp / WA
                </label>
                <input
                  type='tel'
                  name='phone'
                  id='phone'
                  value={form.phone}
                  onChange={handleChange}
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='08xxx'
                  required
                />
              </div>
              <div>
                <label
                  htmlFor='province'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Provinsi
                </label>
                <Select
                  id='province'
                  name='province'
                  required
                  value={form.province}
                  onChange={handleChange}
                >
                  {province.map((item) => (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <label
                  htmlFor='gender'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Jenis Kelamin
                </label>
                <Select
                  id='gender'
                  name='gender'
                  required
                  value={form.gender}
                  onChange={handleChange}
                >
                  <option value='male'>Laki Laki</option>
                  <option value='female'>Perempuan</option>
                </Select>
              </div>
              <div>
                <label
                  htmlFor='instance'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Instansi
                </label>
                <Select
                  id='instance'
                  name='instance'
                  required
                  value={form.instance}
                  onChange={handleChange}
                >
                  {instance.map((item) => (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </Select>
              </div>

              <button
                type='submit'
                className='w-full text-white bg-jago-4 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
              >
                Simpan
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default FillProfile;
