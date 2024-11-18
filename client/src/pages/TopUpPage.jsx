import TopupInfo from "../components/app/Topup/TopupInfo";
import { useState, useEffect } from "react";
import { useTopup } from "../stores/useTopup";
import { fetcher } from "../utils/fetcher";
import { useAlert } from "../stores/useAlert";
import { SaldoCard } from "../components/app/Topup/SaldoCard.jsx";

import avatar from "../assets/images/avatar.png";

const TopUpPage = () => {
  const [total, setTotal] = useState(0);
  const [balance, setBalance] = useState(0);
  const { set, setMethodState } = useTopup();
  const { setAlert } = useAlert();
  const [next, setNext] = useState(false);
  const [method, setMethod] = useState("");

  useEffect(() => {
    const getBalance = async () => {
      try {
        const { data } = await fetcher.get("/user/summary");
        setBalance(data.balance);
      } catch (error) {
        console.error(error);
      }
    };
    getBalance();
  }, []);

  const handleChoose = (val) => {
    setTotal(val);
    console.log(total);
  };

  // const handleMethod = (val) => {
  //   setMethod(val);
  //   setMethodState(val);
  // };

  const formatIDR = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  // const handleNext = () => {
  //   setNext(true);
  // };

  const createTransaction = async () => {
    try {
      const { data } = await fetcher.post("/user/transaction", {
        amount: total,
      });
      setAlert({ title: "Info!", message: data.message, color: "success" });
      set(true);
    } catch (error) {
      setAlert({
        title: "Error!",
        message: error.response.data.message,
        color: "failure",
      });
    }
  };

  const topupOptions = [
    { amount: 20000, display: "20.000" },
    { amount: 40000, display: "40.000" },
    { amount: 60000, display: "60.000" },
    { amount: 100000, display: "100.000" },
    { amount: 200000, display: "200.000" },
    { amount: 300000, display: "300.000" },
  ];

  return (
    <>
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:grid lg:grid-cols-4 lg:gap-6">
          {/* Mobile Balance Card - Shows at top on mobile */}
          <div className="lg:hidden mb-6">
            <SaldoCard saldo={formatIDR(balance)} />
          </div>

          {/* Main Content Section */}
          <div className="lg:col-span-3">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <svg
                className="w-8 h-8 sm:w-9 sm:h-9"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="17.645" cy="17.645" r="17.645" fill="#FFF8E5" />
                <path
                  d="M21.6632 10.0017C22.1623 10.0016 22.6428 10.1911 23.0077 10.5317C23.3725 10.8723 23.5944 11.3387 23.6285 11.8366L23.6329 11.9714V21.8198C23.6327 21.9292 23.6735 22.0347 23.7472 22.1155C23.8209 22.1964 23.9221 22.2467 24.0311 22.2566C24.14 22.2664 24.2487 22.2352 24.3357 22.1689C24.4228 22.1027 24.4818 22.0063 24.5013 21.8986L24.5083 21.8198V12.6402C24.9653 12.6913 25.3899 12.9006 25.7087 13.2319C26.0275 13.5632 26.2204 13.9955 26.2539 14.4541L26.2592 14.5976V21.1633C26.2592 21.89 25.9812 22.5892 25.4821 23.1174C24.983 23.6456 24.3007 23.9629 23.5751 24.004L23.4141 24.0084H11.5959C10.8692 24.0084 10.17 23.7304 9.64181 23.2313C9.11358 22.7322 8.79636 22.0499 8.75522 21.3243L8.75084 21.1633V11.9714C8.75078 11.4723 8.94019 10.9918 9.28079 10.627C9.62139 10.2622 10.0878 10.0402 10.5857 10.0061L10.7205 10.0017H21.6632Z"
                  fill="#FFB001"
                />
              </svg>
              <p className="text-xl sm:text-2xl font-medium">Pilih Nominal</p>
            </div>

            {/* Amount Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {topupOptions.map((option) => (
                <button
                  key={option.amount}
                  onClick={() => handleChoose(option.amount)}
                  className={`w-full p-4 sm:p-6 rounded-2xl transition-colors ${
                    total === option.amount
                      ? "bg-[#FFCB01]"
                      : "bg-white border border-gray-200 hover:bg-[#FFF8E5]"
                  }`}
                >
                  <div className="flex flex-col gap-y-4 sm:gap-y-8">
                    <p className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                      {option.display}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-lg sm:text-xl lg:text-2xl font-semibold">
                        {formatIDR(option.amount)}
                      </p>
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 18L15 12L9 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Top Up Button */}
            <button
              className="w-full mt-6 p-3 sm:p-4 text-lg sm:text-xl font-medium text-white bg-[#FFCB01] hover:bg-[#FFB001] rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={createTransaction}
              disabled={!total}
            >
              Top Up
            </button>
          </div>

          {/* Desktop Balance Card - Shows on right side on desktop */}
          <div className="hidden lg:block lg:mt-14">
            <SaldoCard saldo={formatIDR(balance)} />
          </div>
        </div>
      </div>
      {/* <div className="flex flex-col-reverse xl:grid xl:grid-cols-4 xl:gap-5">
        <div className="col-span-3">
          <div className="flex gap-3 items-center">
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="17.645" cy="17.645" r="17.645" fill="#FFF8E5" />
              <path
                d="M21.6632 10.0017C22.1623 10.0016 22.6428 10.1911 23.0077 10.5317C23.3725 10.8723 23.5944 11.3387 23.6285 11.8366L23.6329 11.9714V21.8198C23.6327 21.9292 23.6735 22.0347 23.7472 22.1155C23.8209 22.1964 23.9221 22.2467 24.0311 22.2566C24.14 22.2664 24.2487 22.2352 24.3357 22.1689C24.4228 22.1027 24.4818 22.0063 24.5013 21.8986L24.5083 21.8198V12.6402C24.9653 12.6913 25.3899 12.9006 25.7087 13.2319C26.0275 13.5632 26.2204 13.9955 26.2539 14.4541L26.2592 14.5976V21.1633C26.2592 21.89 25.9812 22.5892 25.4821 23.1174C24.983 23.6456 24.3007 23.9629 23.5751 24.004L23.4141 24.0084H11.5959C10.8692 24.0084 10.17 23.7304 9.64181 23.2313C9.11358 22.7322 8.79636 22.0499 8.75522 21.3243L8.75084 21.1633V11.9714C8.75078 11.4723 8.94019 10.9918 9.28079 10.627C9.62139 10.2622 10.0878 10.0402 10.5857 10.0061L10.7205 10.0017H21.6632ZM15.0959 16.1296H12.0319C11.8578 16.1296 11.6908 16.1988 11.5676 16.3219C11.4445 16.4451 11.3753 16.6121 11.3753 16.7862V19.8501C11.3753 20.2126 11.6695 20.5067 12.0319 20.5067H15.0959C15.27 20.5067 15.437 20.4375 15.5601 20.3144C15.6832 20.1913 15.7524 20.0243 15.7524 19.8501V16.7862C15.7524 16.6121 15.6832 16.4451 15.5601 16.3219C15.437 16.1988 15.27 16.1296 15.0959 16.1296ZM20.3519 19.1936H18.1651L18.0758 19.1997C17.911 19.2224 17.7609 19.3068 17.656 19.4358C17.551 19.5649 17.4989 19.7289 17.5102 19.8949C17.5216 20.0609 17.5955 20.2163 17.717 20.3299C17.8386 20.4435 17.9987 20.5067 18.1651 20.5067H20.3519L20.4412 20.5006C20.606 20.4779 20.756 20.3935 20.861 20.2645C20.966 20.1354 21.018 19.9714 21.0067 19.8054C20.9954 19.6394 20.9214 19.484 20.7999 19.3704C20.6783 19.2568 20.5182 19.1936 20.3519 19.1936ZM14.4393 17.4428V19.1936H12.6885V17.4428H14.4393ZM20.3501 16.1296L18.1633 16.134L18.074 16.1393C17.9076 16.1603 17.7556 16.2443 17.6491 16.3739C17.5427 16.5035 17.4898 16.6689 17.5015 16.8362C17.5131 17.0035 17.5884 17.1601 17.7118 17.2737C17.8352 17.3873 17.9974 17.4493 18.1651 17.4471L20.3527 17.4428L20.4412 17.4366C20.606 17.4139 20.7561 17.3295 20.8611 17.2004C20.9661 17.0712 21.0181 16.907 21.0067 16.741C20.9952 16.575 20.9211 16.4195 20.7994 16.306C20.6777 16.1925 20.5174 16.1295 20.351 16.1296M20.3519 13.0692H12.0319L11.9426 13.0753C11.7778 13.098 11.6278 13.1824 11.5228 13.3114C11.4178 13.4404 11.3657 13.6045 11.3771 13.7705C11.3884 13.9364 11.4623 14.0919 11.5839 14.2055C11.7054 14.3191 11.8656 14.3822 12.0319 14.3823H20.3519L20.4412 14.377C20.6074 14.356 20.7592 14.2721 20.8656 14.1427C20.9721 14.0133 21.025 13.8481 21.0136 13.681C21.0022 13.5138 20.9273 13.3574 20.8043 13.2436C20.6812 13.1299 20.5194 13.0675 20.3519 13.0692Z"
                fill="#FFB001"
              />
            </svg>

            <p className="text-2xl font-medium">Pilih Nominal</p>
          </div>

          <ul className="grid grid-cols-3 gap-3 sm:gap-3 md:gap-3 xl:gap-5 sm:text-2xl font-semibold mt-5">
            <li>
              <button
                onClick={() => handleChoose(20000)}
                className={`w-full p-6 rounded-[24px] ${
                  total === 20000
                    ? "bg-[#FFCB01]"
                    : "bg-white border border-gray-200"
                } hover:bg-[#FFCB01] transition-colors`}
              >
                <div className="flex flex-col gap-y-14 text-left">
                  <p className="text-4xl font-bold">20.000</p>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-semibold">Rp20.000</p>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 18L15 12L9 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleChoose(40000)}
                className={`w-full p-6 rounded-[24px] ${
                  total === 40000
                    ? "bg-[#FFCB01]"
                    : "bg-white border border-gray-200"
                } hover:bg-[#FFCB01] transition-colors`}
              >
                <div className="flex flex-col gap-y-14 text-left">
                  <p className="text-4xl font-bold">40.000</p>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-semibold">Rp40.000</p>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 18L15 12L9 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleChoose(60000)}
                className={`w-full p-6 rounded-[24px] ${
                  total === 60000
                    ? "bg-[#FFCB01]"
                    : "bg-white border border-gray-200"
                } hover:bg-[#FFCB01] transition-colors`}
              >
                <div className="flex flex-col gap-y-14 text-left">
                  <p className="text-4xl font-bold">60.000</p>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-semibold">Rp60.000</p>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 18L15 12L9 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleChoose(100000)}
                className={`w-full p-6 rounded-[24px] ${
                  total === 100000
                    ? "bg-[#FFCB01]"
                    : "bg-white border border-gray-200"
                } hover:bg-[#FFCB01] transition-colors`}
              >
                <div className="flex flex-col gap-y-14 text-left">
                  <p className="text-4xl font-bold">100.000</p>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-semibold">Rp100.000</p>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 18L15 12L9 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleChoose(200000)}
                className={`w-full p-6 rounded-[24px] ${
                  total === 200000
                    ? "bg-[#FFCB01]"
                    : "bg-white border border-gray-200"
                } hover:bg-[#FFCB01] transition-colors`}
              >
                <div className="flex flex-col gap-y-14 text-left">
                  <p className="text-4xl font-bold">200.000</p>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-semibold">Rp200.000</p>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 18L15 12L9 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleChoose(300000)}
                className={`w-full p-6 rounded-[24px] ${
                  total === 300000
                    ? "bg-[#FFCB01]"
                    : "bg-white border border-gray-200"
                } hover:bg-[#FFCB01] transition-colors`}
              >
                <div className="flex flex-col gap-y-14 text-left">
                  <p className="text-4xl font-bold">300.000</p>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-semibold">Rp300.000</p>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 18L15 12L9 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </button>
            </li>
          </ul>
          <div>
            <button
              className="btn w-full mt-5 rounded-xl p-3 text-xl text-white font-medium bg-[#FFCB01] hover:bg-[#FFCB01]"
              onClick={createTransaction}
            >
              Top Up
            </button>
          </div>
        </div>
        <div className="xl:mt-14 mb-5 xl:mb-0">
          <SaldoCard saldo={formatIDR(balance)} />
        </div>
      </div> */}
    </>
  );
};

export default TopUpPage;
