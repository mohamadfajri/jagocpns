import { useEffect, useState } from "react";
import { TryOutCardNew } from "../components/app/MyTryout/TryOutCardNew.jsx";
import { fetcher } from "../utils/fetcher.js";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal } from "flowbite-react";
import Swal from "sweetalert2";

export default function CheckOutPage() {
  const location = useLocation();
  const pathParts = location.pathname.split("/");
  const id = pathParts[pathParts.length - 1];
  const [tryout, setTryout] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [user, setUser] = useState([{}]);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const DISCOUNT_CODES = {
    JAGOCPNS: { amount: 10000, type: "fixed" },
    WELCOME50: { amount: 50, type: "percentage" },
    FLASH25: { amount: 25, type: "percentage" },
  };

  const [discountInput, setDiscountInput] = useState("");
  const [discountValid, setDiscountValid] = useState(false);
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const [discountMessage, setDiscountMessage] = useState("");

  const calculateDiscount = (price, discountInfo) => {
    if (!discountInfo) return 0;
    if (discountInfo.type === "fixed") {
      return discountInfo.amount;
    } else if (discountInfo.type === "percentage") {
      return Math.round((price * discountInfo.amount) / 100);
    }
    return 0;
  };

  const handleDiscountButton = (e) => {
    e.preventDefault();
    const normalizedInput = discountInput.trim().toUpperCase();
    const discountInfo = DISCOUNT_CODES[normalizedInput];

    if (discountInfo) {
      setDiscountValid(true);
      setAppliedDiscount(discountInfo);
      setDiscountMessage("Kode Promo Berhasil Digunakan");
    } else {
      setDiscountValid(false);
      setAppliedDiscount(null);
      setDiscountMessage("Kode Promo Tidak Valid");
    }
  };

  const calculateTotalPrice = () => {
    if (!tryout.price) return 0;
    const discountAmount =
      discountValid && appliedDiscount
        ? calculateDiscount(tryout.price, appliedDiscount)
        : 0;
    return Math.max(0, tryout.price - discountAmount);
  };

  const formatIDR = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  const getUser = async () => {
    try {
      const response = await fetcher("/user");
      setUser([
        {
          id: response.data.userId,
          email: response.data.email,
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckOut = async () => {
    setIsLoading(true);
    try {
      const response = await fetcher.post("/user/checkout", {
        target: user,
        tryoutListId: parseInt(id),
        discountCode: discountInput,
      });
      if (response.status === 200) {
        swalFireConfirmmed();
      }
      setOpenModal(false);
      setIsLoading(false);
    } catch (error) {
      if (error.response.status >= 400) {
        swalFireDenied(error.response.data.message);
      }
      setIsLoading(false);
    }
  };

  const getTryOutData = async () => {
    try {
      const response = await fetcher(`/public/tryout/${id}`);
      setTryout(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTryOutData();
    getUser();
  }, []);

  const swalFireDenied = (message) => {
    const denidedIcon = `<svg width="106" height="105" viewBox="0 0 106 105" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M53 0.416748C81.7605 0.416748 105.084 23.7395 105.084 52.5C105.084 81.2605 81.7605 104.584 53 104.584C24.2395 104.584 0.916748 81.2605 0.916748 52.5C0.916748 23.7395 24.2395 0.416748 53 0.416748ZM64.9429 33.1926L53 45.1357L41.0574 33.1931L33.6929 40.5576L45.6355 52.5L33.6929 64.4429L41.0574 71.8074L53 59.8647L64.9429 71.8074L72.3074 64.4429L60.3647 52.5L72.3074 40.5574L64.9429 33.1926Z" fill="#FF3B3B"/>
  </svg>
  `;
    Swal.fire({
      icon: "error",
      iconHtml: denidedIcon,
      text: `${message}`,
      confirmButtonColor: "#FF3B3B",
      confirmButtonText: "Coba Lagi",
    });
  };

  const swalFireConfirmmed = () => {
    const confirmedIcon = `<svg
        width="126"
        height="125"
        viewBox="0 0 126 125"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M62.9993 10.417C34.2346 10.417 10.916 33.7356 10.916 62.5002C10.916 91.2649 34.2346 114.584 62.9993 114.584C91.7639 114.584 115.083 91.2649 115.083 62.5002C115.083 33.7356 91.7642 10.417 62.9993 10.417ZM82.6125 43.8921L89.9775 51.2571L57.791 83.5784L38.4836 64.271L45.8484 56.906L57.791 68.8486L82.6125 43.8921Z"
          fill="#06C270"
        />
      </svg>`;

    Swal.fire({
      icon: "success",
      iconHtml: confirmedIcon,
      confirmButtonColor: "#06C270",
      confirmButtonText: "Tryout Saya",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/app/mytryouts");
      }
    });
  };

  return (
    <div className="sm:p-10 sm:ml-64 dark:bg-black min-h-screen sm:mt-0">
      <div>
        <p className="font-bold text-xl">{tryout.title}</p>
        <p className="mt-3">
          Pilih paket belajar mandiri yang paling sesuai dengan kebutuhan
          belajarmu.
        </p>
      </div>
      <div className="mt-12 grid grid-cols-3 gap-x-3">
        <div className="col-span-2">
          <p className="font-bold text-2xl">Tentang paket</p>
          <p className="mt-5">{tryout.description}</p>
        </div>
        <div className="flex justify-center">
          <TryOutCardNew
            title={tryout.title}
            desc={tryout.description}
            action={"Beli"}
            imageUrl={tryout.imageUrl}
            price={tryout.price}
            onOpenModal={() => setOpenModal(true)}
          />
        </div>
      </div>

      <Modal
        dismissible
        show={openModal}
        onClose={() => setOpenModal(false)}
        size="md"
      >
        <Modal.Body>
          <div className="bg-yellow-300 p-3">
            <div className="w-fit bg-white rounded-xl px-3">
              <p>Jagocpns</p>
            </div>
            <p className="font-medium text-3xl mt-2">Tryout</p>
            <div className="bg-[#004FC4] px-3 mt-2">
              <p className="text-white">Premium</p>
            </div>
          </div>

          <div className="broder shadow-lg p-2">
            <p className="font-bold text-xl">{tryout.title}</p>
            <div className="flex gap-5 mt-3">
              <div className="flex gap-1">
                <svg
                  className="w-6 h-6 text-[#004FC4] dark:text-white"
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
                    d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4"
                  />
                </svg>

                <p>100 soal</p>
              </div>
              <div className="flex gap-1">
                <svg
                  className="w-6 h-6 text-[#004FC4] dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                    clipRule="evenodd"
                  />
                </svg>

                <p>90 Menit</p>
              </div>
            </div>

            <div className="mt-3">
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 text-[#06C270] dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.045 3.007 12.31 3a1.965 1.965 0 0 0-1.4.585l-7.33 7.394a2 2 0 0 0 0 2.805l6.573 6.631a1.957 1.957 0 0 0 1.4.585 1.965 1.965 0 0 0 1.4-.585l7.409-7.477A2 2 0 0 0 21 11.479v-5.5a2.972 2.972 0 0 0-2.955-2.972Zm-2.452 6.438a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
                </svg>

                <p className="font-medium">{formatIDR(tryout.price)}</p>
              </div>
            </div>
          </div>

          <div className="flex mt-5 justify-between gap-x-5">
            <input
              type="text"
              placeholder="Punya Code Promo?"
              className={`border-gray-300 rounded-lg w-full ${
                discountValid
                  ? "border-green-500"
                  : discountInput
                  ? "border-red-500"
                  : ""
              }`}
              value={discountInput}
              onChange={(e) => {
                setDiscountInput(e.target.value);
                setDiscountMessage("");
              }}
            />
            <button
              onClick={handleDiscountButton}
              className="border border-gray-300 px-3 rounded-lg w-1/2 font-medium"
            >
              Pakai Code
            </button>
          </div>
          {discountMessage && (
            <p
              className={`text-xs ${
                discountValid ? "text-green-500" : "text-red-500"
              }`}
            >
              {discountMessage}
            </p>
          )}

          <hr className="mt-5" />

          <div className="flex justify-between mt-5">
            <p>Harga Tryout</p>
            <p>{formatIDR(tryout.price)}</p>
          </div>

          {discountValid && appliedDiscount && (
            <div className="flex justify-between text-green-500">
              <p>
                Diskon{" "}
                {appliedDiscount.type === "percentage"
                  ? `(${appliedDiscount.amount}%)`
                  : ""}
              </p>
              <p>
                -{formatIDR(calculateDiscount(tryout.price, appliedDiscount))}
              </p>
            </div>
          )}
          <hr className="mt-5" />

          <div className="flex justify-between mt-3 font-bold">
            <p>Total Harga</p>
            <p>{formatIDR(calculateTotalPrice())}</p>
          </div>
          <div className="mt-3">
            <button
              className="w-full bg-[#06C270] py-2 font-bold text-white rounded-xl"
              onClick={handleCheckOut}
            >
              {isLoading ? "Loading" : "Checkout Sekarang"}
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
