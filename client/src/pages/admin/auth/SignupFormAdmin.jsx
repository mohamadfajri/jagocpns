import { Dropdown } from 'flowbite-react';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SignupFormAdmin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
    adminKey: '',
  });
  const [type, setType] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const createAdmin = async () => {
    if (type === 'admin') {
      try {
        const response = await axios.post('/api/admin/signup', {
          name: form.name,
          email: form.email,
          password: form.password,
          adminKey: form.adminKey,
        });
        console.log(response);
      } catch (error) {
        console.error('this error from signup admin', error);
      }
    }
    if (type === 'questioner') {
      try {
        const response = await axios.post('/api/questioner/signup', {
          name: form.name,
          email: form.email,
          password: form.password,
          adminKey: form.adminKey,
        });
        console.log(response);
      } catch (error) {
        console.error('this error from signup admin', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createAdmin();
    console.log('Form data:', form);
  };

  return (
    <section className='bg-gray-50 dark:bg-gray-900'>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <a
          href='#'
          className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'
        ></a>
        <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
              Sign up to your account
            </h1>
            <Dropdown
              label={type ? type : 'Type'}
              color={'success'}
              dismissOnClick={true}
            >
              <Dropdown.Item onClick={() => setType('admin')}>
                Admin
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setType('questioner')}>
                Questioner
              </Dropdown.Item>
            </Dropdown>
            <form className='space-y-4 md:space-y-6' onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor='name'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Name
                </label>
                <input
                  type='text'
                  name='name'
                  id='name'
                  value={form.name}
                  onChange={handleChange}
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='Asep Bensin'
                  required
                />
              </div>
              <div>
                <label
                  htmlFor='email'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Email
                </label>
                <input
                  type='email'
                  name='email'
                  id='email'
                  value={form.email}
                  onChange={handleChange}
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='name@company.com'
                  required
                />
              </div>
              <div>
                <label
                  htmlFor='password'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Password
                </label>
                <div className='relative flex items-center'>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name='password'
                    id='password'
                    value={form.password}
                    onChange={handleChange}
                    placeholder='••••••••'
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    required
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-3 bg-transparent border-none cursor-pointer'
                  >
                    {showPassword ? (
                      <FaEyeSlash className='text-gray-500' />
                    ) : (
                      <FaEye className='text-gray-500' />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label
                  htmlFor='confirm-password'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Confirm Password
                </label>
                <div className='relative flex items-center'>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name='password'
                    id='password'
                    value={form.password}
                    onChange={handleChange}
                    placeholder='••••••••'
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    required
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-3 bg-transparent border-none cursor-pointer'
                  >
                    {showPassword ? (
                      <FaEyeSlash className='text-gray-500' />
                    ) : (
                      <FaEye className='text-gray-500' />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label
                  htmlFor='confirm-password'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Admin Key
                </label>
                <div className='relative flex items-center'>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name='adminKey'
                    id='adminKey'
                    value={form.adminKey}
                    onChange={handleChange}
                    placeholder='••••••••'
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    required
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-3 bg-transparent border-none cursor-pointer'
                  >
                    {showPassword ? (
                      <FaEyeSlash className='text-gray-500' />
                    ) : (
                      <FaEye className='text-gray-500' />
                    )}
                  </button>
                </div>
              </div>
              <button
                type='submit'
                className='w-full text-white bg-jago-4 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
              >
                Sign Up
              </button>
              <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                Already have an account?{' '}
                <Link
                  to={'/admin/auth/signin'}
                  className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                >
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupFormAdmin;
