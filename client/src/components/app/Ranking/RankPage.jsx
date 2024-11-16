import TableRank from "./TableRank.jsx";
import PaginationRank from "./PaginationRank.jsx";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetcher } from "../../../utils/fetcher.js";
import RankingCard from "./RankingCard.jsx";
export default function RankPage() {
  const location = useLocation();
  const pathParts = location.pathname.split("/");
  const id = pathParts[pathParts.length - 1];
  const [tryOutName, setTryOutName] = useState();
  const [userData, setUserData] = useState([]);
  const [userRank, setUserRank] = useState();

  useEffect(() => {
    const fetchUserDataAndRank = async () => {
      try {
        const userResponse = await fetcher("/user");
        setUserData(userResponse.data);

        if (userResponse.data.userId) {
          try {
            const rankResponse = await fetcher(
              `/public/rank/tryout/${id}/user/${userResponse.data.userId}`
            );
            setUserRank(rankResponse.data.rank);
          } catch (error) {
            if (error.response?.status === 404) {
              setUserRank("Anda Belum Mengikuti Tryout Ini");
            } else {
              console.error("Error fetching user rank", error);
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserDataAndRank();
  }, [id]);

  useEffect(() => {
    const getTryOutName = async () => {
      try {
        const response = await fetcher(`/public/tryout/${id}`);
        setTryOutName(response.data.title);
      } catch (error) {
        console.error(error);
      }
    };
    getTryOutName();
  }, [id]);

  return (
    <div>
      <div className="p-5 sm:p-10 sm:ml-64 sm:mt-0 pb-16 dark:bg-black min-h-screen">
        <p className="text-2xl font-bold">Daftar Ranking</p>
        <p className="font-bold text-3xl">{tryOutName}</p>
        <div className="flex flex-col-reverse mt-5 xl:mt-0 xl:grid xl:grid-cols-5 gap-5">
          <div className="mt-5 xl:col-span-4">
            <TableRank />
            <PaginationRank />
          </div>
          <div className="flex flex-col items-center">
            <RankingCard
              title={tryOutName}
              name={userData.name}
              email={userData.email}
              ranking={userRank}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
