import {
  Button,
  Drawer,
  Modal,
  Pagination,
  Table,
  TextInput,
} from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useEffect, useState } from "react";
import { fetchAdmin } from "../../utils/fetchAdmin";
import { useAlert } from "../../stores/useAlert";
import AddTryoutModal from "./AddTryoutModal";

const CrudUser = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentpage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [users, setUsers] = useState([
    { id: "", name: "", email: "", saldo: "" },
  ]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [active, setActive] = useState("");
  const { setAlert } = useAlert();
  const [listTO, setListTO] = useState([]);
  const [newTOModal, setnewTOModal] = useState(false);
  const [tryoutOwner, setTryoutOwner] = useState([]);

  useEffect(() => {
    const getOwnership = async () => {
      const { data } = await fetchAdmin.get(`/addTryout/${active}`);
      setListTO(data.list);
    };
    getOwnership();
  }, [active]);

  const formatIDR = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };
  const handleSearch = async (e) => {
    const { value } = e.target;
    setSearchTerm(value);

    if (e.key === "Enter") {
      try {
        const response = await fetchAdmin.get(`/user/search/${value}`);
        console.log(response);

        const formattedUsers = response.data.map((user) => ({
          id: user.id,
          name: user.profile?.name || "No Name",
          email: user.email,
          phone: user.profile?.phone,
          saldo: user.balance?.amount || 0,
        }));

        setUsers(formattedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
  };

  const fetchData = async () => {
    const response = await fetchAdmin.get(`/user/${currentPage}`);
    const formattedUsers = response.data.users.map((user) => ({
      id: user.id,
      name: user.profile?.name || "No Name",
      email: user.email,
      phone: user.profile.phone,
      saldo: user.balance?.amount || 0,
    }));
    setUsers(formattedUsers);
    setTotalPage(response.data.totalPages);
    setLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchAdmin.get(`/user/${currentPage}`);
      const formattedUsers = response.data.users.map((user) => ({
        id: user.id,
        name: user.profile?.name || "No Name",
        email: user.email,
        phone: user.profile?.phone,
        saldo: user.balance?.amount || 0,
      }));
      setUsers(formattedUsers);
      setTotalPage(response.data.totalPages);
      setLoading(false);
    };
    fetchData();
  }, [currentPage]);

  const handleClose = () => setIsOpen(false);

  const handleRemoveOwnership = async (id) => {
    const getOwnership = async () => {
      const { data } = await fetchAdmin.get(`/addTryout/${active}`);
      setListTO(data.list);
    };
    try {
      const { data } = await fetchAdmin.delete(`/addTryout/${active}/${id}`);
      setAlert({ title: "Sukses!", message: data.message, color: "success" });
      getOwnership();
    } catch (error) {
      setAlert({
        title: "Gagal!",
        message: error.response.data.message,
        color: "failure",
      });
    }
  };
  const handleStatus = (status) => {
    const getOwnership = async () => {
      const { data } = await fetchAdmin.get(`/addTryout/${active}`);
      setListTO(data.list);
      setnewTOModal(false);
    };
    if (status === true) {
      getOwnership();
    }
  };

  const handleResetPassword = async () => {
    try {
      const { data } = await fetchAdmin.post("/resetpassword", {
        id: active,
      });

      setAlert({ title: "Success", message: data.message, color: "success" });
    } catch (error) {
      setAlert({
        title: "Error",
        message: error.response.data.message,
        color: "failure",
      });
    }
  };

  const getTryoutOwner = async () => {
    try {
      const response = await fetchAdmin.get(`tryoutowner/26`);
      console.log("Get tryout owner response" ,response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTryoutOwner();
  });

  return (
    <div className="py-4 ml-64 dark:bg-black min-h-screen">
      <AddTryoutModal
        isOpen={newTOModal}
        userId={active}
        setStatus={handleStatus}
      />
      <div className="mb-8 mx-4">
        <h1 className="text-2xl font-semibold">All Users</h1>
      </div>
      <div className="flex space-x-2 max-w-md mb-8 mx-4">
        <TextInput
          value={searchTerm}
          placeholder="Search for user"
          id="search"
          onChange={handleSearch}
          onKeyDown={handleSearch}
          type="text"
          sizing="md"
        />
        <Button onClick={fetchData} color={"success"}>
          Clear
        </Button>
      </div>
      <div className="overflow-x-auto">
        {loading ? (
          <h1 className="m-4">Loading...</h1>
        ) : (
          <Table striped>
            <Table.Head>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Phone</Table.HeadCell>
              <Table.HeadCell>Id</Table.HeadCell>
              <Table.HeadCell>Saldo</Table.HeadCell>
              <Table.HeadCell>Action</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {users.map((user) => (
                <Table.Row
                  key={user.id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {user.name}
                  </Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>{user.phone}</Table.Cell>
                  <Table.Cell>{user.id}</Table.Cell>
                  <Table.Cell>{formatIDR(user.saldo)}</Table.Cell>
                  <Table.Cell>
                    <ul className="flex space-x-2">
                      <li>
                        <Button
                          onClick={() => {
                            setIsOpen(true);
                            setActive(user.id);
                          }}
                          color={"blue"}
                          size={"xs"}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                            />
                          </svg>
                        </Button>
                      </li>
                      <li>
                        <Button
                          onClick={() => setOpenModal(true)}
                          color={"failure"}
                          size={"xs"}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-6"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </Button>
                      </li>
                    </ul>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        )}
      </div>
      <div className="flex overflow-x-auto sm:justify-center mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPage}
          onPageChange={(page) => setCurrentpage(page)}
          showIcons
        />
      </div>
      <Drawer open={isOpen} onClose={handleClose} position="right">
        <Drawer.Header title="User  Edit" />
        <Drawer.Items>
          <Button onClick={handleResetPassword} color={"success"}>
            Reset Password
          </Button>
          <div className="my-8 space-y-4 p-4 rounded-md border">
            <Button
              onClick={() => setnewTOModal(true)}
              size={"sm"}
              color={"success"}
            >
              Add Tryout to User
            </Button>
            <div className="overflow-x-auto">
              <Table>
                <Table.Head>
                  <Table.HeadCell>Tryout</Table.HeadCell>
                  <Table.HeadCell>Action</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {listTO.map((item, index) => (
                    <Table.Row
                      key={index}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {item.title}
                      </Table.Cell>

                      <Table.Cell>
                        <button
                          onClick={() => handleRemoveOwnership(item.id)}
                          className="font-medium text-red-500 hover:underline dark:text-cyan-500"
                        >
                          Delete
                        </button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          </div>
        </Drawer.Items>
      </Drawer>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this user?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => setOpenModal(false)}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CrudUser;
