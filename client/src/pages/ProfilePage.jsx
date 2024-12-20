import ProfileTab from '../components/app/Profile/ProfileTab';

const ProfilePage = () => {
  return (
    <div className='p-5 sm:ml-64 dark:bg-black min-h-screen'>
      <div>
        <p className='font-medium text-2xl'>Profie</p>
      </div>
      <ProfileTab />
    </div>
  );
};

export default ProfilePage;
