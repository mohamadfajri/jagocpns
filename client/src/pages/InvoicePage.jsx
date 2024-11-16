import { useEffect } from "react";
import InvoiceMenu from "./InvoiceMenu";
import InvoiceTopup from "./InvoiceTopup";
import { fetcher } from "../utils/fetcher";
import { useTopup } from "../stores/useTopup";

const InvoicePage = () => {
  const { setData } = useTopup();
  useEffect(() => {
    const getTransaction = async () => {
      const { data: response } = await fetcher("/user/transaction/data");
      setData(response);
    };
    getTransaction();
  }, [setData]);
  return (
    <div className="p-0 rounded-lg flex flex-col sm:grid grid-cols-3 justify-center sm:space-x-5 space-y-6 sm:space-y-0">
      <div className="col-span-2">
        <InvoiceTopup />
      </div>
      <div>
        <InvoiceMenu />
      </div>
    </div>
  );
};

export default InvoicePage;
