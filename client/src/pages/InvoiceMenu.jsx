/* eslint-disable react/prop-types */
import { Button } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { fetcher } from "../utils/fetcher";
import { useAlert } from "../stores/useAlert";
import { useTopup } from "../stores/useTopup";
import CaraTopup from "../components/app/Topup/CaraTopup";
import Swal from "sweetalert2";
import { Navigate, useNavigate } from "react-router-dom";

const InvoiceMenu = () => {
  const fileInputRef = useRef(null);
  const { setAlert } = useAlert();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { set } = useTopup();
  const [status, setStatus] = useState("unpaid");
  const [fileName, setFileName] = useState("");
  const navigate = useNavigate();

  const errorIcon = `<svg width="106" height="105" viewBox="0 0 106 105" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M53 0.416748C81.7605 0.416748 105.084 23.7395 105.084 52.5C105.084 81.2605 81.7605 104.584 53 104.584C24.2395 104.584 0.916748 81.2605 0.916748 52.5C0.916748 23.7395 24.2395 0.416748 53 0.416748ZM64.9429 33.1926L53 45.1357L41.0574 33.1931L33.6929 40.5576L45.6355 52.5L33.6929 64.4429L41.0574 71.8074L53 59.8647L64.9429 71.8074L72.3074 64.4429L60.3647 52.5L72.3074 40.5574L64.9429 33.1926Z" fill="#FF3B3B"/>
</svg>
`;

  const successIcon = `<svg width="106" height="105" viewBox="0 0 106 105" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M52.9993 0.416992C24.2346 0.416992 0.916016 23.7356 0.916016 52.5002C0.916016 81.2649 24.2346 104.584 52.9993 104.584C81.7639 104.584 105.083 81.2649 105.083 52.5002C105.083 23.7356 81.7642 0.416992 52.9993 0.416992ZM72.6125 33.8921L79.9775 41.2571L47.791 73.5784L28.4836 54.271L35.8484 46.906L47.791 58.8486L72.6125 33.8921Z" fill="#06C270"/>
</svg>
`;

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
    setImage(file);
  };

  useEffect(() => {
    const getStatus = async () => {
      setLoading(true);
      const { data } = await fetcher.get("/user/transaction");
      if (data.transaction === "checking") {
        setLoading(true);
        setStatus(data.transaction);
      } else {
        setLoading(false);
      }
    };
    getStatus();
  }, []);

  const createVerification = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);

    const getStatus = async () => {
      setLoading(true);
      const { data } = await fetcher.get("/user/transaction");
      if (data.transaction === "checking") {
        setLoading(true);
        setStatus(data.transaction);
      } else {
        setLoading(false);
      }
    };

    try {
      setLoading(true);
      const { data } = await fetcher.post(
        "/user/transaction/verify",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      getStatus();
      setLoading(false);
      Swal.fire({
        iconHtml: successIcon,
        html: `Pembayaran Kamu Sedang Di Verifikasi Admin <br /> (Maks 1 x 6 jam)`,
        showConfirmButton: true,
        confirmButtonColor: "#06C270",
        confirmButtonText: "Oke!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/app/dashboard");
        }
      });
      setAlert({ title: "Info!", message: data.message, color: "success" });
    } catch (error) {
      Swal.fire({
        iconHtml: errorIcon,
        text: error.response?.data?.message || "An error occurred",
        showConfirmButton: true,
        confirmButtonColor: "#FF3B3B",
        confirmButtonText: "Coba Lagi",
      });
      setLoading(false);
    }
  };

  const trimString = (str) => {
    if (str.length > 20) {
      return str.slice(0, 20) + "...";
    }
    return str;
  };

  const handleCancel = async () => {
    try {
      setLoading(true);
      const { data } = await fetcher.delete("/user/transaction");
      setAlert({ title: "Success", message: data.message, color: "success" });
      set(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setAlert({
        title: "Gagal",
        message: error.response.data.message,
        color: "failure",
      });
    }
  };

  return (
    <section className="rounded-lg min-h-screen bg-white">
      <div className="p-6 flex items-center gap-3">
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
        <p className="text-2xl font-bold">Pembayaran</p>
      </div>
      <CaraTopup />
      <form className="p-5" onSubmit={createVerification}>
        <div className="mb-2">
          <div>
            <input
              type="file"
              id="bukti"
              disabled={loading}
              onChange={handleFile}
              ref={fileInputRef}
              className="hidden"
            />
            <label
              htmlFor="bukti"
              className="flex flex-col items-center w-full py-2 px-4 text-center text-sm bg-[#EDEDED] border border-gray-300 rounded-md cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                />
              </svg>
              Upload Bukti Pembayaran
              {fileName && (
                <p className="mt-2 text-center text-gray-700">
                  {trimString(fileName)}
                </p>
              )}
            </label>
          </div>
        </div>
        {/* <div className="border rounded-lg px-2 py-6 w-full text-center text-2xl font-bold text-white bg-green-400 my-2">
          <h1>Status : {status.toUpperCase()}</h1>
        </div> */}

        <div className="flex flex-col space-y-1 ">
          <Button
            disabled={loading}
            type="submit"
            size="sm"
            className="bg-[#00A337]"
          >
            Konfirmasi Pembayaran
          </Button>
          <Button
            disabled={loading}
            type="button"
            onClick={handleCancel}
            size="sm"
            className="bg-[#EDEDED] text-red-600"
          >
            Batalkan
          </Button>
        </div>
      </form>
    </section>
  );
};

export default InvoiceMenu;
