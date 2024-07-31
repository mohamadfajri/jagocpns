import { Tabs } from 'flowbite-react';
import { HiCreditCard, HiDocumentText } from 'react-icons/hi2';
import HistoryTopup from '../../../pages/HistoryTopup';
import TopUpMenu from '../../../pages/TopUpMenu';

const TopupTab = () => {
  return (
    <div className='sm:p-10 sm:ml-64 dark:bg-black min-h-screen sm:mt-0 pb-16 mt-2 mx-4 sm:mx-0'>
      <Tabs aria-label='Tabs with icons' style='default'>
        <Tabs.Item as='button' active title='Topup' icon={HiCreditCard}>
          <TopUpMenu />
        </Tabs.Item>
        <Tabs.Item as='button' title='History' icon={HiDocumentText}>
          <HistoryTopup />
        </Tabs.Item>
      </Tabs>
    </div>
  );
};

export default TopupTab;
