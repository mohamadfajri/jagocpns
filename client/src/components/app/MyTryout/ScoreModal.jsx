import { Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TableScore from "./TableScore";
import { fetcher } from "../../../utils/fetcher";
import { useAlert } from "../../../stores/useAlert";
import LoadingTable from "../../LoadingTable";

const ScoreModal = () => {
  const [openModal, setOpenModal] = useState(true);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { setAlert } = useAlert();

  const jawabanBenar = data.total / 5;
  const jawabanSalah = 100 - jawabanBenar;

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const { data } = await fetcher.get(`/user/myscore/${id}`);
        setData(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setAlert({
          title: "Error!",
          message: error.response.data.message,
          color: "failure",
        });
      }
    };
    getData();
  }, [id, setAlert]);

  const navigate = useNavigate();
  const handleBack = () => {
    setOpenModal(false);
    navigate("/app/mytryouts");
  };

  return (
    <>
      <Modal dismissible show={openModal} onClose={handleBack} size={"md"}>
        <Modal.Header>
          <div>
            <p>{data.tryoutListName}</p>
            <div className="flex gap-1 items-center mt-2">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-white"
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
                  d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>

              <p className="text-gray-500 text-sm">90 Menit</p>

              <span className="text-sm text-gray-500">•</span>
              <span className="text-sm text-gray-500">100 Soal</span>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="col-span-2 bg-blue-500 rounded-xl p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div>
                <p className="text-sm opacity-90">Total Nilai</p>
                <p className="text-3xl font-bold">{data.total}</p>
              </div>
            </div>
            <div className="h-12 w-12 bg-blue-400 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-2 mt-3">
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white">
              <div className="flex items-center gap-2 mb-2">
                <svg
                  className="w-6 h-6 text-white dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2c-.791 0-1.55.314-2.11.874l-.893.893a.985.985 0 0 1-.696.288H7.04A2.984 2.984 0 0 0 4.055 7.04v1.262a.986.986 0 0 1-.288.696l-.893.893a2.984 2.984 0 0 0 0 4.22l.893.893a.985.985 0 0 1 .288.696v1.262a2.984 2.984 0 0 0 2.984 2.984h1.262c.261 0 .512.104.696.288l.893.893a2.984 2.984 0 0 0 4.22 0l.893-.893a.985.985 0 0 1 .696-.288h1.262a2.984 2.984 0 0 0 2.984-2.984V15.7c0-.261.104-.512.288-.696l.893-.893a2.984 2.984 0 0 0 0-4.22l-.893-.893a.985.985 0 0 1-.288-.696V7.04a2.984 2.984 0 0 0-2.984-2.984h-1.262a.985.985 0 0 1-.696-.288l-.893-.893A2.984 2.984 0 0 0 12 2Zm3.683 7.73a1 1 0 1 0-1.414-1.413l-4.253 4.253-1.277-1.277a1 1 0 0 0-1.415 1.414l1.985 1.984a1 1 0 0 0 1.414 0l4.96-4.96Z"
                    clipRule="evenodd"
                  />
                </svg>

                <p className="text-sm opacity-90">Jawaban Benar</p>
              </div>
              <div className="flex items-baseline gap-1">
                <p className="text-2xl font-bold">{jawabanBenar}</p>
                <p className="text-sm opacity-90">soal</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-4 text-white">
              <div className="flex items-center gap-2 mb-2">
                <svg
                  className="w-6 h-6 text-white dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z"
                    clipRule="evenodd"
                  />
                </svg>

                <p className="text-sm opacity-90">Jawaban Salah</p>
              </div>
              <div className="flex items-baseline gap-1">
                <p className="text-2xl font-bold">{jawabanSalah}</p>
                <p className="text-sm opacity-90">soal</p>
              </div>
            </div>
          </div>

          {/* <div className="bg-blue-50 p-6 rounded-lg">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-blue-600">75</h3>
              <p className="text-sm text-gray-600 mt-1">Nilai Total</p>
            </div>
          </div> */}
          {/* <div className="mb-6">
            <h1 className="font-semibold">Syarat Kelulusan</h1>
            <ul>
              <li>TWK : 65</li>
              <li>TIU : 80</li>
              <li>TKP : 166</li>
            </ul>
          </div>
          <div className="mb-4">
            <div className="flex space-x-2">
              <h1 className="font-semibold">Judul :</h1>
              <p className="font-normal">{data.tryoutListName}</p>
            </div>
          </div>
          {loading ? <LoadingTable /> : <TableScore data={data} />} */}
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={() => {
              navigate(`/review/${id}`);
              setLoading(true);
            }}
            disabled={loading}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Lihat pembahasan
          </button>
          <button
            onClick={handleBack}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          >
            Kembali
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ScoreModal;
