import { Outlet } from "react-router-dom";
import TryoutCard from "../components/app/MyTryout/TryoutCard";
import { useEffect, useState } from "react";
import { fetcher } from "../utils/fetcher";
import LoadingTable from "../components/LoadingTable";
import { Tabs } from "flowbite-react";
import { TryOutCardNew } from "../components/app/MyTryout/TryOutCardNew.jsx";
const BuyTryOut = () => {
  const [tryouts, setTryouts] = useState([{}]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getTryouts = async () => {
      setIsLoading(true);
      const { data } = await fetcher.get("/public/tryouts");
      setTryouts(data);
      setIsLoading(false);
    };
    getTryouts();
  }, []);

  const getTryoutByBatch = async () => {
    try {
      const response = await fetcher.get(`/public/tryouts/batch/1`);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTryoutByBatch();
  });

  console.log("tryout data", tryouts);

  return (
    <div className="sm:p-10 sm:ml-64 dark:bg-black min-h-screen sm:mt-0">
      <div>
        <p className="font-bold text-2xl">Tryout SKB</p>
        <p className="mt-5">
          Pilih paket belajar mandiri yang paling sesuai dengan kebutuhan
          belajarmu.
        </p>
      </div>

      <div className="mt-12">
        <Tabs aria-label="Default tabs" variant="underline">
          <Tabs.Item active title="Batch 1">
            <div className="relative mt-5 mb-5 w-full">
              <span className="absolute inset-y-0 left-3 flex items-center">
                <svg
                  width="18"
                  height="19"
                  viewBox="0 0 18 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.7 16.25L9.975 11.525C9.6 11.825 9.16875 12.0625 8.68125 12.2375C8.19375 12.4125 7.675 12.5 7.125 12.5C5.7625 12.5 4.6095 12.028 3.666 11.084C2.7225 10.14 2.2505 8.987 2.25 7.625C2.2495 6.263 2.7215 5.11 3.666 4.166C4.6105 3.222 5.7635 2.75 7.125 2.75C8.4865 2.75 9.63975 3.222 10.5848 4.166C11.5298 5.11 12.0015 6.263 12 7.625C12 8.175 11.9125 8.69375 11.7375 9.18125C11.5625 9.66875 11.325 10.1 11.025 10.475L15.75 15.2L14.7 16.25ZM7.125 11C8.0625 11 8.8595 10.672 9.516 10.016C10.1725 9.36 10.5005 8.563 10.5 7.625C10.4995 6.687 10.1715 5.89025 9.516 5.23475C8.8605 4.57925 8.0635 4.251 7.125 4.25C6.1865 4.249 5.38975 4.57725 4.73475 5.23475C4.07975 5.89225 3.7515 6.689 3.75 7.625C3.7485 8.561 4.07675 9.358 4.73475 10.016C5.39275 10.674 6.1895 11.002 7.125 11Z"
                    fill="#1C1C28"
                  />
                </svg>
              </span>

              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ketik untuk mencari tryout..."
              />
            </div>

            <div className="grid grid-cols-5 gap-5">
              {tryouts.map((item, index) => (
                <TryOutCardNew
                  key={index}
                  title={item.title}
                  desc={item.description}
                  action={"Beli"}
                  url={`/app/tryoutstore/checkout/${item.id}`}
                  imageUrl={item.imageUrl}
                  price={item.price}
                />
              ))}
            </div>
          </Tabs.Item>
          <Tabs.Item active title="Batch 2">
            <div className="relative mt-5 mb-5 w-full">
              <span className="absolute inset-y-0 left-3 flex items-center">
                <svg
                  width="18"
                  height="19"
                  viewBox="0 0 18 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.7 16.25L9.975 11.525C9.6 11.825 9.16875 12.0625 8.68125 12.2375C8.19375 12.4125 7.675 12.5 7.125 12.5C5.7625 12.5 4.6095 12.028 3.666 11.084C2.7225 10.14 2.2505 8.987 2.25 7.625C2.2495 6.263 2.7215 5.11 3.666 4.166C4.6105 3.222 5.7635 2.75 7.125 2.75C8.4865 2.75 9.63975 3.222 10.5848 4.166C11.5298 5.11 12.0015 6.263 12 7.625C12 8.175 11.9125 8.69375 11.7375 9.18125C11.5625 9.66875 11.325 10.1 11.025 10.475L15.75 15.2L14.7 16.25ZM7.125 11C8.0625 11 8.8595 10.672 9.516 10.016C10.1725 9.36 10.5005 8.563 10.5 7.625C10.4995 6.687 10.1715 5.89025 9.516 5.23475C8.8605 4.57925 8.0635 4.251 7.125 4.25C6.1865 4.249 5.38975 4.57725 4.73475 5.23475C4.07975 5.89225 3.7515 6.689 3.75 7.625C3.7485 8.561 4.07675 9.358 4.73475 10.016C5.39275 10.674 6.1895 11.002 7.125 11Z"
                    fill="#1C1C28"
                  />
                </svg>
              </span>

              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ketik untuk mencari tryout..."
              />
            </div>
            <p>Batch 2</p>
          </Tabs.Item>
        </Tabs>
      </div>

      {/* <section>
        <div className="m-4 p-4 border rounded-lg">
          <h1 className="text-2xl">Beli Tryout</h1>
          {tryouts.length > 0 ? (
            <div className="rounded-lg p-4 my-2 border grid grid-cols-2 sm:grid-cols-5 gap-4">
              {isLoading ? (
                <LoadingTable />
              ) : (
                tryouts?.map((tryout, index) => (
                  <TryoutCard
                    title={tryout.title}
                    desc={tryout.description}
                    key={index}
                    action={"Beli"}
                    url={`/app/tryoutstore/${tryout.id}`}
                    imageUrl={tryout.imageUrl}
                    price={tryout.price}
                  />
                ))
              )}
            </div>
          ) : (
            <div className="flex space-x-1 justify-center text-lg m-4">
              <h2>Belum ada list Tryout</h2>
            </div>
          )}
          <Outlet />
        </div>
      </section> */}
    </div>
  );
};

export default BuyTryOut;
