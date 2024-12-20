import { Button, Spinner } from 'flowbite-react';

const LoadingTable = () => {
  return (
    <>
      <div className='flex justify-center space-x-2 items-center'>
        <Button size={'xl'} disabled color='gray'>
          <Spinner
            color={'info'}
            aria-label='Alternate spinner button example'
            size='md'
          />
          <span className='pl-3'>Loading...</span>
        </Button>
      </div>
    </>
  );
};

export default LoadingTable;
