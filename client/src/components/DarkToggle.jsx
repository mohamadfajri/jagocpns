import { DarkThemeToggle } from 'flowbite-react';

const DarkToggle = () => {
  return (
    <>
      <div className='fixed bottom-4 right-4 z-20'>
        <DarkThemeToggle />
      </div>
    </>
  );
};

export default DarkToggle;
