import DropdownRank from './DropdownRank';

const Unchoosen = () => {
  return (
    <section className='p-6 border rounded-lg flex flex-col space-y-4'>
      <DropdownRank />
      <div className='flex justify-center font-medium text-xl border rounded-lg p-6'>
        <h1>Silahkan Pilih Paket Tryout</h1>
      </div>
    </section>
  );
};

export default Unchoosen;
