import { Avatar, Dropdown } from "flowbite-react";
import { Link } from "react-router-dom";
import useAuth from "../stores/useAuth";

const BottomNav = () => {
  const { profile } = useAuth();

  const getInitials = (name) => {
    if (!name) return "U";
    const words = name.split(" ");
    const initials = words
      .slice(0, 2)
      .map((word) => word.charAt(0).toUpperCase())
      .join("");

    return initials;
  };
  return (
    <>
      <div className="bg-gray-100 p-2 sm:hidden">
        <ul className="flex justify-between">
          <li className="flex flex-col items-center">
            <Link to={"/app/dashboard"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
              </svg>
            </Link>
            <h1 className="text-xs">Home</h1>
          </li>
          <li className="flex flex-col items-center">
            <Link to={"/app/mytryouts"}>
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.1406 12.7343L19.5594 17.1541L15.1396 21.5739C14.9443 21.7692 14.6794 21.879 14.4031 21.8791H11.4583C11.1821 21.8791 10.9171 21.7693 10.7218 21.574C10.5264 21.3786 10.4167 21.1137 10.4167 20.8374V17.8905C10.4167 17.6143 10.5265 17.3494 10.7219 17.1541L15.1406 12.7343ZM17.7083 2.08325C18.2339 2.08309 18.7402 2.28159 19.1256 2.63898C19.511 2.99636 19.747 3.48622 19.7865 4.01034L19.7917 4.16659V8.35409C19.0047 8.20512 18.194 8.23966 17.4226 8.45501C16.6511 8.67036 15.9398 9.06072 15.3437 9.59575L15.1396 9.78846L9.24792 15.6812C8.7124 16.2167 8.38962 16.9286 8.33958 17.6843L8.33229 17.8905V20.8374C8.33238 21.1205 8.37093 21.4022 8.44688 21.6749L8.50937 21.8749H5.20833C4.68273 21.8751 4.17649 21.6766 3.7911 21.3192C3.4057 20.9618 3.16963 20.472 3.13021 19.9478L3.125 19.7916V4.16659C3.12483 3.64099 3.32334 3.13475 3.68073 2.74935C4.03811 2.36395 4.52796 2.12788 5.05208 2.08846L5.20833 2.08325H17.7083ZM21.0323 11.2614C21.3225 11.5516 21.5528 11.8961 21.7098 12.2753C21.8669 12.6544 21.9478 13.0608 21.9478 13.4713C21.9478 13.8817 21.8669 14.2881 21.7098 14.6673C21.5528 15.0465 21.3225 15.391 21.0323 15.6812L16.6146 11.2603C17.2006 10.6745 17.9953 10.3454 18.824 10.3454C19.6526 10.3454 20.4473 10.6745 21.0333 11.2603L21.0323 11.2614ZM11.4583 6.24992H7.29167C7.0154 6.24992 6.75045 6.35967 6.5551 6.55502C6.35975 6.75037 6.25 7.01532 6.25 7.29159C6.25 7.56785 6.35975 7.8328 6.5551 8.02816C6.75045 8.22351 7.0154 8.33325 7.29167 8.33325H11.4583C11.7346 8.33325 11.9996 8.22351 12.1949 8.02816C12.3903 7.8328 12.5 7.56785 12.5 7.29159C12.5 7.01532 12.3903 6.75037 12.1949 6.55502C11.9996 6.35967 11.7346 6.24992 11.4583 6.24992Z"
                  fill="#1C1C28"
                />
              </svg>
            </Link>
            <h1 className="text-xs">Tryout Saya</h1>
          </li>
          <li className="flex flex-col items-center">
            <Link to={"/app/mybimbel"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.948 49.948 0 0 0-9.902 3.912l-.003.002c-.114.06-.227.119-.34.18a.75.75 0 0 1-.707 0A50.88 50.88 0 0 0 7.5 12.173v-.224c0-.131.067-.248.172-.311a54.615 54.615 0 0 1 4.653-2.52.75.75 0 0 0-.65-1.352 56.123 56.123 0 0 0-4.78 2.589 1.858 1.858 0 0 0-.859 1.228 49.803 49.803 0 0 0-4.634-1.527.75.75 0 0 1-.231-1.337A60.653 60.653 0 0 1 11.7 2.805Z" />
                <path d="M13.06 15.473a48.45 48.45 0 0 1 7.666-3.282c.134 1.414.22 2.843.255 4.284a.75.75 0 0 1-.46.711 47.87 47.87 0 0 0-8.105 4.342.75.75 0 0 1-.832 0 47.87 47.87 0 0 0-8.104-4.342.75.75 0 0 1-.461-.71c.035-1.442.121-2.87.255-4.286.921.304 1.83.634 2.726.99v1.27a1.5 1.5 0 0 0-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.66a6.727 6.727 0 0 0 .551-1.607 1.5 1.5 0 0 0 .14-2.67v-.645a48.549 48.549 0 0 1 3.44 1.667 2.25 2.25 0 0 0 2.12 0Z" />
                <path d="M4.462 19.462c.42-.419.753-.89 1-1.395.453.214.902.435 1.347.662a6.742 6.742 0 0 1-1.286 1.794.75.75 0 0 1-1.06-1.06Z" />
              </svg>
            </Link>
            <h1 className="text-xs">Bimbel Saya</h1>
          </li>
          <li className="flex flex-col items-center">
            <Link to={"/app/tryoutstore"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            <h1 className="text-xs">Beli Tryout</h1>
          </li>

          <li className="flex flex-col items-center">
            <Link to={"/app/bimbelstore"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            <h1 className="text-xs">Beli Bimbel</h1>
          </li>

          <li className="flex flex-col items-center">
            <Link to={"/app/topup"}>
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.8334 7.29167V5.20833C20.8334 4.05937 19.899 3.125 18.75 3.125H5.20837C3.48546 3.125 2.08337 4.52708 2.08337 6.25V18.75C2.08337 21.0427 3.95212 21.875 5.20837 21.875H20.8334C21.9823 21.875 22.9167 20.9406 22.9167 19.7917V9.375C22.9167 8.22604 21.9823 7.29167 20.8334 7.29167ZM18.75 16.6667H16.6667V12.5H18.75V16.6667ZM5.20837 7.29167C4.94017 7.27967 4.68692 7.16468 4.50137 6.97064C4.31582 6.77661 4.21226 6.51848 4.21226 6.25C4.21226 5.98152 4.31582 5.72339 4.50137 5.52936C4.68692 5.33532 4.94017 5.22033 5.20837 5.20833H18.75V7.29167H5.20837Z"
                  fill="#1C1C28"
                />
              </svg>
            </Link>
            <h1 className="text-xs">TopUp</h1>
          </li>

          {/* <li className='flex flex-col items-center'>
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  size={'xs'}
                  alt='User settings'
                  color={'dark'}
                  placeholderInitials={getInitials(profile.name)}
                  bordered
                  rounded
                />
              }
            >
              <Dropdown.Header>
                <span className='block text-sm'>{profile.name}</span>
                <span className='block truncate text-sm font-medium'>
                  {profile.email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item>
                <Link to={'/app/profile'}>Edit Profile</Link>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>
                <Link className='text-red-500' to={'/auth/signout'}>
                  Sign Out
                </Link>
              </Dropdown.Item>
            </Dropdown>
            <h1 className='text-xs'>Profile</h1>
          </li> */}
        </ul>
      </div>
    </>
  );
};

export default BottomNav;
