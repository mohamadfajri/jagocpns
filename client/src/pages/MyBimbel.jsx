import { useEffect, useState } from "react";
import BimbelCard from "../components/app/MyTryout/BimbelCard.jsx";
import { fetcher } from "../utils/fetcher.js";
import { Link } from "react-router-dom";
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
        {bimbelData.length ? (
          bimbelData.map((bimbel, index) => (
            <BimbelCard
              key={index}
              title={bimbel.title}
              image={bimbel.imageUrl}
              buttonText="Grup Whatsapp"
              whatsappLink={bimbel.whatsappLink || ""}
            />
          ))
        ) : (
          <div>
            <div className="flex flex-col items-center justify-center mt-10">
              <p>
                Anda belum memiliki bimbel. Silahkan pilih kelas paket SKB kamu
              </p>
              <Link to={"/app/bimbelstore"}>
                <button className="mt-3 bg-[#FFCB01] rounded-xl px-5 py-3 text-white font-bold">
                  Beli Bimbel
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
