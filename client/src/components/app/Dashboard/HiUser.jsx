import { useEffect, useState } from "react";
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
    <div className="sm:flex-row rounded-2xl bg-white px-12 xl:px-12 py-14 xl:py-14 border">
      <div className="flex justify-between items-center">
        <div>
          <p className="font-bold text-2xl xl:text-5xl">Hai, {nameRes}!</p>
          <p className="xl:text-lg">Siap Belajar CPNS hari ini?</p>
        </div>
        <div>
          <Avatar img={avatar} alt={`avatar of ${nameRes}`} rounded size="xl" />
        </div>
      </div>

     
    </div>
  );
};

export default HiUser;
