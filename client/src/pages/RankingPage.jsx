import { useEffect, useState, useRef } from "react";
import Choosen from "../components/app/Ranking/Choosen";
import Unchoosen from "../components/app/Ranking/Unchoosen";
import { useRank } from "../stores/useRank";
import { fetcher } from "../utils/fetcher.js";
import TableRank from "../components/app/Ranking/TableRank.jsx";
import { TryoutCardRanking } from "../components/app/Ranking/TryoutCard.jsx";
import { useNavigate } from "react-router-dom";

const RankingPage = () => {
  const [dataTryout, setDataTryout] = useState([]);
  const { setActive, active } = useRank();
  const targetSectionRef = useRef(null);
  const navigate = useNavigate()

  const getList = async () => {
    try {
      const response = await fetcher.get("/user/getTryoutList");
      console.log(response.data.data);
      setDataTryout(response.data.data)
        .sort((a, b) => {
          const aTitle = a.title.toLowerCase();
          const bTitle = b.title.toLowerCase();

          if (aTitle.includes("gratis") && !bTitle.includes("gratis")) {
            return -1;
          }
          if (!aTitle.includes("gratis") && bTitle.includes("gratis")) {
            return 1;
          }

          if (aTitle.includes("premium") && !bTitle.includes("premium")) {
            return -1;
          }
          if (!aTitle.includes("premium") && bTitle.includes("premium")) {
            return 1;
          }

          if (aTitle.includes("bimbel") && !bTitle.includes("bimbel")) {
            return 1;
          }
          if (!aTitle.includes("bimbel") && bTitle.includes("bimbel")) {
            return -1;
          }

          return 0;
        })
        .map((item) => ({
          id: item.id.toString(),
          title: item.title,
        }));
    } catch (error) {
      console.error("Error fetching tryout list:", error);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  const handleRanking = (id) => {
    setActive(id);
    console.log("id", id);
    navigate(`rankingpage/${id}`)
    // targetSectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <div className="sm:p-10 sm:ml-64 sm:mt-0 pb-16 dark:bg-black min-h-screen">
        <div>
          <div className="relative w-full">
            <input
              type="text"
              className="peer w-full rounded-lg border border-gray-300 px-4 py-2 pl-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              placeholder="Search..."
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
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
          </div>
        </div>

        <div className="grid grid-cols-5 gap-3 mt-5">
          {dataTryout.map((tryout, index) => (
            <TryoutCardRanking
              key={index}
              title={tryout.title}
              desc={tryout.description}
              action={"Lihat Ranking"}
              // url={`/app/tryoutinformation/${tryout.tryoutListId}`}
              onClick={() => handleRanking(tryout.id)}
              imageUrl={tryout.imageUrl}
            />
          ))}
        </div>

        <div ref={targetSectionRef}>
          <TableRank />
        </div>

        {!active && <Unchoosen />}
        {active && <Choosen />}
      </div>
    </div>
  );
};

export default RankingPage;
