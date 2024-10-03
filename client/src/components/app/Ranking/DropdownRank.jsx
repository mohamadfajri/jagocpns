import { Select } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useRank } from '../../../stores/useRank';
import { fetcher } from '../../../utils/fetcher';

const DropdownRank = () => {
  const [active, setActive] = useState('');
  const { setActive: setId, active: id } = useRank();
  const [dropdowns, setDropdowns] = useState([]);

  useEffect(() => {
    const getList = async () => {
      try {
        const response = await fetcher.get('/user/getTryoutList');
        const list = response.data.data
          .sort((a, b) => {
            const aTitle = a.title.toLowerCase();
            const bTitle = b.title.toLowerCase();

            if (aTitle.includes('gratis') && !bTitle.includes('gratis')) {
              return -1;
            }
            if (!aTitle.includes('gratis') && bTitle.includes('gratis')) {
              return 1;
            }

            if (aTitle.includes('premium') && !bTitle.includes('premium')) {
              return -1;
            }
            if (!aTitle.includes('premium') && bTitle.includes('premium')) {
              return 1;
            }

            if (aTitle.includes('bimbel') && !bTitle.includes('bimbel')) {
              return 1;
            }
            if (!aTitle.includes('bimbel') && bTitle.includes('bimbel')) {
              return -1;
            }

            return 0;
          })
          .map((item) => ({
            id: item.id.toString(),
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
    setActive(selectedId);
    const selectedItem = dropdowns.find((item) => item.id === selectedId);
    if (selectedItem) {
      setId(selectedItem.id);
      setActive(selectedItem.id);
    }
  };

  useEffect(() => {
    if (id !== null) {
      setActive(id);
    }
  }, [id]);

  return (
    <div>
      <Select color={'blue'} value={active} onChange={handleSelectChange}>
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
