import { Pagination, Flowbite } from "flowbite-react";
import { useState } from "react";
import { useRank } from "../../../stores/useRank";


const PaginationRank = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { setPage, totalPages } = useRank();

  const onPageChange = (page) => {
    setCurrentPage(page);
    setPage(page);
  };

  const customTheme = {
    "base": "",
  "layout": {
    "table": {
      "base": "text-sm text-gray-700 dark:text-gray-400",
      "span": "font-semibold text-gray-900 dark:text-white"
    }
  },
  "pages": {
    "base": "xs:mt-0 mt-2 inline-flex items-center ",
    "showIcon": "inline-flex",
    "previous": {
      "base": "ml-0 rounded-l-lg  bg-white px-3 py-2 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white",
      "icon": "h-5 w-5"
    },
    "next": {
      "base": "rounded-r-lg bg-white px-3 py-2 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white",
      "icon": "h-5 w-5"
    },
    "selector": {
      "base": "w-12 bg-white py-3 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white",
      "active": "border border-black rounded-xl bg-cyan-50 text-cyan-600 hover:bg-cyan-100 hover:text-cyan-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white",
      "disabled": "cursor-not-allowed opacity-50"
    }
  }
  }

  return (
    <div className="flex sm:justify-center rounde">
      <Flowbite>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        previousLabel="Back"
        nextLabel="Next"
        theme={customTheme}
      />
      </Flowbite>
    </div>
  );
};
export default PaginationRank;
