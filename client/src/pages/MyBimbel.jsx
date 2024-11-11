import BimbelCard from "../components/app/MyTryout/BimbelCard.jsx";
export default function MyBimbel() {
  return (
    <div className="mt-3 sm:mt-3 xl:mt-0 p-5 sm:p-5 xl:p-10 md:ml-64 xl:ml-64 dark:bg-black min-h-screen">
      <p className="font-bold text-2xl">Bimbel</p>

      <p className="mt-5">
        Pilih paket belajar mandiri yang paling sesuai dengan kebutuhan
        belajarmu.
      </p>
      <hr className="mt-12" />
      <div>
        <p className="font-bold text-2xl">Bimbel Saya</p>
        <BimbelCard />
      </div>
    </div>
  );
}
