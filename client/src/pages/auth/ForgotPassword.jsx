import { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post(
        'https://server.jagocpns.id/api/public/forgot-password',
        {
          email,
        }
      );
      setMessage(response.data.message);
      setEmail('');
      setSuccess(true);
    } catch (error) {
      setError('Error: Could not send reset password link.');
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      {success && (
        <div className='max-w-md w-full bg-white p-8 border border-gray-300 rounded-lg shadow-md'>
          <p>
            Email verifikasi dikirim. Silahhkan cek email anda, cek juga bagian
            spam apabila email tidak masuk.
          </p>
        </div>
      )}
      {!success && (
        <div className='max-w-md w-full bg-white p-8 border border-gray-300 rounded-lg shadow-md'>
          <h2 className='text-2xl font-semibold mb-6 text-center'>
            Lupa Password?
          </h2>
          <p className='text-center mb-4 text-gray-600'>
            Masukan email anda dan kami akan mengirimkan link untuk reset
            password melalui email.
          </p>
          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700'
              >
                Email Address
              </label>
              <input
                type='email'
                id='email'
                placeholder='Enter your email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='mt-1 block w-full border border-gray-300 rounded-md p-2'
                required
              />
            </div>
            <button
              disabled={loading}
              type='submit'
              className='w-full bg-jago-4 disabled:bg-gray-300 text-white py-2 rounded-md'
            >
              Kirim
            </button>
            {message && (
              <p className='mt-2 text-green-500 text-center'>{message}</p>
            )}
            {error && <p className='mt-2 text-red-500 text-center'>{error}</p>}
          </form>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
