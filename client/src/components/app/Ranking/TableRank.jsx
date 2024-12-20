import { Button, Table, TextInput } from "flowbite-react";
import { useRank } from "../../../stores/useRank";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingTable from "../../LoadingTable";

const TableRank = () => {
  const { active, page, setTotalPage, limit } = useRank();
  const [data, setData] = useState([
    {
      name: "",
      rank: "",
      province: "",
      twk: "",
      tiu: "",
      tkp: "",
      total: "",
      status: "",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   if (!active) return;
  //   const getData = async () => {
  //     setIsLoading(true);
  //     const response = await axios.get(
  //       `${
  //         import.meta.env.VITE_API_URL
  //       }/api/public/rank?page=${page}&tryoutListId=${active}`
  //     );
  //     const fResponse = response.data.data.map((item) => ({
  //       name: item.name,
  //       rank: item.rank,
  //       province: item.province,
  //       twk: item.twk,
  //       tiu: item.tiu,
  //       tkp: item.tkp,
  //       total: item.total,
  //       status: item.status,
  //     }));
  //     setData(fResponse);
  //     setTotalPage(response.data.totalPages);
  //     setIsLoading(false);
  //   };
  //   getData();
  // }, [active, page, setTotalPage]);

  const fetchRankData = async (params) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/public/rank`,
        { 
          params: {
            ...params,
            limit: params.limit || limit // Memastikan limit selalu terkirim
          } 
        }
      );
      
      const fResponse = response.data.data.map((item) => ({
        name: item.name,
        rank: item.rank,
        province: item.province,
        twk: item.twk,
        tiu: item.tiu,
        tkp: item.tkp,
        total: item.total,
        status: item.status,
      }));
      
      setData(fResponse);
      setTotalPage(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching rank data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!active) return;
    
    fetchRankData({
      page,
      tryoutListId: active,
      limit
    });
  }, [active, page, limit]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const response = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/api/public/rank?tryoutListId=${active}&name=${searchTerm}`
    );
    setTotalPage(response.data.totalPages);

    const fResponse = response.data.data.map((item) => ({
      name: item.name,
      rank: item.rank,
      province: item.province,
      twk: item.twk,
      tiu: item.tiu,
      tkp: item.tkp,
      total: item.total,
      status: item.status,
    }));
    setData(fResponse);
    setIsLoading(false);
  };
  return (
    <>
      <div className="w-fit mb-4">
        <form className="flex space-x-2" onSubmit={handleFormSubmit}>
          <TextInput
            id="search"
            type="text"
            sizing="md"
            placeholder="Masukan Pencarian"
            value={searchTerm}
            onChange={handleInputChange}
          />
          <Button color={"success"} type="submit">
            Search
          </Button>
        </form>
      </div>
      <div className="overflow-x-auto">
        {isLoading ? (
          <LoadingTable />
        ) : (
          <Table>
            <Table.Head>
              <Table.HeadCell className="bg-[#FFCB01] font-bold">
                Rank
              </Table.HeadCell>
              <Table.HeadCell className="bg-[#FFCB01] font-bold">
                Nama
              </Table.HeadCell>
              <Table.HeadCell className="bg-[#FFCB01] font-bold">
                Provinsi
              </Table.HeadCell>
              <Table.HeadCell className="bg-[#FFCB01] font-bold">
                Total
              </Table.HeadCell>
              <Table.HeadCell className="bg-[#FFCB01] font-bold">
                Keterangan
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {data.map((item, index) => (
                <Table.Row
                  key={index}
                  className={`${
                    item.status === "Lulus"
                      ? "bg-[#06C270] text-white font-bold"
                      : "bg-red-500 text-white"
                  } dark:border-gray-700 dark:bg-gray-800`}
                >
                  <Table.Cell>{item.rank}</Table.Cell>
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell>{item.province}</Table.Cell>
                  <Table.Cell>{item.total}</Table.Cell>
                  <Table.Cell>{item.status}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        )}
      </div>
    </>
  );
};

export default TableRank;
