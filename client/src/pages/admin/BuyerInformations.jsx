import { useEffect, useState } from "react";
import { fetchAdmin } from "../../utils/fetchAdmin.js";
import { Table } from "flowbite-react";
import { Pagination, Dropdown } from "flowbite-react";
import { useParams } from "react-router-dom";

export default function BuyerInformations() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const { id } = useParams();

  const getBuyerInformations = async (page, limit) => {
    try {
      const response = await fetchAdmin(
        `/tryoutowner/${parseInt(id)}?page=${page}&limit=${limit}`
      );
      setData(response.data.data);
      setTotalPages(response.data.meta.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBuyerInformations(currentPage, rowsPerPage);
  }, [currentPage, rowsPerPage]);

  const onPageChange = (page) => setCurrentPage(page);
  const handleRowsChange = (value) => {
    setRowsPerPage(value);
  };

  return (
    <div className="py-4 ml-72 me-10 dark:bg-black min-h-screen">
      <p className="text-2xl font-bold">Buyer Informations</p>
      <p className="mt-3 text-xl">Nama Tryout</p>

      <Table className="mt-4">
        <Table.Head>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Phone</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {data.map((buyer, index) => (
            <Table.Row key={index}>
              <Table.Cell>{buyer.email}</Table.Cell>
              <Table.Cell>{buyer.profile.phone}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center gap-5">
          <label htmlFor="rowsPerPage" className="font-medium text-lg">
            Rows per page:
          </label>
          <Dropdown
            label={`${rowsPerPage} rows`}
            inline={true}
            className="bg-white dark:bg-gray-800"
          >
            <Dropdown.Item onClick={() => handleRowsChange(10)}>
              10
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleRowsChange(30)}>
              30
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleRowsChange(50)}>
              50
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleRowsChange(100)}>
              100
            </Dropdown.Item>
          </Dropdown>
        </div>

        <div className="flex overflow-x-auto sm:justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            showIcons
          />
        </div>
      </div>
    </div>
  );
}
