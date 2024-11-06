import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../stores/useAuth";
import { Avatar } from "flowbite-react";
import avatar from "../../../assets/images/avatar.png";

const HiUser = () => {
  const [great, setGreat] = useState("Datang");
  const [nameRes, setNameRes] = useState("User");
  const { profile } = useAuth();

  const times = () => {
    const sekarang = new Date();
    const jam = sekarang.getHours();

    if (jam < 12) {
      setGreat("Pagi");
    } else if (jam < 15) {
      setGreat("Siang");
    } else if (jam < 18) {
      setGreat("Sore");
    } else {
      setGreat("Malam");
    }
  };

  const getName = (sentence) => {
    const words = sentence.split(" ");
    let shortestWord = words[0];

    for (let i = 1; i < words.length; i++) {
      if (words[i].length < shortestWord.length) {
        shortestWord = words[i];
      }
    }
    setNameRes(shortestWord);
  };

  useEffect(() => {
    times();
    getName(profile.name);
  }, [profile]);

  return (
    <div className="sm:flex-row rounded-xl bg-white">
      <div className="flex justify-between items-center px-16 py-16">
        <div>
          <p className="font-bold text-5xl">Hai, {nameRes}!</p>
          <p className="text-lg">Siap Belajar CPNS hari ini?</p>
        </div>
        <div>
          <Avatar img={avatar} alt={`avatar of ${nameRes}`} rounded size="xl" />
        </div>
      </div>

      <div className="flex flex-col sm:hidden p-6">
        <h1 className="text-2xl">
          Selamat {great}, {nameRes}.
        </h1>
        <p className="text-sm">Selamat datang di dashboard JagoCPNS</p>
        <div className="mt-4">
          <Link
            to={"/app/mytryouts"}
            className="bg-jago-4 p-2 hover:bg-jago-2 text-sm font-medium text-white rounded-md"
          >
            lihat daftar tryout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HiUser;
