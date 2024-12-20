import { Link, Outlet } from "react-router-dom";
import logo from "../../assets/images/logo-extend-black.png";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import BottomNav from "../BottomNav";
import { Avatar } from "flowbite-react";
import { useEffect, useRef } from "react";
import { fetcher } from "../../utils/fetcher.js";
import avatar from "../../assets/images/avatar.png";
import Logo from "../../assets/images/logo-extend-black.png";
import Breadcrumb from "../Breadcrumb.jsx";

const Sidebar = () => {
  const [userData, setUserData] = useState([]);
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !event.target.closest(".burger-button")
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [open]);

  const handleToggle = () => setOpen(!open);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetcher("/user");
      setUserData(response.data);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);
  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-30">
        <BottomNav />
      </div>

      <div className="ml-5 md:ml-72 mt-5">
        <Breadcrumb />
      </div>

      <header className="flex justify-between items-center px-5 py-3 sm:hidden bg-white">
        <button onClick={handleToggle} className="sm:hidden">
          {/* Icon burger button */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>

        <img src={Logo} alt="" className="w-24" />

        <Link to={"/app/profile"}>
          <Avatar img={avatar} alt="avatar of Jese" rounded size="md" />
        </Link>
      </header>

      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity sm:hidden z-30"
          aria-hidden="true"
        />
      )}

      <aside
        ref={sidebarRef}
        id="default-sidebar"
        className={`fixed bg-white top-0 left-0 z-40 w-64 h-screen transition-transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 border-r border-gray-300`}
        aria-label="Sidebar"
      >
        <div className="px-5 pt-5 pb-7">
          <img src={logo} alt="logo" className="rounded-lg" />
        </div>

        <div className="flex flex-col h-[calc(100vh-100px)] overflow-x-auto">
          <div className="px-5 bg-white dark:bg-black">
            <ul className="space-y-4 font-semibold">
              <li>
                <Link
                  to={"/app/dashboard"}
                  className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white group ${
                    location.pathname === "/app/dashboard"
                      ? "bg-[#FFCB01]"
                      : "hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.16666 13.5417H10.4167C10.9896 13.5417 11.4583 13.0729 11.4583 12.5V4.16667C11.4583 3.59375 10.9896 3.125 10.4167 3.125H4.16666C3.59375 3.125 3.125 3.59375 3.125 4.16667V12.5C3.125 13.0729 3.59375 13.5417 4.16666 13.5417ZM4.16666 21.875H10.4167C10.9896 21.875 11.4583 21.4062 11.4583 20.8333V16.6667C11.4583 16.0937 10.9896 15.625 10.4167 15.625H4.16666C3.59375 15.625 3.125 16.0937 3.125 16.6667V20.8333C3.125 21.4062 3.59375 21.875 4.16666 21.875ZM14.5833 21.875H20.8333C21.4062 21.875 21.875 21.4062 21.875 20.8333V12.5C21.875 11.9271 21.4062 11.4583 20.8333 11.4583H14.5833C14.0104 11.4583 13.5417 11.9271 13.5417 12.5V20.8333C13.5417 21.4062 14.0104 21.875 14.5833 21.875ZM13.5417 4.16667V8.33333C13.5417 8.90625 14.0104 9.375 14.5833 9.375H20.8333C21.4062 9.375 21.875 8.90625 21.875 8.33333V4.16667C21.875 3.59375 21.4062 3.125 20.8333 3.125H14.5833C14.0104 3.125 13.5417 3.59375 13.5417 4.16667Z"
                      fill="black"
                    />
                  </svg>

                  <span className="ms-3">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  to={"/app/mytryouts"}
                  className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white group ${
                    location.pathname.includes("/app/mytryouts")
                      ? "bg-[#FFCB01]"
                      : "hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 19 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.1406 10.7343L16.5594 15.1541L12.1396 19.5739C11.9443 19.7692 11.6794 19.879 11.4031 19.8791H8.45833C8.18207 19.8791 7.91711 19.7693 7.72176 19.574C7.52641 19.3786 7.41667 19.1137 7.41667 18.8374V15.8905C7.41673 15.6143 7.52651 15.3494 7.72187 15.1541L12.1406 10.7343ZM14.7083 0.0832521C15.2339 0.0830857 15.7402 0.281592 16.1256 0.638978C16.511 0.996364 16.747 1.48622 16.7865 2.01034L16.7917 2.16659V6.35409C16.0047 6.20512 15.194 6.23966 14.4226 6.45501C13.6511 6.67036 12.9398 7.06072 12.3437 7.59575L12.1396 7.78846L6.24792 13.6812C5.7124 14.2167 5.38962 14.9286 5.33958 15.6843L5.33229 15.8905V18.8374C5.33238 19.1205 5.37093 19.4022 5.44688 19.6749L5.50937 19.8749H2.20833C1.68273 19.8751 1.17649 19.6766 0.791096 19.3192C0.405699 18.9618 0.169629 18.472 0.130209 17.9478L0.125 17.7916V2.16659C0.124834 1.64099 0.32334 1.13475 0.680726 0.749348C1.03811 0.363951 1.52796 0.127881 2.05208 0.0884605L2.20833 0.0832521H14.7083ZM18.0323 9.26138C18.3225 9.55157 18.5528 9.89609 18.7098 10.2753C18.8669 10.6544 18.9478 11.0608 18.9478 11.4713C18.9478 11.8817 18.8669 12.2881 18.7098 12.6673C18.5528 13.0465 18.3225 13.391 18.0323 13.6812L13.6146 9.26034C14.2006 8.67449 14.9953 8.34538 15.824 8.34538C16.6526 8.34538 17.4473 8.67449 18.0333 9.26034L18.0323 9.26138ZM8.45833 4.24992H4.29167C4.0154 4.24992 3.75045 4.35967 3.5551 4.55502C3.35975 4.75037 3.25 5.01532 3.25 5.29159C3.25 5.56785 3.35975 5.8328 3.5551 6.02816C3.75045 6.22351 4.0154 6.33325 4.29167 6.33325H8.45833C8.7346 6.33325 8.99955 6.22351 9.1949 6.02816C9.39025 5.8328 9.5 5.56785 9.5 5.29159C9.5 5.01532 9.39025 4.75037 9.1949 4.55502C8.99955 4.35967 8.7346 4.24992 8.45833 4.24992Z"
                      fill="black"
                    />
                  </svg>

                  <span className="ms-3">Tryout Saya</span>
                </Link>
              </li>
              <li>
                <Link
                  to={"/app/mybimbel"}
                  className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white group ${
                    location.pathname === "/app/mybimbel"
                      ? "bg-[#FFCB01]"
                      : "hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.20833 13.7293V16.6563C5.20833 17.4168 5.625 18.1251 6.29166 18.4897L11.5 21.3334C12.125 21.6772 12.875 21.6772 13.5 21.3334L18.7083 18.4897C19.375 18.1251 19.7917 17.4168 19.7917 16.6563V13.7293L13.5 17.1668C12.875 17.5105 12.125 17.5105 11.5 17.1668L5.20833 13.7293ZM11.5 3.66675L2.71875 8.45842C2 8.85425 2 9.89592 2.71875 10.2918L11.5 15.0834C12.125 15.4272 12.875 15.4272 13.5 15.0834L21.875 10.5105V16.6668C21.875 17.2397 22.3437 17.7084 22.9167 17.7084C23.4896 17.7084 23.9583 17.2397 23.9583 16.6668V9.98967C23.9583 9.60425 23.75 9.2605 23.4167 9.073L13.5 3.66675C13.1922 3.50261 12.8488 3.41675 12.5 3.41675C12.1512 3.41675 11.8078 3.50261 11.5 3.66675Z"
                      fill="black"
                    />
                  </svg>
                  <span className="ms-3">Bimbel Saya</span>
                </Link>
              </li>
              <li>
                <Link
                  to={"/app/ranks"}
                  className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white group ${
                    location.pathname.includes("/app/ranks")
                      ? "bg-[#FFCB01]"
                      : "hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.29166 21.875V19.7917H11.4583V16.5625C10.6076 16.3715 9.84826 16.0115 9.1802 15.4823C8.51215 14.9531 8.02152 14.2889 7.70833 13.4896C6.40625 13.3333 5.31701 12.7649 4.44062 11.7844C3.56423 10.8038 3.12569 9.65347 3.125 8.33333V7.29167C3.125 6.71875 3.32916 6.22847 3.7375 5.82083C4.14583 5.41319 4.63611 5.20903 5.20833 5.20833H7.29166V3.125H17.7083V5.20833H19.7917C20.3646 5.20833 20.8552 5.4125 21.2635 5.82083C21.6719 6.22917 21.8757 6.71944 21.875 7.29167V8.33333C21.875 9.65278 21.4365 10.8031 20.5594 11.7844C19.6823 12.7656 18.5931 13.334 17.2917 13.4896C16.9792 14.2882 16.4889 14.9524 15.8208 15.4823C15.1528 16.0122 14.3931 16.3722 13.5417 16.5625V19.7917H17.7083V21.875H7.29166ZM7.29166 11.25V7.29167H5.20833V8.33333C5.20833 8.99306 5.3993 9.58785 5.78125 10.1177C6.16319 10.6476 6.66666 11.025 7.29166 11.25ZM17.7083 11.25C18.3333 11.0243 18.8368 10.6465 19.2187 10.1167C19.6007 9.58681 19.7917 8.99236 19.7917 8.33333V7.29167H17.7083V11.25Z"
                      fill="black"
                    />
                  </svg>

                  <span className="ms-3">Ranking</span>
                </Link>
              </li>
              <li>
                <Link
                  to={"/app/tryoutstore"}
                  className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white group ${
                    location.pathname.includes("/app/tryoutstore")
                      ? "bg-[#FFCB01]"
                      : "hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.33333 8.33333V7.29167C8.33333 6.1866 8.77232 5.12679 9.55372 4.34539C10.3351 3.56399 11.3949 3.125 12.5 3.125C13.6051 3.125 14.6649 3.56399 15.4463 4.34539C16.2277 5.12679 16.6667 6.1866 16.6667 7.29167V8.33333"
                      stroke="black"
                      strokeWidth="2.46889"
                      strokeLinecap="round"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.73541 7.90216C3.125 8.51258 3.125 9.49383 3.125 11.4584V14.5834C3.125 18.5115 3.125 20.4761 4.34583 21.6959C5.56666 22.9157 7.5302 22.9167 11.4583 22.9167H13.5417C17.4698 22.9167 19.4344 22.9167 20.6542 21.6959C21.874 20.4751 21.875 18.5115 21.875 14.5834V11.4584C21.875 9.49383 21.875 8.51258 21.2646 7.90216C20.6542 7.29175 19.6729 7.29175 17.7083 7.29175H7.29166C5.32708 7.29175 4.34583 7.29175 3.73541 7.90216ZM10.4167 12.5001C10.4167 12.2238 10.3069 11.9589 10.1116 11.7635C9.91621 11.5682 9.65126 11.4584 9.375 11.4584C9.09873 11.4584 8.83378 11.5682 8.63843 11.7635C8.44308 11.9589 8.33333 12.2238 8.33333 12.5001V14.5834C8.33333 14.8597 8.44308 15.1246 8.63843 15.32C8.83378 15.5153 9.09873 15.6251 9.375 15.6251C9.65126 15.6251 9.91621 15.5153 10.1116 15.32C10.3069 15.1246 10.4167 14.8597 10.4167 14.5834V12.5001ZM16.6667 12.5001C16.6667 12.2238 16.5569 11.9589 16.3616 11.7635C16.1662 11.5682 15.9013 11.4584 15.625 11.4584C15.3487 11.4584 15.0838 11.5682 14.8884 11.7635C14.6931 11.9589 14.5833 12.2238 14.5833 12.5001V14.5834C14.5833 14.8597 14.6931 15.1246 14.8884 15.32C15.0838 15.5153 15.3487 15.6251 15.625 15.6251C15.9013 15.6251 16.1662 15.5153 16.3616 15.32C16.5569 15.1246 16.6667 14.8597 16.6667 14.5834V12.5001Z"
                      fill="black"
                    />
                  </svg>

                  <span className="ms-3">Beli Tryout</span>
                </Link>
              </li>

              <li>
                <Link
                  to={"/app/bimbelstore"}
                  className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white group ${
                    location.pathname.includes("/app/bimbelstore")
                      ? "bg-[#FFCB01]"
                      : "hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.33333 8.33333V7.29167C8.33333 6.1866 8.77232 5.12679 9.55372 4.34539C10.3351 3.56399 11.3949 3.125 12.5 3.125C13.6051 3.125 14.6649 3.56399 15.4463 4.34539C16.2277 5.12679 16.6667 6.1866 16.6667 7.29167V8.33333"
                      stroke="black"
                      strokeWidth="2.46889"
                      strokeLinecap="round"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.73541 7.90216C3.125 8.51258 3.125 9.49383 3.125 11.4584V14.5834C3.125 18.5115 3.125 20.4761 4.34583 21.6959C5.56666 22.9157 7.5302 22.9167 11.4583 22.9167H13.5417C17.4698 22.9167 19.4344 22.9167 20.6542 21.6959C21.874 20.4751 21.875 18.5115 21.875 14.5834V11.4584C21.875 9.49383 21.875 8.51258 21.2646 7.90216C20.6542 7.29175 19.6729 7.29175 17.7083 7.29175H7.29166C5.32708 7.29175 4.34583 7.29175 3.73541 7.90216ZM10.4167 12.5001C10.4167 12.2238 10.3069 11.9589 10.1116 11.7635C9.91621 11.5682 9.65126 11.4584 9.375 11.4584C9.09873 11.4584 8.83378 11.5682 8.63843 11.7635C8.44308 11.9589 8.33333 12.2238 8.33333 12.5001V14.5834C8.33333 14.8597 8.44308 15.1246 8.63843 15.32C8.83378 15.5153 9.09873 15.6251 9.375 15.6251C9.65126 15.6251 9.91621 15.5153 10.1116 15.32C10.3069 15.1246 10.4167 14.8597 10.4167 14.5834V12.5001ZM16.6667 12.5001C16.6667 12.2238 16.5569 11.9589 16.3616 11.7635C16.1662 11.5682 15.9013 11.4584 15.625 11.4584C15.3487 11.4584 15.0838 11.5682 14.8884 11.7635C14.6931 11.9589 14.5833 12.2238 14.5833 12.5001V14.5834C14.5833 14.8597 14.6931 15.1246 14.8884 15.32C15.0838 15.5153 15.3487 15.6251 15.625 15.6251C15.9013 15.6251 16.1662 15.5153 16.3616 15.32C16.5569 15.1246 16.6667 14.8597 16.6667 14.5834V12.5001Z"
                      fill="black"
                    />
                  </svg>

                  <span className="ms-3">Beli Bimbel</span>
                </Link>
              </li>

              <li>
                <Link
                  to={"/app/topup"}
                  className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white group ${
                    location.pathname === "/app/topup"
                      ? "bg-[#FFCB01]"
                      : "hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.8333 7.29167V5.20833C20.8333 4.05937 19.899 3.125 18.75 3.125H5.20833C3.48541 3.125 2.08333 4.52708 2.08333 6.25V18.75C2.08333 21.0427 3.95208 21.875 5.20833 21.875H20.8333C21.9823 21.875 22.9167 20.9406 22.9167 19.7917V9.375C22.9167 8.22604 21.9823 7.29167 20.8333 7.29167ZM18.75 16.6667H16.6667V12.5H18.75V16.6667ZM5.20833 7.29167C4.94012 7.27967 4.68688 7.16468 4.50132 6.97064C4.31577 6.77661 4.21222 6.51848 4.21222 6.25C4.21222 5.98152 4.31577 5.72339 4.50132 5.52936C4.68688 5.33532 4.94012 5.22033 5.20833 5.20833H18.75V7.29167H5.20833Z"
                      fill="black"
                    />
                  </svg>

                  <span className="ms-3">TopUp</span>
                </Link>
              </li>
              <li>
                <Link
                  to={"/app/information"}
                  className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white group ${
                    location.pathname === "/app/information"
                      ? "bg-[#FFCB01]"
                      : "hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.4479 18.7499C12.8125 18.7499 13.1208 18.6239 13.3729 18.3718C13.625 18.1197 13.7507 17.8117 13.75 17.4478C13.7493 17.084 13.6236 16.7756 13.3729 16.5228C13.1222 16.2701 12.8139 16.1444 12.4479 16.1458C12.0819 16.1471 11.774 16.2732 11.524 16.5239C11.274 16.7746 11.1479 17.0826 11.1458 17.4478C11.1437 17.8131 11.2698 18.1215 11.524 18.3728C11.7781 18.6242 12.0861 18.7499 12.4479 18.7499ZM11.5104 14.7395H13.4375C13.4375 14.1666 13.5028 13.7152 13.6333 13.3853C13.7639 13.0555 14.1326 12.6041 14.7396 12.0312C15.191 11.5798 15.5469 11.1499 15.8073 10.7416C16.0677 10.3333 16.1979 9.84298 16.1979 9.27076C16.1979 8.29854 15.842 7.55201 15.1302 7.03118C14.4184 6.51034 13.5764 6.24992 12.6042 6.24992C11.6146 6.24992 10.8118 6.51034 10.1958 7.03118C9.57986 7.55201 9.15 8.17701 8.90625 8.90618L10.625 9.58326C10.7118 9.27076 10.9073 8.93222 11.2115 8.56763C11.5156 8.20305 11.9799 8.02076 12.6042 8.02076C13.1597 8.02076 13.5764 8.17284 13.8542 8.47701C14.1319 8.78117 14.2708 9.1152 14.2708 9.47909C14.2708 9.82631 14.1667 10.152 13.9583 10.4562C13.75 10.7603 13.4896 11.0423 13.1771 11.302C12.4132 11.9791 11.9444 12.4912 11.7708 12.8385C11.5972 13.1857 11.5104 13.8194 11.5104 14.7395ZM12.5 22.9166C11.059 22.9166 9.70486 22.6433 8.4375 22.0968C7.17014 21.5503 6.0677 20.8079 5.1302 19.8697C4.1927 18.9315 3.45069 17.8291 2.90416 16.5624C2.35764 15.2958 2.08402 13.9416 2.08333 12.4999C2.08264 11.0583 2.35625 9.70409 2.90416 8.43743C3.45208 7.17076 4.19409 6.06833 5.1302 5.13013C6.06632 4.19194 7.16875 3.44992 8.4375 2.90409C9.70625 2.35826 11.0604 2.08465 12.5 2.08326C13.9396 2.08187 15.2937 2.35548 16.5625 2.90409C17.8312 3.4527 18.9337 4.19472 19.8698 5.13013C20.8059 6.06555 21.5483 7.16798 22.0969 8.43743C22.6455 9.70687 22.9187 11.061 22.9167 12.4999C22.9146 13.9388 22.641 15.293 22.0958 16.5624C21.5507 17.8319 20.8087 18.9343 19.8698 19.8697C18.9309 20.8051 17.8285 21.5475 16.5625 22.0968C15.2965 22.6461 13.9424 22.9194 12.5 22.9166Z"
                      fill="black"
                    />
                  </svg>

                  <span className="ms-3">Informasi</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="p-4 mt-10">
            <ul className="">
              <li>
                <div className="bg-gradient-to-r from-[#8d65ff] to-[#6846d5] rounded-xl">
                  <div className="flex justify-center items-center">
                    <div className="relative -top-11">
                      <div className="">
                        <Avatar
                          img={avatar}
                          alt="avatar of Jese"
                          rounded
                          size="xl"
                        />
                      </div>
                      <div className="text-center mb-3">
                        <p className="text-2xl text-white font-medium">
                          {userData.name}
                        </p>
                        <p className="text-xl text-white">{userData.email}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <Link to={"/app/profile"}>
                          <button className="btn bg-white w-full rounded-lg bg-opacity-25 text-white font-bold">
                            Profile
                          </button>
                        </Link>
                        <Link to={"/auth/signout"}>
                          <button className="btn bg-white w-full rounded-lg bg-opacity-25 text-white font-bold">
                            Log Out
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </aside>

      <Outlet />
    </>
  );
};

export default Sidebar;
