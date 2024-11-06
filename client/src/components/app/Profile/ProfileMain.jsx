import { Button, Label, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { province } from "../../../libs/province";
import { fetcher } from "../../../utils/fetcher";
import { useAlert } from "../../../stores/useAlert";
import { instance } from "../../../libs/instance";

const ProfileMain = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    province: "",
    phone: "",
    gender: "",
    instance: "",
  });
  const [isChange, setIsChange] = useState(false);
  const { setAlert } = useAlert();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetcher("/user");
      setUserData(response.data);
    };
    fetchData();
  }, []);

  const updateProfil = async () => {
    try {
      const { data } = await fetcher.patch("/user/updateprofile", {
        name: userData.name,
        email: userData.email,
        province: userData.province,
        phone: userData.phone,
        gender: userData.gender,
        instance: userData.instance,
      });

      setAlert({
        title: "Berhasil!",
        message: data.message,
        color: "success",
      });
    } catch (error) {
      setAlert({
        title: "Gagal",
        message: error.response.data.message,
        color: "failure",
      });
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserData({ ...userData, [id]: value });
    setIsChange(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfil();
  };

  return (
    <form className="flex space-x-4 max-w-screen-xl" onSubmit={handleSubmit}>
      <div className="flex w-full flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value="Name" />
          </div>
          <TextInput
            id="name"
            value={userData.name}
            type="text"
            placeholder="Nama"
            shadow
            onChange={handleChange}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Email" />
          </div>
          <TextInput
            value={userData.email}
            id="email"
            type="email"
            placeholder="asepbensin@gmail.com"
            disabled
            shadow
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="province" value="Provinsi" />
          </div>
          <Select
            id="province"
            required
            value={userData.province}
            onChange={handleChange}
          >
            {province.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          </Select>
        </div>

        <Button
          className="w-fit"
          disabled={!isChange}
          color={"success"}
          type="submit"
        >
          Simpan
        </Button>
      </div>
      <div className="flex w-full flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="phone" value="Phone" />
          </div>
          <TextInput
            id="phone"
            value={userData.phone}
            type="tel"
            placeholder="Phone"
            shadow
            onChange={handleChange}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="gender" value="Jenis Kelamin" />
          </div>
          <Select
            id="gender"
            name="gender"
            required
            value={userData.gender}
            onChange={handleChange}
          >
            <option value="male">Laki Laki</option>
            <option value="female">Perempuan</option>
          </Select>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="instance" value="Instansi" />
          </div>
          <Select
            id="instance"
            name="instance"
            required
            value={userData.instance}
            onChange={handleChange}
          >
            {instance.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          </Select>
        </div>
      </div>
    </form>
  );
};

export default ProfileMain;
