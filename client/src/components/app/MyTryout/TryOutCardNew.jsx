import { Link } from "react-router-dom";

export const TryOutCardNew = ({
  title,
  desc,
  action,
  url,
  imageUrl,
  price,
}) => {
  const formatIDR = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };
  return (
    <div className="border w-72 rounded-xl">
      <div className="aspect-video">
        <img src={imageUrl} alt="" className="rounded-t-xl" />
      </div>
      <div className="p-4">
        <p className="font-bold text-lg">{title}</p>
        <div className="flex items-center justify-between mt-3">
          <div className="flex gap-2 items-center">
            <svg
              width="16"
              height="20"
              viewBox="0 0 16 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 0.25C2.27065 0.25 1.57118 0.539731 1.05546 1.05546C0.539731 1.57118 0.25 2.27065 0.25 3V17C0.25 17.7293 0.539731 18.4288 1.05546 18.9445C1.57118 19.4603 2.27065 19.75 3 19.75H13C13.7293 19.75 14.4288 19.4603 14.9445 18.9445C15.4603 18.4288 15.75 17.7293 15.75 17V5.968C15.75 5.587 15.626 5.217 15.396 4.913L12.398 0.945C12.2349 0.729116 12.0239 0.553999 11.7817 0.433408C11.5395 0.312817 11.2726 0.250036 11.002 0.25H3ZM1.75 3C1.75 2.31 2.31 1.75 3 1.75H10.25V6.147C10.25 6.561 10.586 6.897 11 6.897H14.25V17C14.25 17.69 13.69 18.25 13 18.25H3C2.31 18.25 1.75 17.69 1.75 17V3Z"
                fill="#1C1C28"
              />
            </svg>
            <p>100 soal</p>
          </div>
          <div className="flex gap-2 items-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 12C3 13.1819 3.23279 14.3522 3.68508 15.4442C4.13738 16.5361 4.80031 17.5282 5.63604 18.364C6.47177 19.1997 7.46392 19.8626 8.55585 20.3149C9.64778 20.7672 10.8181 21 12 21C13.1819 21 14.3522 20.7672 15.4442 20.3149C16.5361 19.8626 17.5282 19.1997 18.364 18.364C19.1997 17.5282 19.8626 16.5361 20.3149 15.4442C20.7672 14.3522 21 13.1819 21 12C21 9.61305 20.0518 7.32387 18.364 5.63604C16.6761 3.94821 14.3869 3 12 3C9.61305 3 7.32387 3.94821 5.63604 5.63604C3.94821 7.32387 3 9.61305 3 12Z"
                stroke="#1C1C28"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 7V12L15 15"
                stroke="#1C1C28"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <p>100 Menit</p>
          </div>
        </div>
        <div className="mt-5">
          <Link to={url}>
            <button className="btn bg-[#FFCB01] py-2 w-full font-medium rounded-lg">
              {action}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
