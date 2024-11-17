import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { fetcher } from "../utils/fetcher.js";

const TryoutInformation = () => {
  const [countdown, setCountdown] = useState(5);
  const [isOnline, setIsOnline] = useState(false);
  const [tryOutName, setTryOutName] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const pathParts = location.pathname.split("/");
  const id = pathParts[pathParts.length - 1];

  useEffect(() => {
    const getIsOnline = async () => {
      const { data } = await fetcher.get(`/public/isOnlineTryout/${id}`);
      setIsOnline(data.isOnline);
    };
    const getTryOutName = async () => {
      const response = await fetcher(`/user/mylist/${id}`);
      setTryOutName(response.data[0].tryoutList.title);
    };
    getIsOnline();
    getTryOutName();
  }, [id]);

  const handleBack = () => {
    navigate("/app/mytryouts");
  };

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [countdown]);

  return (
    <div className="mt-3 sm:mt-3 xl:mt-0 p-5 sm:p-5 xl:p-10 md:ml-64 xl:ml-64 dark:bg-black min-h-screen">
      <p>TryoutInformations</p>
      <p className="font-bold text-2xl">Tryout SKB</p>

      <p className="mt-5">
        Pilih paket belajar mandiri yang paling sesuai dengan kebutuhan
        belajarmu.
      </p>
      <hr className="mt-12" />
      <div className="mt-12">
        <Alert color="warning" icon={HiInformationCircle}>
          Gunakan browser Google Chrome/Firefox versi terbaru. <br /> Pastikan
          koneksi internet stabil saat mengerjakan dan submit jawaban.
        </Alert>
      </div>

      {!isOnline && (
        <div className="mt-5 font-bold text-lg">
          <p>
            Mohon maaf untuk Tryout ini belum dapat dikerjakan sekarang. <br />
            Silahkan mengerjakan sesuai dengan jadwal yang telah ditentukan.
          </p>
        </div>
      )}

      <div className="grid grid-cols-3 gap-5">
        <div className="mt-7 col-span-2">
          <hr />
          <div className="grid grid-cols-2 py-5">
            <p>Nama Tryout</p>
            <p>{tryOutName}</p>
          </div>
          <hr />
          <div className="grid grid-cols-2 py-5">
            <p>Jumlah Soal</p>
            <p>100 Soal</p>
          </div>
          <hr />
          <div className="grid grid-cols-2 py-5">
            <p>Waktu</p>
            <p>100 Menit</p>
          </div>
          <hr />
          <div className="grid grid-cols-2 py-5">
            <p>Passing Grade</p>
            <div>
              <p>Benar: 5 Point</p>
              <p>Salah: 0 Point</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-5 gap-y-3">
          {isOnline ? (
            <Link to={`/start-tryout/${id}`}>
              <button className="bg-[#06C270] w-full text-white font-bold px-20 py-3 rounded-xl">
                Mulai Mengerjakan
              </button>
            </Link>
          ) : (
            <button
              disabled
              className="text-white font-bold px-20 py-3 rounded-xl bg-gray-500"
            >
              Tryout Offline
            </button>
          )}

          <button
            onClick={handleBack}
            className="bg-[#FF3B3B] text-white font-bold px-20 py-3 rounded-xl"
          >
            Kembali
          </button>
        </div>
      </div>
    </div>
  );
};

export default TryoutInformation;
