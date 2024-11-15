import { useEffect, useState } from "react";
import { TryOutCardNew } from "../components/app/MyTryout/TryOutCardNew.jsx";
import { fetcher } from "../utils/fetcher.js";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal } from "flowbite-react";
import { useAlert } from "../stores/useAlert.js";
import Swal from "sweetalert2";

export default function CheckOutPageBimbel() {
  const location = useLocation();
  const pathParts = location.pathname.split("/");
  const id = pathParts[pathParts.length - 1];
  const [tryout, setTryout] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [user, setUser] = useState([{}]);
  const navigate = useNavigate();

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
    try {
      const response = await fetcher.post("/user/checkout", {
        target: user,
        tryoutListId: id,
      });
      if (response.status === 200) {
        swalFireConfirmmed();
      }
      setOpenModal(false);
    } catch (error) {
      if (error.response.status === 400) {
        swalFireDenied(error.response.data.message);
      }
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
    <div className='sm:p-10 sm:ml-64 dark:bg-black min-h-screen sm:mt-0"'>
      CheckOut Bimbel
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
          <p className="mt-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos cum
            iste facere minima pariatur impedit officiis ab ipsa quisquam
            beatae? Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Quibusdam labore optio tenetur a praesentium repellat
            exercitationem, animi nisi quaerat quas?
          </p>
        </div>
        <div className="flex justify-center">
          <TryOutCardNew
            title={tryout.title}
            desc={tryout.description}
            action={"Beli"}
            imageUrl={tryout.imageUrl}
            price={tryout.price}
            onClick={() => setOpenModal(true)}
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
          <div className="space-y-4">
            {/* <div className="flex border rounded-xl">
              <div className="w-3/4">
                <img
                  src={tryout.imageUrl}
                  alt=""
                  className="object-fill h-48 w-full rounded-s-xl"
                />
              </div>
              <div className="flex flex-col justify-between p-4">
                <div>
                  <p className="font-bold text-xl">{tryout.title}</p>
                </div>
                <div>
                  <p className="text-xl font-bold">{formatIDR(tryout.price)}</p>
                </div>
              </div>
            </div> */}

            <div className="">
              <div className="flex justify-center mb-5">
                <TryOutCardNew
                  title={tryout.title}
                  desc={tryout.description}
                  // action={"Beli"}
                  imageUrl={tryout.imageUrl}
                  price={tryout.price}
                  // onClick={() => setOpenModal(true)}
                />
              </div>

              <div className="flex justify-between">
                <div>
                  <p className="font-bold">Nama Bimbel</p>
                  <p className="font-bold">Qty</p>
                  <p className="font-bold">Total Harga</p>
                </div>
                <div>
                  <p>{tryout.title}</p>
                  <p>1</p>
                  <p>{formatIDR(tryout.price)}</p>
                </div>
              </div>
            </div>

            <div>
              <button
                onClick={() => handleCheckOut()}
                className="w-full bg-[#06C270] text-white font-medium py-2 rounded-xl"
              >
                Checkout
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
