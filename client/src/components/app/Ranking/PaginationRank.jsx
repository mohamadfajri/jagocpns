import { Pagination, Flowbite, Select } from "flowbite-react";
import { useRank } from "../../../stores/useRank";

const PaginationRank = () => {
  const { page, limit, setPage, totalPages, setLimit } = useRank();

  const onPageChange = (newPage) => {
    setPage(newPage);
  };

  const handleItemsPerPageChange = (event) => {
    const newLimit = parseInt(event.target.value);
    setLimit(newLimit);
    setPage(1);
  };

  const customTheme = {
    base: "",
    layout: {
      table: {
        base: "text-sm text-gray-700 dark:text-gray-400",
        span: "font-semibold text-gray-900 dark:text-white",
      },
    },
    pages: {
      base: "xs:mt-0 mt-2 inline-flex items-center ",
      showIcon: "inline-flex",
      previous: {
        base: "ml-0 rounded-l-lg  bg-white px-3 py-2 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white",
        icon: "h-5 w-5",
      },
      next: {
        base: "rounded-r-lg bg-white px-3 py-2 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white",
        icon: "h-5 w-5",
      },
      selector: {
        base: "w-12 bg-white py-3 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white",
        active:
          "border border-black rounded-xl bg-cyan-50 text-cyan-600 hover:bg-cyan-100 hover:text-cyan-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white",
        disabled: "cursor-not-allowed opacity-50",
      },
    },
  };

  return (
    <div className="flex justify-between sm:justify-between rounded items-center">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-700 dark:text-gray-400">Show</span>
        <Select
          id="itemsPerPage"
          value={limit}
          onChange={handleItemsPerPageChange}
          className="w-20"
        >
          <option value="10">10</option>
          <option value="30">30</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </Select>
        <span className="text-sm text-gray-700 dark:text-gray-400">
          entries
        </span>
      </div>

      <Flowbite>
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
          previousLabel="Back"
          nextLabel="Next"
          theme={customTheme}
          layout="navigation"
          showIcons
        />
      </Flowbite>
    </div>
  );
};
export default PaginationRank;
