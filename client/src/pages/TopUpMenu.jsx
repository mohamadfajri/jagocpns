import { useTopup } from '../stores/useTopup';
import InvoicePage from './InvoicePage';
import TopUpPage from './TopUpPage';

const TopUpMenu = () => {
  const { isCheckout } = useTopup();
  return <>{isCheckout ? <InvoicePage /> : <TopUpPage />}</>;
};

export default TopUpMenu;
