import { useState } from "react";
import { fetcher } from "../../../utils/fetcher.js";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export const DashboardCard = () => {
  const [userSummary, setUserSummary] = useState([]);

  useEffect(() => {
    const getUserSummary = async () => {
      try {
        const response = await fetcher.get("/user/summary");
        setUserSummary(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserSummary();
  }, []);
  return (
    <div className="flex flex-col xl:flex xl:flex-row xl:gap-5 gap-5">
      <div className=" bg-gradient-to-r from-[#00E109] to-[#00B97B] rounded-2xl p-5 xl:w-1/3 xl:p-5">
        <div className="flex flex-col gap-20">
          <div className="flex items-center gap-3">
            {" "}
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.8333 7.29167V5.20833C20.8333 4.05937 19.899 3.125 18.75 3.125H5.20833C3.48541 3.125 2.08333 4.52708 2.08333 6.25V18.75C2.08333 21.0427 3.95208 21.875 5.20833 21.875H20.8333C21.9823 21.875 22.9167 20.9406 22.9167 19.7917V9.375C22.9167 8.22604 21.9823 7.29167 20.8333 7.29167ZM18.75 16.6667H16.6667V12.5H18.75V16.6667ZM5.20833 7.29167C4.94012 7.27967 4.68688 7.16468 4.50132 6.97064C4.31577 6.77661 4.21222 6.51848 4.21222 6.25C4.21222 5.98152 4.31577 5.72339 4.50132 5.52936C4.68688 5.33532 4.94012 5.22033 5.20833 5.20833H18.75V7.29167H5.20833Z"
                fill="white"
              />
            </svg>
            <p className="font-bold text-white text-3xl">Saldo</p>
          </div>
          <div>
            <p className="text-white font-bold text-4xl text-end">
              Rp. {userSummary.balance}
            </p>
            <Link to={"/app/topup"}>
              <button className="btn bg-white bg-opacity-20 font-semibold w-full text-white rounded-lg mt-2 p-2">
                + Isi Saldo
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className=" bg-gradient-to-r from-[#8D65FF] to-[#6B46D5] rounded-2xl p-5 xl:w-1/3 xl:p-5">
        <div className="flex flex-col gap-20">
          <div className="flex items-center gap-3">
            <svg
              width="27"
              height="27"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.1406 10.7343L16.5594 15.1541L12.1396 19.5739C11.9443 19.7692 11.6794 19.879 11.4031 19.8791H8.45833C8.18207 19.8791 7.91711 19.7693 7.72176 19.574C7.52641 19.3786 7.41667 19.1137 7.41667 18.8374V15.8905C7.41673 15.6143 7.52651 15.3494 7.72187 15.1541L12.1406 10.7343ZM14.7083 0.0832521C15.2339 0.0830857 15.7402 0.281592 16.1256 0.638978C16.511 0.996364 16.747 1.48622 16.7865 2.01034L16.7917 2.16659V6.35409C16.0047 6.20512 15.194 6.23966 14.4226 6.45501C13.6511 6.67036 12.9398 7.06072 12.3437 7.59575L12.1396 7.78846L6.24792 13.6812C5.7124 14.2167 5.38962 14.9286 5.33958 15.6843L5.33229 15.8905V18.8374C5.33238 19.1205 5.37093 19.4022 5.44688 19.6749L5.50937 19.8749H2.20833C1.68273 19.8751 1.17649 19.6766 0.791096 19.3192C0.405699 18.9618 0.169629 18.472 0.130209 17.9478L0.125 17.7916V2.16659C0.124834 1.64099 0.32334 1.13475 0.680726 0.749348C1.03811 0.363951 1.52796 0.127881 2.05208 0.0884605L2.20833 0.0832521H14.7083ZM18.0323 9.26138C18.3225 9.55157 18.5528 9.89609 18.7098 10.2753C18.8669 10.6544 18.9478 11.0608 18.9478 11.4713C18.9478 11.8817 18.8669 12.2881 18.7098 12.6673C18.5528 13.0465 18.3225 13.391 18.0323 13.6812L13.6146 9.26034C14.2006 8.67449 14.9953 8.34538 15.824 8.34538C16.6526 8.34538 17.4473 8.67449 18.0333 9.26034L18.0323 9.26138ZM8.45833 4.24992H4.29167C4.0154 4.24992 3.75045 4.35967 3.5551 4.55502C3.35975 4.75037 3.25 5.01532 3.25 5.29159C3.25 5.56785 3.35975 5.8328 3.5551 6.02816C3.75045 6.22351 4.0154 6.33325 4.29167 6.33325H8.45833C8.7346 6.33325 8.99955 6.22351 9.1949 6.02816C9.39025 5.8328 9.5 5.56785 9.5 5.29159C9.5 5.01532 9.39025 4.75037 9.1949 4.55502C8.99955 4.35967 8.7346 4.24992 8.45833 4.24992Z"
                fill="white"
              />
            </svg>
            <p className="font-bold text-white text-3xl">Tryout</p>
          </div>
          <div>
            <p className="text-white font-bold text-4xl text-end">
              {userSummary.myOwnTryouts}
            </p>
            <Link to={"/app/mytryouts"}>
              <button className="btn bg-white bg-opacity-20 font-semibold w-full text-white rounded-lg mt-2 p-2">
                <div className="flex items-center justify-center gap-1">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.25 12.75V10.2708L9.95 2.58542C10.0667 2.47847 10.1956 2.39583 10.3368 2.3375C10.4779 2.27917 10.6261 2.25 10.7813 2.25C10.9364 2.25 11.0871 2.27917 11.2333 2.3375C11.3796 2.39583 11.5059 2.48333 11.6125 2.6L12.4146 3.41667C12.5312 3.52361 12.6164 3.65 12.6701 3.79583C12.7238 3.94167 12.7504 4.0875 12.75 4.23333C12.75 4.38889 12.7234 4.53725 12.6701 4.67842C12.6168 4.81958 12.5316 4.94831 12.4146 5.06458L4.72917 12.75H2.25ZM10.7667 5.05L11.5833 4.23333L10.7667 3.41667L9.95 4.23333L10.7667 5.05Z"
                      fill="white"
                    />
                  </svg>
                  Kerjakan
                </div>
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className=" bg-gradient-to-r from-[#FF2927] to-[#C80057] rounded-2xl p-5 xl:w-1/3 xl:p-5">
        <div className="flex flex-col gap-20">
          <div className="flex items-center gap-3">
            {" "}
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="#none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.8333 7.29167V5.20833C20.8333 4.05937 19.899 3.125 18.75 3.125H5.20833C3.48541 3.125 2.08333 4.52708 2.08333 6.25V18.75C2.08333 21.0427 3.95208 21.875 5.20833 21.875H20.8333C21.9823 21.875 22.9167 20.9406 22.9167 19.7917V9.375C22.9167 8.22604 21.9823 7.29167 20.8333 7.29167ZM18.75 16.6667H16.6667V12.5H18.75V16.6667ZM5.20833 7.29167C4.94012 7.27967 4.68688 7.16468 4.50132 6.97064C4.31577 6.77661 4.21222 6.51848 4.21222 6.25C4.21222 5.98152 4.31577 5.72339 4.50132 5.52936C4.68688 5.33532 4.94012 5.22033 5.20833 5.20833H18.75V7.29167H5.20833Z"
                fill="white"
              />
            </svg>
            <p className="font-bold text-white text-3xl">Bimbel</p>
          </div>
          <div>
            <p className="text-white font-bold text-4xl text-end">2 Bimbel</p>
            <button className="btn bg-white bg-opacity-20 font-semibold w-full text-white rounded-lg mt-2 p-2">
              + Tonton
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
