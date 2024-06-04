import { Dropdown } from 'flowbite-react';
import { useState } from 'react';
import { useRank } from '../../../stores/useRank';
const dropdowns = [
  { id: 1, title: 'Tryout 1' },
  { id: 2, title: 'Tryout 2' },
  { id: 3, title: 'Tryout 3' },
  { id: 4, title: 'Tryout 4' },
];
const DropdownRank = () => {
  const [active, setActive] = useState();
  const { set } = useRank();
  return (
    <Dropdown
      color={'blue'}
      label={!active ? 'Pilih Tryout' : active}
      dismissOnClick={true}
    >
      {dropdowns.map((item) => (
        <Dropdown.Item
          as='button'
          key={item.id}
          onClick={() => {
            setActive(item.title);
            set(item.id);
          }}
        >
          {item.title}
        </Dropdown.Item>
      ))}
    </Dropdown>
  );
};

export default DropdownRank;
