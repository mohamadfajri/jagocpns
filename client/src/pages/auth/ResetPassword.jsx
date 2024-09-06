import { useState } from 'react';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [userData, setUserData] = useState({
    newPassword: '',
    passwordConfirmation: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [miss, setMiss] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const token = query.get('token');

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (userData.newPassword !== userData.passwordConfirmation) {
      setMiss('Password tidak sama!');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        'https://server.jagocpns.id/api/public/reset-password',
        {
          token,
          newPassword: userData.newPassword,
        }
      );
      setMessage(response.data.message);
      setTimeout(() => navigate('/auth/signin'), 3000);
    } catch (error) {
      setError('Error: Could not reset password.');
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='max-w-md w-full bg-white p-8 border border-gray-300 rounded-lg shadow-md'>
        <h2 className='text-2xl font-semibold mb-6 text-center'>
          Reset Your Password
        </h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor='newPassword'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Password Baru
            </label>
            <div className='relative flex items-center'>
              <input
                autoComplete='current-password'
                type={showPassword ? 'text' : 'password'}
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
              htmlFor='passwordConfirmation'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Konfirmasi Password Baru
            </label>
            <div className='relative flex items-center'>
              <input
                autoComplete='current-password'
                type={showPassword ? 'text' : 'password'}
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
            {miss && <p className='text-xs text-red-500'>{miss}</p>}
          </div>
          <button
            disabled={loading}
            type='submit'
            className='w-full disabled:bg-gray-300 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 mt-4'
          >
            Reset Password
          </button>
          {message && (
            <p className='mt-4 text-green-500 text-center'>{message}</p>
          )}
          {error && <p className='mt-4 text-red-500 text-center'>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
