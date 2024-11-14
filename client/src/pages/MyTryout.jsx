import { Outlet } from "react-router-dom";
import { TryOutCardNew } from "../components/app/MyTryout/TryOutCardNew.jsx";
import { useEffect, useState } from "react";
import { fetcher } from "../utils/fetcher";
import LoadingTable from "../components/LoadingTable";

const Mytryout = () => {
  const [done, setDone] = useState([{}]);
  const [unDone, setUndone] = useState([{}]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const { data } = await fetcher.get("/user/mylists");
        setDone(data.done);
        setUndone(data.undone);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <>
      <div className="mt-3 sm:mt-3 xl:mt-0 p-5 sm:p-5 xl:p-10 md:ml-64 xl:ml-64 dark:bg-black min-h-screen">
        <p className="font-bold text-2xl">Tryout SKB</p>

        <p className="mt-5">
          Pilih paket belajar mandiri yang paling sesuai dengan kebutuhan
          belajarmu.
        </p>
        <hr className="mt-12" />

        <div>
          <p className="font-bold text-2xl mt-12">Belum Dikerjakan</p>
          <div className="mt-5 flex flex-col gap-3 items-center xl:grid xl:grid-cols-5">
            {unDone.length !== 0 ? (
              unDone.map((tryout, index) => (
                <div key={index}>
                  {isLoading ? (
                    <LoadingTable />
                  ) : (
                    <TryOutCardNew
                      title={tryout.title}
                      desc={tryout.description}
                      action={"Kerjakan"}
                      key={index}
                      url={`/app/mytryouts/tryoutinformation/${tryout.tryoutListId}`}
                      imageUrl={tryout.imageUrl}
                    />
                  )}
                </div>
              ))
            ) : (
              <div>Anda Belum memiliki Tryout</div>
            )}
          </div>
        </div>

        <hr className="mt-12" />

        <div>
          <p className="font-bold text-2xl mt-12">Sudah Dikerjakan</p>
          <div className="mt-5 flex flex-col gap-3 items-center xl:grid xl:grid-cols-5">
            {done.length !== 0 ? (
              done.map((tryout, index) => (
                <div key={index}>
                  {isLoading ? (
                    <LoadingTable />
                  ) : (
                    <TryOutCardNew
                      title={tryout.title}
                      desc={tryout.description}
                      action={"Nilai Saya"}
                      key={index}
                      url={`score/${tryout.tryoutListId}`} // Sudah di kerjakan open score modal
                      imageUrl={tryout.imageUrl}
                    />
                  )}
                </div>
              ))
            ) : (
              <div>Anda Belum memiliki Tryout</div>
            )}
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Mytryout;
