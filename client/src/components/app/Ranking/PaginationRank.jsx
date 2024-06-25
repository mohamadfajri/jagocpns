import { Pagination } from 'flowbite-react';
import { useState } from 'react';
import { useRank } from '../../../stores/useRank';
const PaginationRank = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { setPage, totalPages } = useRank();

  const onPageChange = (page) => {
    setCurrentPage(page);
    setPage(page);
  };

  return (
    <div className='flex overflow-x-auto sm:justify-center'>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};
export default PaginationRank;
