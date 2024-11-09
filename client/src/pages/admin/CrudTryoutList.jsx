import {
  Button,
  Drawer,
  FileInput,
  Label,
  Modal,
  Pagination,
  Select,
  Table,
  Textarea,
  TextInput,
} from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAdmin } from "../../utils/fetchAdmin";

const CrudTryoutList = () => {
  const [form, setForm] = useState({
    id: "",
    title: "",
    price: "",
    description: "",
    status: false,
    statusKerjakan: false,
    image: null,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState([{}]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPage] = useState(1);
  const [id, setId] = useState();
  const [purchaseCounts, setPurchaseCounts] = useState({});

  const navigate = useNavigate();

  const fetchData = async (p) => {
    const page = p ? p : 1;
    const response = await fetchAdmin(`/tryout?page=${page}`);
    setData(response.data.data);
    setTotalPage(response.data.meta.totalPages);
  };

  const fetchPurchaseCount = async (id) => {
    try {
      const response = await fetchAdmin(`/tryoutownership/${id}`);
      setPurchaseCounts((prev) => ({
        ...prev,
        [id]: response.data.ownershipCount,
      }));
    } catch (error) {
      console.error(`Failed to fetch purchase count for id ${id}:`, error);
    }
  };

  const fetchSingle = async (id) => {
    const response = await fetchAdmin(`tryout/${id}`);
    setForm({
      id: response.data.id,
      title: response.data.title,
      price: parseInt(response.data.price),
      description: response.data.description,
      status: response.data.status,
      statusKerjakan: response.data.statusKerjakan,
      image: null,
    });
  };

  const handleOpen = () => {
    setForm({
      title: "",
      price: "",
      description: "",
      status: false,
      statusKerjakan: false,
      image: null,
    });
    setIsOpen(true);
  };

  const updateData = async (e) => {
    e.preventDefault();

    try {
      await fetchAdmin.patch(
        `/tryout/${form.id}`,
        {
          title: form.title,
          price: form.price,
          description: form.description,
          image: form.image,
          status: form.status,
          statusKerjakan: form.statusKerjakan,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(form);
      await fetchData();
      setIsOpenEdit(false);
    } catch (error) {
      console.error("Error updating data:", error);
      // Optionally, you can add further error handling here, such as showing an error message to the user
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  useEffect(() => {
    data.forEach((item) => {
      fetchPurchaseCount(item.id);
    });
  }, [data]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    console.log(file);

    setForm((prevForm) => ({
      ...prevForm,
      image: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetchAdmin.post(
        "/tryout",
        {
          title: form.title,
          price: form.price,
          description: form.description,
          image: form.image,
          status: form.status,
          statusKerjakan: form.statusKerjakan,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Form submitted successfully:", response.data);
      setForm({
        title: "",
        price: "",
        description: "",
        status: false,
        statusKerjakan: false,
        image: null,
      });
      await fetchData();
      setIsOpen(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  const deleteData = async (id) => {
    await fetchAdmin.delete(`/tryout/${id}`);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsOpenEdit(false);
  };

  return (
    <div className="py-4 ml-64 dark:bg-black min-h-screen">
      <div className="mb-8 mx-4">
        <h1 className="text-2xl font-semibold">Tryout List</h1>
      </div>
      <div className="flex mx-4 pb-8">
        <div className="max-w-md">
          <TextInput
            placeholder="Search for user"
            id="base"
            type="text"
            sizing="md"
          />
        </div>
        <div className="max-w-md ml-8">
          <Button onClick={handleOpen} color={"blue"} size={"sm"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-5 mr-1"
            >
              <path
                fillRule="evenodd"
                d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                clipRule="evenodd"
              />
            </svg>
            New Tryout
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table striped>
          <Table.Head>
            <Table.HeadCell>Title</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>
            <Table.HeadCell>Desc</Table.HeadCell>
            <Table.HeadCell>Pembelian</Table.HeadCell>
            <Table.HeadCell>Beli</Table.HeadCell>
            <Table.HeadCell>Kerjakan</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {data.map((item, index) => (
              <Table.Row
                key={index}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {item.title}
                </Table.Cell>
                <Table.Cell>{item.price}</Table.Cell>
                <Table.Cell>{item.description}</Table.Cell>
                <Table.Cell>
                  {purchaseCounts[item.id] !== undefined
                    ? purchaseCounts[item.id]
                    : "Loading..."}
                </Table.Cell>
                {item.status === true ? (
                  <Table.Cell className="text-green-500">Online</Table.Cell>
                ) : (
                  <Table.Cell className="text-red-500">Not Online</Table.Cell>
                )}
                {item.statusKerjakan === true ? (
                  <Table.Cell className="text-green-500">Online</Table.Cell>
                ) : (
                  <Table.Cell className="text-red-500">Not Online</Table.Cell>
                )}
                <Table.Cell>
                  <ul className="flex space-x-2">
                    <li>
                      <Button
                        onClick={() => navigate(`${item.id}`)}
                        color={"success"}
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
                            d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                          />
                        </svg>
                      </Button>
                    </li>
                    <li>
                      <Button
                        onClick={async () => {
                          setIsOpenEdit(true);
                          await fetchSingle(item.id);
                          console.log(form.status);
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
                        onClick={() => {
                          setOpenModal(true);
                          setId(item.id);
                        }}
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
      </div>
      <div className="flex overflow-x-auto sm:justify-center mt-2">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(p) => {
            setPage(p);
          }}
          showIcons
        />
      </div>

      {/* create tryout */}
      <Drawer open={isOpen} onClose={handleClose} position="right">
        <Drawer.Header title="Create Tryout" />
        <Drawer.Items>
          <form onSubmit={handleSubmit}>
            <div className="flex max-w-md flex-col gap-4">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="title" value="Judul" />
                </div>
                <TextInput
                  id="title"
                  type="text"
                  sizing="sm"
                  value={form.title}
                  onChange={handleChange}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="price" value="Harga" />
                </div>
                <TextInput
                  id="price"
                  type="text"
                  sizing="sm"
                  value={form.price}
                  onChange={handleChange}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="description" value="Deskripsi" />
                </div>
                <Textarea
                  id="description"
                  required
                  rows={4}
                  value={form.description}
                  onChange={handleChange}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="image" value="Gambar" />
                </div>
                <FileInput
                  size={"sm"}
                  type="file"
                  id="image"
                  onChange={handleFile}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Button type="submit" color={"success"}>
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Drawer.Items>
      </Drawer>

      {/* edit tryout */}
      <Drawer open={isOpenEdit} onClose={handleClose} position="right">
        <Drawer.Header title="Edit Tryout" />
        <Drawer.Items>
          <form onSubmit={updateData}>
            <div className="flex max-w-md flex-col gap-4">
              <h1>Status Beli</h1>
              <Select
                onChange={handleChange}
                value={form.status}
                id="status"
                required
              >
                <option value="true">Online</option>
                <option value="false">Not Online</option>
              </Select>
              <h1>Status Kerjakan</h1>
              <Select
                onChange={handleChange}
                value={form.statusKerjakan}
                id="statusKerjakan"
                required
              >
                <option value="true">Online</option>
                <option value="false">Not Online</option>
              </Select>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="title" value="Judul" />
                </div>
                <TextInput
                  id="title"
                  type="text"
                  sizing="sm"
                  value={form.title}
                  onChange={handleChange}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="price" value="Harga" />
                </div>
                <TextInput
                  id="price"
                  type="text"
                  sizing="sm"
                  value={form.price}
                  onChange={handleChange}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="description" value="Deskripsi" />
                </div>
                <Textarea
                  id="description"
                  required
                  rows={4}
                  value={form.description}
                  onChange={handleChange}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="image" value="Gambar" />
                </div>
                <FileInput
                  size={"sm"}
                  type="file"
                  id="image"
                  onChange={handleFile}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Button type="submit" color={"success"}>
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </form>
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
              Are you sure you want to delete this item?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color={"failure"}
                onClick={async () => {
                  setOpenModal(false);
                  await deleteData(id);
                  await fetchData();
                }}
              >
                Yes, Im sure
              </Button>
              <Button color={"gray"} onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CrudTryoutList;
