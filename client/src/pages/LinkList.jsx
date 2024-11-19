import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetcher } from "../utils/fetcher";
import logo from "../assets/images/logo-extend-black.png";
import TelegramIcon from "../assets/links/telegram.svg";

const LinkList = () => {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const getLinks = async () => {
      const { data } = await fetcher.get("/public/links");
      setLinks(data);
    };
    getLinks();
  }, []);

  return (
    <div className="flex flex-col items-center justify-between py-6 min-h-screen">
      <div className="bg-white rounded-xl py-8 max-w-xl w-full">
        <div className="w-full flex flex-col items-center mb-6">
          <img src={logo} alt="logo" className="w-36" />
          <h1 className="text-2xl text-[#FFCB01] font-semibold mt-4">
            Let{"'"}s get in touch!
          </h1>
          <p>Pilih cara terbaik untuk terhubung dengan kami</p>
        </div>

        <div className="flex flex-col gap-5">
          <a href="https://jagocpns.id/">
            <div className="border w-full flex items-center p-5 gap-3 rounded-xl hover:border-[#FFCB01] hover:shadow-xl transition-shadow">
              <div>
                <span className="w-12 h-12 inline-block bg-blue-300 rounded-xl">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9.83824 18.4467C10.0103 18.7692 10.1826 19.0598 10.3473 19.3173C8.59745 18.9238 7.07906 17.9187 6.02838 16.5383C6.72181 16.1478 7.60995 15.743 8.67766 15.4468C8.98112 16.637 9.40924 17.6423 9.83824 18.4467ZM11.1618 17.7408C10.7891 17.0421 10.4156 16.1695 10.1465 15.1356C10.7258 15.0496 11.3442 15 12.0001 15C12.6559 15 13.2743 15.0496 13.8535 15.1355C13.5844 16.1695 13.2109 17.0421 12.8382 17.7408C12.5394 18.3011 12.2417 18.7484 12 19.0757C11.7583 18.7484 11.4606 18.3011 11.1618 17.7408ZM9.75 12C9.75 12.5841 9.7893 13.1385 9.8586 13.6619C10.5269 13.5594 11.2414 13.5 12.0001 13.5C12.7587 13.5 13.4732 13.5593 14.1414 13.6619C14.2107 13.1384 14.25 12.5841 14.25 12C14.25 11.4159 14.2107 10.8616 14.1414 10.3381C13.4732 10.4406 12.7587 10.5 12.0001 10.5C11.2414 10.5 10.5269 10.4406 9.8586 10.3381C9.7893 10.8615 9.75 11.4159 9.75 12ZM8.38688 10.0288C8.29977 10.6478 8.25 11.3054 8.25 12C8.25 12.6946 8.29977 13.3522 8.38688 13.9712C7.11338 14.3131 6.05882 14.7952 5.24324 15.2591C4.76698 14.2736 4.5 13.168 4.5 12C4.5 10.832 4.76698 9.72644 5.24323 8.74088C6.05872 9.20472 7.1133 9.68686 8.38688 10.0288ZM10.1465 8.86445C10.7258 8.95042 11.3442 9 12.0001 9C12.6559 9 13.2743 8.95043 13.8535 8.86447C13.5844 7.83055 13.2109 6.95793 12.8382 6.2592C12.5394 5.69894 12.2417 5.25156 12 4.92432C11.7583 5.25156 11.4606 5.69894 11.1618 6.25918C10.7891 6.95791 10.4156 7.83053 10.1465 8.86445ZM15.6131 10.0289C15.7002 10.6479 15.75 11.3055 15.75 12C15.75 12.6946 15.7002 13.3521 15.6131 13.9711C16.8866 14.3131 17.9412 14.7952 18.7568 15.2591C19.233 14.2735 19.5 13.1679 19.5 12C19.5 10.8321 19.233 9.72647 18.7568 8.74093C17.9413 9.20477 16.8867 9.6869 15.6131 10.0289ZM17.9716 7.46178C17.2781 7.85231 16.39 8.25705 15.3224 8.55328C15.0189 7.36304 14.5908 6.35769 14.1618 5.55332C13.9897 5.23077 13.8174 4.94025 13.6527 4.6827C15.4026 5.07623 16.921 6.08136 17.9716 7.46178ZM8.67765 8.55325C7.61001 8.25701 6.7219 7.85227 6.02839 7.46173C7.07906 6.08134 8.59745 5.07623 10.3472 4.6827C10.1826 4.94025 10.0103 5.23076 9.83823 5.5533C9.40924 6.35767 8.98112 7.36301 8.67765 8.55325ZM15.3224 15.4467C15.0189 16.637 14.5908 17.6423 14.1618 18.4467C13.9897 18.7692 13.8174 19.0598 13.6527 19.3173C15.4026 18.9238 16.921 17.9186 17.9717 16.5382C17.2782 16.1477 16.3901 15.743 15.3224 15.4467ZM12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                        fill="#1d0cdf"
                      ></path>{" "}
                    </g>
                  </svg>
                </span>
              </div>
              <div>
                <p className="font-bold text-xl">Website Jagocpns.id</p>
                <p className="text-gray-400">Kunjungi Website Resmi Kami</p>
              </div>
            </div>
          </a>

          <a href="https://www.groupcpns2024.com/">
            <div className="border w-full flex items-center p-5 gap-3 rounded-xl hover:border-[#FFCB01] hover:shadow-xl transition-shadow">
              <div>
                <span className="w-12 h-12 inline-block bg-purple-400 rounded-xl">
                  <svg
                    fill="#000000"
                    viewBox="0 0 128 128"
                    id="Layer_1"
                    version="1.1"
                    xmlSpace="preserve"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <g>
                        {" "}
                        <path d="M64,42c-13.2,0-24,10.8-24,24s10.8,24,24,24s24-10.8,24-24S77.2,42,64,42z M64,82c-8.8,0-16-7.2-16-16s7.2-16,16-16 s16,7.2,16,16S72.8,82,64,82z"></path>{" "}
                        <path d="M64,100.8c-14.9,0-29.2,6.2-39.4,17.1l-2.7,2.9l5.8,5.5l2.7-2.9c8.8-9.4,20.7-14.6,33.6-14.6s24.8,5.2,33.6,14.6l2.7,2.9 l5.8-5.5l-2.7-2.9C93.2,107.1,78.9,100.8,64,100.8z"></path>{" "}
                        <path d="M97,47.9v8c9.4,0,18.1,3.8,24.6,10.7l5.8-5.5C119.6,52.7,108.5,47.9,97,47.9z"></path>{" "}
                        <path d="M116.1,20c0-10.5-8.6-19.1-19.1-19.1S77.9,9.5,77.9,20S86.5,39.1,97,39.1S116.1,30.5,116.1,20z M85.9,20 c0-6.1,5-11.1,11.1-11.1s11.1,5,11.1,11.1s-5,11.1-11.1,11.1S85.9,26.1,85.9,20z"></path>{" "}
                        <path d="M31,47.9c-11.5,0-22.6,4.8-30.4,13.2l5.8,5.5c6.4-6.9,15.2-10.7,24.6-10.7V47.9z"></path>{" "}
                        <path d="M50.1,20C50.1,9.5,41.5,0.9,31,0.9S11.9,9.5,11.9,20S20.5,39.1,31,39.1S50.1,30.5,50.1,20z M31,31.1 c-6.1,0-11.1-5-11.1-11.1S24.9,8.9,31,8.9s11.1,5,11.1,11.1S37.1,31.1,31,31.1z"></path>{" "}
                      </g>{" "}
                    </g>
                  </svg>
                </span>
              </div>
              <div>
                <p className="font-bold text-xl">
                  Grup Diskusi Instansi Pusat & Daerah
                </p>
                <p className="text-gray-400">Bergabung Dengan Komunitas Kami</p>
              </div>
            </div>
          </a>
          <a href="https://api.whatsapp.com/send/?phone=+62895624999799&text=Halo%20min%20Jago!%0ASaya%20butuh%20bantuan%20nih">
            <div className="border w-full flex items-center p-5 gap-3 rounded-xl hover:border-[#FFCB01] hover:shadow-xl transition-shadow">
              <div>
                {/* <p>icon</p> */}
                <svg
                  className="w-12 h-12 text-green-700 dark:text-white bg-green-200 rounded-xl"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M12 4a8 8 0 0 0-6.895 12.06l.569.718-.697 2.359 2.32-.648.379.243A8 8 0 1 0 12 4ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10a9.96 9.96 0 0 1-5.016-1.347l-4.948 1.382 1.426-4.829-.006-.007-.033-.055A9.958 9.958 0 0 1 2 12Z"
                    clipRule="evenodd"
                  />
                  <path
                    fill="currentColor"
                    d="M16.735 13.492c-.038-.018-1.497-.736-1.756-.83a1.008 1.008 0 0 0-.34-.075c-.196 0-.362.098-.49.291-.146.217-.587.732-.723.886-.018.02-.042.045-.057.045-.013 0-.239-.093-.307-.123-1.564-.68-2.751-2.313-2.914-2.589-.023-.04-.024-.057-.024-.057.005-.021.058-.074.085-.101.08-.079.166-.182.249-.283l.117-.14c.121-.14.175-.25.237-.375l.033-.066a.68.68 0 0 0-.02-.64c-.034-.069-.65-1.555-.715-1.711-.158-.377-.366-.552-.655-.552-.027 0 0 0-.112.005-.137.005-.883.104-1.213.311-.35.22-.94.924-.94 2.16 0 1.112.705 2.162 1.008 2.561l.041.06c1.161 1.695 2.608 2.951 4.074 3.537 1.412.564 2.081.63 2.461.63.16 0 .288-.013.4-.024l.072-.007c.488-.043 1.56-.599 1.804-1.276.192-.534.243-1.117.115-1.329-.088-.144-.239-.216-.43-.308Z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-bold text-xl">Whatsapp Aduan</p>
                <p className="text-gray-400">Hubungi Kami Via Whatsapp</p>
              </div>
            </div>
          </a>

          <a href="https://t.me/jagocpnsindonesia">
            <div className="border w-full flex items-center p-5 gap-3 rounded-xl hover:border-[#FFCB01] hover:shadow-xl transition-shadow">
              <div className="bg-blue-200 rounded-xl">
                <img src={TelegramIcon} alt="" className="h-12 w-12" />
              </div>
              <div>
                <p className="font-bold text-xl">Telegram Aduan</p>
                <p className="text-gray-400">Hubungi Kami Via Telegram</p>
              </div>
            </div>
          </a>

          <a href="https://drive.google.com/drive/folders/1dkiIp7U2lrWheC4q1LKPBqY9J5_0_ya6">
            <div className="border w-full flex items-center p-5 gap-3 rounded-xl hover:border-[#FFCB01] hover:shadow-xl transition-shadow">
              <div>
                <svg
                  className="w-12 h-12 text-red-500 bg-red-300 rounded-xl dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 13V4M7 14H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2m-1-5-4 5-4-5m9 8h.01"
                  />
                </svg>
              </div>
              <div>
                <p className="font-bold text-xl">Link Download Gambar</p>
                <p className="text-gray-400">
                  Share Group Whatsapp / Telegram Kalian
                </p>
              </div>
            </div>
          </a>
          <a href="https://www.instagram.com/jagocpns.id/">
            <div className="border w-full flex items-center p-5 gap-3 rounded-xl hover:border-[#FFCB01] hover:shadow-xl transition-shadow">
              <div>
                <svg
                  className="w-12 h-12 text-pink-600 bg-pink-300 rounded-xl dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <p className="font-bold text-xl">Instagram</p>
                <p className="text-gray-400">Follow Us On Istagram</p>
              </div>
            </div>
          </a>
          <a href="https://api.whatsapp.com/send/?phone=+6285171547130&text=IkutBimbelBatch03">
            <div className="border w-full flex items-center p-5 gap-3 rounded-xl hover:border-[#FFCB01] hover:shadow-xl transition-shadow">
              <div>
                <svg
                  className="w-12 h-12 text-yellow-400 bg-yellow-200 rounded-xl dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M11 4.717c-2.286-.58-4.16-.756-7.045-.71A1.99 1.99 0 0 0 2 6v11c0 1.133.934 2.022 2.044 2.007 2.759-.038 4.5.16 6.956.791V4.717Zm2 15.081c2.456-.631 4.198-.829 6.956-.791A2.013 2.013 0 0 0 22 16.999V6a1.99 1.99 0 0 0-1.955-1.993c-2.885-.046-4.76.13-7.045.71v15.081Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <p className="font-bold text-xl">Bimbel Batch 3</p>
                <p className="text-gray-400">Bahas Soal Full FR</p>
              </div>
            </div>
          </a>
        </div>

        {/* <ul className="space-y-3 px-6">
          {links.map((item, index) => (
            <li key={index}>
              <Link
                to={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-center text-lg justify-center px-4 py-3 border border-gray-300 rounded-lg text-gray-800 hover:bg-gray-200 transition duration-150 ease-in-out"
              >
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-6 h-6 mr-3"
                  />
                )}
                {item.title}
              </Link>
            </li>
          ))}
        </ul> */}
      </div>
      <footer className="mt-6 text-sm text-gray-600">
        &copy; jagocpns.id 2024
      </footer>
    </div>
  );
};

export default LinkList;
