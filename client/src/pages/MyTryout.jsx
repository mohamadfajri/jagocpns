import { Outlet } from "react-router-dom";
import { TryOutCardNew } from "../components/app/MyTryout/TryOutCardNew.jsx";
import { useEffect, useState, useCallback } from "react";
import { fetcher } from "../utils/fetcher";
import LoadingTable from "../components/LoadingTable";
import Swal from "sweetalert2";

const INITIAL_STATE = {
  done: [],
  undone: [],
};

const MyTryout = () => {
  const [tryoutData, setTryoutData] = useState(INITIAL_STATE);
  const [isLoading, setIsLoading] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const fetchUser = useCallback(async () => {
    try {
      const response = await fetcher.get("/user");
      setUser(response.data);
    } catch (err) {
      console.error("Failed to fetch user data:", err);
      setError("Gagal memuat data pengguna");
    }
  }, []);

  const getData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const { data } = await fetcher.get("/user/mytryout");
      setTryoutData({
        done: data.done || [],
        undone: data.undone || [],
      });
    } catch (err) {
      setError("Gagal memuat data tryout");
      console.error("Failed to fetch tryout data:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
    getData();
  }, [fetchUser, getData]);

  const handleKerjakanUlang = useCallback(
    async (tryoutListId) => {
      if (!user?.userId) {
        setError("Data pengguna tidak tersedia");
        return;
      }

      try {
        setIsResetting(true);
        setError(null);

        await fetcher.post("/user/tryout/reset", {
          userId: user.userId,
          tryoutListId: Number(tryoutListId),
        });

        await getData();
        Swal.fire({
          text: "Tryout Bisa Dikerjakan Ulang, Silahkan Cek di Tryout Saya",
          confirmButtonColor: "#06C270",
        });
      } catch (err) {
        console.error("Error saat mereset tryout:", err);

        Swal.fire({
          text: "Terjadi kesalahan saat mereset tryout",
          confirmButtonColor: "#FF3B3B",
        });
      } finally {
        setIsResetting(false);
      }
    },
    [user, getData]
  );

  const renderTryoutCards = useCallback(
    (tryouts, action, urlPrefix = "") => {
      if (!tryouts?.length) {
        return <div className="col-span-full">Anda Belum memiliki Tryout</div>;
      }

      return tryouts.map((tryout, index) => (
        <div key={`${tryout.tryoutListId}-${index}`}>
          {isLoading ? (
            <LoadingTable />
          ) : (
            <TryOutCardNew
              title={tryout.title}
              desc={tryout.description}
              action={action}
              url={`${urlPrefix}${tryout.tryoutListId}`}
              imageUrl={tryout.imageUrl}
              kerjakanUlang={action === "Nilai Saya"}
              onKerjakanUlang={() => handleKerjakanUlang(tryout.tryoutListId)}
              isResetting={isResetting}
              disabled={isResetting}
            />
          )}
        </div>
      ));
    },
    [isLoading, isResetting, handleKerjakanUlang]
  );
  return (
    <>
      <main className="mb-20 mt-3 sm:mt-3 xl:mt-0 p-5 sm:p-5 xl:p-10 md:ml-64 xl:ml-64 dark:bg-black min-h-screen">
        <h1 className="font-bold text-2xl">Tryout SKB</h1>

        <p className="mt-5">
          Pilih paket belajar mandiri yang paling sesuai dengan kebutuhan
          belajarmu.
        </p>

        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <hr className="my-12" />

        <section>
          <h2 className="font-bold text-2xl mb-5">Belum Dikerjakan</h2>
          <div className="mt-5 grid grid-cols-1 gap-2 items-center md:grid md:grid-cols-2 lg:grid-cols-4 xl:grid xl:grid-cols-4">
            {renderTryoutCards(
              tryoutData.undone,
              "Kerjakan",
              "/app/mytryouts/tryoutinformation/"
            )}
          </div>
        </section>

        <hr className="my-12" />

        <section>
          <h2 className="font-bold text-2xl mb-5">Sudah Dikerjakan</h2>
          <div className="mt-5 grid grid-cols-1 gap-2 items-center md:grid md:grid-cols-2 lg:grid-cols-4 xl:grid xl:grid-cols-4">
            {renderTryoutCards(tryoutData.done, "Nilai Saya", "score/")}
          </div>
        </section>
      </main>
      <Outlet />
    </>
  );
};

export default MyTryout;
