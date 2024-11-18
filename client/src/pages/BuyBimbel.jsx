import { useEffect, useState } from "react";
import BimbelCard from "../components/app/MyTryout/BimbelCard.jsx";
import { fetcher } from "../utils/fetcher.js";
export default function BuyBimbel() {
  const [bimbelData, setBimbelData] = useState([]);

  const getBimbelData = async () => {
    try {
      const response = await fetcher.get("/public/bimbel");
      setBimbelData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBimbelData();
  }, []);

  const formatIDR = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  return (
    <div className="mb-10 mt-3 sm:mt-3 xl:mt-0 p-5 sm:p-5 xl:p-10 md:ml-64 xl:ml-64 dark:bg-black min-h-screen">
      <div>
        <p className="text-2xl font-bold">Beli Bimbel</p>
        <p className="text-xl">
          Pilih paket belajar mandiri yang paling sesuai dengan kebutuhan
          belajarmu.
        </p>
        <div className="mt-5 space-y-5">
          {bimbelData.map((bimbel, index) => (
            <BimbelCard
              key={index}
              title={bimbel.title}
              image={bimbel.imageUrl}
              buttonText="Beli"
              price={formatIDR(bimbel.price)}
              url={`/app/bimbelstore/checkout/${bimbel.id}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
