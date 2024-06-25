import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import logo from '../../assets/images/logo-extend.png';
import { Link } from 'react-router-dom';
import useAuth from '../../stores/useAuth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { fetcher } from '../../utils/fetcher';
import { useAlert } from '../../stores/useAlert';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const { setToken, setProfile } = useAuth();

  const { setAlert, setStatus } = useAlert();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const signIn = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/signin`,
        {
          email: form.email,
          password: form.password,
        }
      );
      setToken(response.data.token);
      setAlert({ title: 'Info!', message: 'Login Berhasil', color: 'success' });
      setStatus(true);
    } catch (error) {
      setAlert({
        title: 'Error!',
        message: `${error.response.data.message}`,
        color: 'failure',
      });
      setStatus(true);
    }
  };

  const getProfile = async () => {
    const response = await fetcher.get('/user');
    setProfile({ profile: response.data });
    console.log(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signIn();
    await getProfile();
    navigate('/app/dashboard');
  };

  return (
    <section className='bg-gray-50 dark:bg-gray-900'>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <a
          href='#'
          className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'
        >
          <img className='h-16 mr-2' src={logo} alt='logo' />
        </a>
        <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
              Sign in to your account
            </h1>
            <form className='space-y-4 md:space-y-6' onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor='email'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Your email
                </label>
                <input
                  autoComplete='email'
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
                    autoComplete='current-password'
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
              <div className='flex items-center justify-between'>
                <div className='flex items-start'>
                  <div className='flex items-center h-5'>
                    <input
                      id='remember'
                      aria-describedby='remember'
                      type='checkbox'
                      className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800'
                    />
                  </div>
                  <div className='ml-3 text-sm'>
                    <label
                      htmlFor='remember'
                      className='text-gray-500 dark:text-gray-300'
                    >
                      Remember me
                    </label>
                  </div>
                </div>
              </div>
              <button
                type='submit'
                className='w-full text-white bg-jago-4 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
              >
                Sign in
              </button>
              <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                Don’t have an account yet?{' '}
                <Link
                  to={'/auth/signup'}
                  className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
