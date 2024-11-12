import React from "react";
import { Avatar } from "flowbite-react";
import avatar from "../../../assets/images/avatar.png";

export default function RankingCard(props) {
  const { title, name, email, ranking } = props;
  return (
    <div className="bg-gradient-to-tr from-[#8D65FF] to-[#6B46D5] w-full p-6 rounded-xl">
      <div>
        <p className="text-xl font-medium text-white">Peringkat Anda</p>
        <p className="text-xl font-bold text-white">#{ranking}</p>
        <p className="text-white font-bold text-xl">{title}</p>
      </div>
      <div className="flex items-center mt-12">
        <div>
          <Avatar img={avatar} alt="avatar of Jese" rounded size="lg" />
        </div>
        <div>
          <p className="text-white font-medium">{name}</p>
          <p className="text-white font-medium">{email}</p>
        </div>
      </div>
    </div>
  );
}
