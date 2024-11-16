import { Link } from "react-router-dom";

export default function BimbelCard(props) {
  const { title, image, buttonText, price, url } = props;
  return (
    <div>
      <div className="border rounded-xl max-h-52 xl:w-5/6">
        <div className="grid grid-cols-4">
          <div className="col-span-3 h-52">
            <img
              src={image}
              alt=""
              className="object-fill w-full h-full rounded-s-xl"
            />
          </div>
          <div className="flex flex-col justify-around px-2 xl:pb-5">
            <div>
              <p className="font-bold xl:text-xl">{title}</p>
            </div>
            <div className="mt-14">
              <p className="text-xs xl:text-base">1-5 November 2024</p>
              <p className="text-xs xl:text-base font-bold">SKB</p>
              {price && (
                <p className="text-xs md:text-lg xl:text-xl font-bold">
                  {price}
                </p>
              )}
              <Link to={url}>
                <button className="bg-[#FFCB01] mt-1 text-xs rounded-lg xl:py-2 xl:px-10 font-bold w-full">
                  {buttonText}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
