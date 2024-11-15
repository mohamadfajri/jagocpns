import { useEffect, useState } from "react";
import BimbelCard from "../components/app/MyTryout/BimbelCard.jsx";
import { fetcher } from "../utils/fetcher.js";
export default function MyBimbel() {
  const [bimbelData, setBimbelData] = useState([]);

  const getBimbelData = async () => {
    try {
      const response = await fetcher.get(`/user/mybimbel`);
      setBimbelData(response.data.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getBimbelData();
  }, []);

  return (
    <div className="mb-10 mt-3 sm:mt-3 xl:mt-0 p-5 sm:p-5 xl:p-10 md:ml-64 xl:ml-64 dark:bg-black min-h-screen">
      <p className="font-bold text-2xl">Bimbel</p>

      <p className="mt-5">
        Pilih paket belajar mandiri yang paling sesuai dengan kebutuhan
        belajarmu.
      </p>
      <hr className="mt-12" />
      <div>
        <p className="font-bold text-2xl mb-5">Bimbel Saya</p>
        {bimbelData
          ? bimbelData.map((bimbel, index) => (
              <BimbelCard
                key={index}
                title={bimbel.title}
                image={bimbel.imageUrl}
              buttonText="Grup Whatsapp"
              />
            ))
          : "Data Bimbel Tidak Ditemukan"}
      </div>
    </div>
  );
}
