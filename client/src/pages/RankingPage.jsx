import { useEffect, useState } from "react";
import { useRank } from "../stores/useRank";
import { fetcher } from "../utils/fetcher.js";
import { TryoutCardRanking } from "../components/app/Ranking/TryoutCard.jsx";
import { useNavigate } from "react-router-dom";

const RankingPage = () => {
  const [dataTryout, setDataTryout] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(``);
  const { setActive } = useRank();
  const navigate = useNavigate();

  const getList = async () => {
    try {
      const response = await fetcher.get("/user/getTryoutListForRanking");
      setFilteredData(response.data.data);
      setDataTryout(response.data.data);
    } catch (error) {
      console.error("Error fetching tryout list:", error);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) {
        setFilteredData(
          dataTryout.filter((item) =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
        );
      } else {
        setFilteredData(dataTryout);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, dataTryout]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleRanking = (id) => {
    setActive(id);
    console.log("id", id);
    navigate(`rankingpage/${id}`);
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
              onChange={handleSearch}
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

        <div className="mt-3 flex flex-col p-4 items-center gap-y-3 md:grid md:grid-cols-2 md:gap-3 md:p-0 lg:grid lg:grid-cols-5 lg:gap-3 xl:p-0 hover:shadow-md">
          {filteredData.map((tryout, index) => (
            <TryoutCardRanking
              key={index}
              title={tryout.title}
              desc={tryout.description}
              action={"Lihat Ranking"}
              onClick={() => handleRanking(tryout.id)}
              imageUrl={tryout.imageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RankingPage;
