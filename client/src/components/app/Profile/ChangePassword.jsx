import { Button, Label, TextInput } from 'flowbite-react';
import { useState } from 'react';

const ChangePassword = () => {
  const [userData, setUserData] = useState({
    oldPassword: '',
    newPassword: '',
    passwordConfirmation: '',
  });

  const [isChange, setIsChange] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserData({ ...userData, [id]: value });
    setIsChange(true); // Update isChange state when any input changes
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(userData);
    setIsChange(false); // Reset isChange state after submission
  };

  return (
    <form className='flex space-x-4 max-w-screen-xl' onSubmit={handleSubmit}>
      <div className='flex w-full flex-col gap-4'>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='oldPassword' value='Password Lama' />
          </div>
          <TextInput
            id='oldPassword'
            value={userData.oldPassword}
            type='password'
            placeholder='Password Lama'
            shadow
            onChange={handleChange}
          />
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='newPassword' value='Password Baru' />
          </div>
          <TextInput
            id='newPassword'
            value={userData.newPassword}
            type='password'
            placeholder='Password Baru'
            shadow
            onChange={handleChange}
          />
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='passwordConfirmation' value='Konfirmasi Password' />
          </div>
          <TextInput
            id='passwordConfirmation'
            value={userData.passwordConfirmation}
            type='password'
            placeholder='Konfirmasi Password'
            shadow
            onChange={handleChange}
          />
        </div>
        <Button
          className='w-fit'
          disabled={!isChange}
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
