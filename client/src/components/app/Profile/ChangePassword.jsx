import { Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const ChangePassword = () => {
  const [userData, setUserData] = useState({
    oldPassword: '',
    newPassword: '',
    passwordConfirmation: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [miss, setMiss] = useState(false);
  const [isChange, setIsChange] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserData({ ...userData, [id]: value });
    setIsChange(true);
  };

  useEffect(() => {
    const checkMissMatch = () => {
      if (userData.newPassword !== userData.passwordConfirmation) {
        setMiss(true);
      } else {
        setMiss(false);
      }
    };
    checkMissMatch();
  }, [userData.newPassword, userData.passwordConfirmation]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userData);
    setIsChange(false);
  };

  return (
    <form className='flex space-x-4 max-w-screen-xl' onSubmit={handleSubmit}>
      <div className='flex w-full flex-col gap-4'>
        <div>
          <label
            htmlFor='password'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Password Lama
          </label>
          <div className='relative flex items-center'>
            <input
              autoComplete='current-password'
              type={showPassword ? 'text' : 'password'}
              name='password'
              id='oldPassword'
              value={userData.oldPassword}
              onChange={handleChange}
              placeholder='Password Lama'
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
            htmlFor='password'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Password Baru
          </label>
          <div className='relative flex items-center'>
            <input
              autoComplete='current-password'
              type={showPassword ? 'text' : 'password'}
              name='password'
              id='newPassword'
              value={userData.newPassword}
              onChange={handleChange}
              placeholder='Password Baru'
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
            htmlFor='password'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Konfirmasi Password Baru
          </label>
          <div className='relative flex items-center'>
            <input
              autoComplete='current-password'
              type={showPassword ? 'text' : 'password'}
              name='password'
              id='passwordConfirmation'
              value={userData.passwordConfirmation}
              onChange={handleChange}
              placeholder='Konfirmasi Password Baru'
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
          {miss && <p className='text-xs text-red-500'>Password tidak sama!</p>}
        </div>
        <Button
          className='w-fit'
          disabled={!isChange || miss}
          color={'success'}
          type='submit'
        >
          Simpan
        </Button>
      </div>
    </form>
  );
};

export default ChangePassword;
