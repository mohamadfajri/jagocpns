import { Avatar } from "flowbite-react";
import avatar from "../../../assets/images/avatar.png";
import { fetcher } from "../../../utils/fetcher.js";
import { useEffect, useState } from "react";
export const SaldoCard = (props) => {
  const [user, setUser] = useState([]);
  const { saldo } = props;

  const getUser = async () => {
    try {
      const response = await fetcher("/user");
      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <div>
        <div className="bg-gradient-to-tr from-[#00B97B] to-[#00E109] w-full rounded-xl p-4">
          <div className="">
            <p className="text-white font-medium text-2xl">Saldo Anda</p>
            <p className="text-white font-medium text-2xl">{saldo}</p>
          </div>
          <div className="flex justify-start mt-20">
            <div>
              <Avatar img={avatar} alt={`avatar`} rounded size="lg" />
            </div>
            <div className="text-white">
              <p className="font-bold text-lg">{user.name}</p>
              <p className="text-lg">{user.email}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
