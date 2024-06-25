import { Select } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useRank } from '../../../stores/useRank';
import { fetcher } from '../../../utils/fetcher';

const DropdownRank = () => {
  const [active, setActive] = useState();
  const { setActive: setId } = useRank();
  const [dropdowns, setDropdowns] = useState([]);

  useEffect(() => {
    const getList = async () => {
      try {
        const response = await fetcher.get('/user/getTryoutList');
        const list = response.data.data.map((item) => ({
          id: item.id,
          title: item.title,
        }));
        setDropdowns(list);
      } catch (error) {
        console.error('Error fetching tryout list:', error);
      }
    };

    getList();
  }, []);

  const handleSelectChange = (event) => {
    const selectedId = event.target.value;
    const selectedItem = dropdowns.find(
      (item) => item.id === parseInt(selectedId)
    );
    if (selectedItem) {
      setActive(selectedItem.title);
      setId(selectedItem.id);
    }
  };

  return (
    <div>
      <Select
        color={'blue'}
        value={!active ? '' : active}
        onChange={handleSelectChange}
      >
        <option value='' disabled>
          Pilih Tryout
        </option>
        {dropdowns.map((item) => (
          <option key={item.id} value={item.id}>
            {item.title}
          </option>
        ))}
      </Select>
    </div>
  );
};

export default DropdownRank;
