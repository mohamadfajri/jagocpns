import { Tabs } from 'flowbite-react';
import { HiUserCircle, HiLockClosed } from 'react-icons/hi2';
import ProfileMain from './ProfileMain';
import ChangePassword from './ChangePassword';

const ProfileTab = () => {
  return (
    <Tabs aria-label='Default tabs' style='default'>
      <Tabs.Item active title='Profile' icon={HiUserCircle}>
        <ProfileMain />
      </Tabs.Item>
      <Tabs.Item active title='Ganti Password' icon={HiLockClosed}>
        <ChangePassword />
      </Tabs.Item>
    </Tabs>
  );
};
export default ProfileTab;
