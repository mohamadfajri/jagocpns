import DropdownRank from './DropdownRank';
import PaginationRank from './PaginationRank';
import TableRank from './TableRank';

const Choosen = () => {
  return (
    <section className='p-6 border rounded-lg flex flex-col space-y-4'>
      <DropdownRank />
      <div className='font-medium text-xl border rounded-lg p-6'>
        <TableRank />
      </div>
      <div className='flex justify-start'>
        <PaginationRank />
      </div>
    </section>
  );
};

export default Choosen;
