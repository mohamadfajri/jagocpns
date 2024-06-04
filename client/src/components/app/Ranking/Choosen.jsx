import DropdownRank from './DropdownRank';
import TableRank from './TableRank';

const Choosen = () => {
  return (
    <section className='p-6 border rounded-lg flex flex-col space-y-4'>
      <DropdownRank />
      <div className='font-medium text-xl border rounded-lg p-6'>
        <TableRank />
      </div>
    </section>
  );
};

export default Choosen;
