import { Button, Dropdown, Label, Select, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { province } from '../../../libs/province';
import { fetcher } from '../../../utils/fetcher';

const ProfileMain = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    province: '',
    phone: '',
    gender: '',
    instance: '',
  });
  const [isChange, setIsChange] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetcher('/user');
      setUserData(response.data);
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserData({ ...userData, [id]: value });
    setIsChange(true);
  };

  const handleDropdownChange = (field, value) => {
    setUserData({ ...userData, [field]: value });
    setIsChange(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userData);
  };

  return (
    <form className='flex space-x-4 max-w-screen-xl' onSubmit={handleSubmit}>
      <div className='flex w-full flex-col gap-4'>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='name' value='Name' />
          </div>
          <TextInput
            id='name'
            value={userData.name}
            type='text'
            placeholder='Nama'
            shadow
            onChange={handleChange}
          />
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='email' value='Email' />
          </div>
          <TextInput
            value={userData.email}
            id='email'
            type='email'
            placeholder='asepbensin@gmail.com'
            disabled
            shadow
          />
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='province' value='Provinsi' />
          </div>
          <Select
            id='province'
            required
            value={userData.province}
            onChange={handleChange}
          >
            {province.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          </Select>
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
      <div className='flex w-full flex-col gap-4'>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='phone' value='Phone' />
          </div>
          <TextInput
            id='phone'
            value={userData.phone}
            type='tel'
            placeholder='Phone'
            shadow
            onChange={handleChange}
          />
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='gender' value='Jenis Kelamin' />
          </div>
          <Select
            id='gender'
            name='gender'
            required
            value={userData.gender}
            onChange={handleChange}
          >
            <option value='male'>Laki Laki</option>
            <option value='female'>Perempuan</option>
          </Select>
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='instance' value='Instansi' />
          </div>
          <Dropdown
            label='instance'
            dismissOnClick={false}
            renderTrigger={() => (
              <TextInput
                id='instance'
                value={userData.instance}
                type='text'
                placeholder='Instance'
                shadow
                readOnly
              />
            )}
          >
            <Dropdown.Item
              onClick={() =>
                handleDropdownChange('instance', 'Kementrian Hukum')
              }
            >
              Kementrian Hukum
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() =>
                handleDropdownChange('instance', 'Kementrian Pertahanan')
              }
            >
              Kementrian Pertahanan
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() =>
                handleDropdownChange('instance', 'Kementrian Jembut')
              }
            >
              Kementrian Jembut
            </Dropdown.Item>
          </Dropdown>
        </div>
      </div>
    </form>
  );
};

export default ProfileMain;
