import { Tabs } from 'flowbite-react';
import { HiCreditCard, HiDocumentText } from 'react-icons/hi2';
import { Outlet } from 'react-router-dom';
import { useTopup } from '../../../stores/useTopup';

const TopupTab = () => {
  const { set, active } = useTopup();
  return (
    <div className='sm:p-10 sm:ml-64 dark:bg-black min-h-screen'>
      <Tabs aria-label='Tabs with icons' style='default'>
        <Tabs.Item
          onClick={() => set('topup')}
          active
          title='Topup'
          icon={HiCreditCard}
        >
          {active === 'topup' && <Outlet />}
        </Tabs.Item>
        <Tabs.Item
          onClick={() => set('history')}
          title='History'
          icon={HiDocumentText}
        >
          {active === 'history' && <Outlet />}
        </Tabs.Item>
      </Tabs>
    </div>
  );
};

export default TopupTab;
