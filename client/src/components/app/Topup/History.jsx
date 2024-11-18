import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { fetcher } from "../../../utils/fetcher";

const History = () => {
  const [userData, setUserData] = useState();
  const [data, setData] = useState([{}]);
  const [transactionStatus, setTransactionStatus] = useState([]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");
    const second = date.getSeconds().toString().padStart(2, "0");
    return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
  };

  const formatIDR = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  const fetchUser = async () => {
    try {
      const response = await fetcher("/user");
      setUserData(response.data.userId);
    } catch (error) {
      console.log(error);
    }
  };

  const getTransactionStatus = async () => {
    try {
      const response = await fetcher("/user/getusertransaction");
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  useEffect(() => {
    getTransactionStatus();
  });

  console.log("transaction status", transactionStatus);
  console.log("data", data);

  return (
    <div className="overflow-x-auto">
      <Table>
        <Table.Head>
          <Table.HeadCell>Tanggal</Table.HeadCell>
          <Table.HeadCell>ID Topup</Table.HeadCell>
          <Table.HeadCell>Saldo</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {data.map((item, index) => (
            <Table.Row
              key={index}
              className={` dark:border-gray-700 dark:bg-gray-800`}
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {formatDate(item.date)}
              </Table.Cell>
              <Table.Cell>{item.description}</Table.Cell>
              <Table.Cell>{formatIDR(item.amount)}</Table.Cell>
              <Table.Cell className={`${item.status === "rejected" ? "text-red-500": "text-black"} font-medium uppercase`}>{item.status}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default History;
