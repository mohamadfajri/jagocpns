import InvoiceMenu from './InvoiceMenu';
import InvoiceTopup from './InvoiceTopup';

const InvoicePage = () => {
  return (
    <div className='p-4 border rounded-lg flex justify-center space-x-8'>
      <InvoiceTopup />
      <InvoiceMenu />
    </div>
  );
};

export default InvoicePage;
