import { Link } from "react-router-dom";

export default function BimbelCard(props) {
  const { title, image, buttonText, price, url, whatsappLink } = props;
  return (
    <div className="w-full mx-auto mb-6">
      <div className="flex flex-col lg:flex-row lg:h-64 rounded-xl shadow-sm hover:shadow-md transition-shadow">
        {/* Image container */}
        <div className="w-full lg:w-2/3 h-48 md:h-full">
          <img
            src={image}
            alt={title}
            className="w-full h-full lg:object-fill rounded-t-xl md:rounded-l-xl md:rounded-tr-none"
          />
        </div>

        {/* Content container */}
        <div className="w-full lg:w-1/3 p-4 flex flex-col justify-between border-x border-b md:border-l-0 md:border-t md:border-r rounded-b-xl md:rounded-r-xl md:rounded-l-none">
          {/* Title */}
          <p className="text-lg md:text-xl lg:text-xl font-medium mb-4 md:mb-0">
            {title}
          </p>

          <div className="space-y-3">
            {/* Price section */}
            {price && (
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <p className="text-base md:text-lg text-gray-400 line-through">
                  Rp 120.000
                </p>
                {/* Discount badge */}
              </div>
            )}

            {/* Current price */}
            <p className="text-2xl md:text-3xl font-medium">{price}</p>

            {/* Button */}
            {url ? (
              <Link to={url} className="block">
                <button className="w-full bg-[#FFCB01] rounded-xl py-2 mt-2 font-medium text-lg md:text-xl hover:bg-[#e6b700] transition-colors">
                  {buttonText}
                </button>
              </Link>
            ) : (
              <button
                onClick={() => (window.location.href = whatsappLink)}
                className="w-full bg-[#FFCB01] rounded-xl py-2 mt-2 font-medium text-lg md:text-lg hover:bg-[#e6b700] transition-colors"
              >
                {buttonText}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
    // <div className="h-64 w-5/6 grid grid-cols-3">
    //   <div className="col-span-2 h-full">
    //     <img
    //       src={image}
    //       alt=""
    //       className="object-fill h-64 w-full border-s border-t border-b rounded-s-xl"
    //     />
    //   </div>
    //   <div className="border-t border-b border-r rounded-e-xl p-4 flex flex-col justify-between">
    //     <p className="text-3xl font-medium">{title}</p>
    //     <div>
    //       {price && (
    //         <div className="flex items-center gap-3">
    //           <p className="text-lg text-gray-400 line-through">Rp 120.000</p>
    //           <svg
    //             width="53"
    //             height="22"
    //             viewBox="0 0 53 22"
    //             fill="none"
    //             xmlns="http://www.w3.org/2000/svg"
    //           >
    //             <rect width="53" height="22" rx="5" fill="#FFE5E5" />
    //             <path
    //               d="M11.4034 10.2216V12.142H6.09659V10.2216H11.4034ZM17.6932 17.1591C16.8902 17.1591 16.1742 17.0114 15.5455 16.7159C14.9205 16.4205 14.4242 16.0133 14.0568 15.4943C13.6894 14.9754 13.4981 14.3807 13.483 13.7102H15.8693C15.8958 14.161 16.0852 14.5265 16.4375 14.8068C16.7898 15.0871 17.2083 15.2273 17.6932 15.2273C18.0795 15.2273 18.4205 15.142 18.7159 14.9716C19.0152 14.7973 19.2481 14.5568 19.4148 14.25C19.5852 13.9394 19.6705 13.5833 19.6705 13.1818C19.6705 12.7727 19.5833 12.4129 19.4091 12.1023C19.2386 11.7917 19.0019 11.5492 18.6989 11.375C18.3958 11.2008 18.0492 11.1117 17.6591 11.108C17.3182 11.108 16.9867 11.178 16.6648 11.3182C16.3466 11.4583 16.0985 11.6496 15.9205 11.892L13.733 11.5L14.2841 5.36364H21.3977V7.375H16.3125L16.0114 10.2898H16.0795C16.2841 10.0019 16.5928 9.76326 17.0057 9.57386C17.4186 9.38447 17.8807 9.28977 18.392 9.28977C19.0928 9.28977 19.7178 9.45455 20.267 9.78409C20.8163 10.1136 21.25 10.5663 21.5682 11.142C21.8864 11.714 22.0436 12.3731 22.0398 13.1193C22.0436 13.9034 21.8617 14.6004 21.4943 15.2102C21.1307 15.8163 20.6212 16.2936 19.9659 16.642C19.3144 16.9867 18.5568 17.1591 17.6932 17.1591ZM28.3182 17.2557C27.3409 17.2519 26.5 17.0114 25.7955 16.5341C25.0947 16.0568 24.5549 15.3655 24.1761 14.4602C23.8011 13.5549 23.6155 12.4659 23.6193 11.1932C23.6193 9.92424 23.8068 8.8428 24.1818 7.94886C24.5606 7.05492 25.1004 6.375 25.8011 5.90909C26.5057 5.43939 27.3447 5.20455 28.3182 5.20455C29.2917 5.20455 30.1288 5.43939 30.8295 5.90909C31.5341 6.37879 32.0758 7.06061 32.4545 7.95455C32.8333 8.8447 33.0208 9.92424 33.017 11.1932C33.017 12.4697 32.8277 13.5606 32.4489 14.4659C32.0739 15.3712 31.536 16.0625 30.8352 16.5398C30.1345 17.017 29.2955 17.2557 28.3182 17.2557ZM28.3182 15.2159C28.9848 15.2159 29.517 14.8807 29.9148 14.2102C30.3125 13.5398 30.5095 12.5341 30.5057 11.1932C30.5057 10.3106 30.4148 9.57576 30.233 8.98864C30.0549 8.40151 29.8011 7.96023 29.4716 7.66477C29.1458 7.36932 28.7614 7.22159 28.3182 7.22159C27.6553 7.22159 27.125 7.55303 26.7273 8.21591C26.3295 8.87879 26.1288 9.87121 26.125 11.1932C26.125 12.0871 26.214 12.8333 26.392 13.4318C26.5739 14.0265 26.8295 14.4735 27.1591 14.7727C27.4886 15.0682 27.875 15.2159 28.3182 15.2159ZM41.1406 14.8182V14.2045C41.1406 13.7386 41.2391 13.3106 41.4361 12.9205C41.6368 12.5265 41.9266 12.2121 42.3054 11.9773C42.688 11.7386 43.1539 11.6193 43.7031 11.6193C44.2599 11.6193 44.7277 11.7367 45.1065 11.9716C45.4891 12.2064 45.777 12.5208 45.9702 12.9148C46.1671 13.3049 46.2656 13.7348 46.2656 14.2045V14.8182C46.2656 15.2841 46.1671 15.714 45.9702 16.108C45.7732 16.4981 45.4834 16.8106 45.1009 17.0455C44.7183 17.2841 44.2524 17.4034 43.7031 17.4034C43.1463 17.4034 42.6785 17.2841 42.2997 17.0455C41.9209 16.8106 41.633 16.4981 41.4361 16.108C41.2391 15.714 41.1406 15.2841 41.1406 14.8182ZM42.794 14.2045V14.8182C42.794 15.0871 42.8584 15.3409 42.9872 15.5795C43.1198 15.8182 43.3584 15.9375 43.7031 15.9375C44.0478 15.9375 44.2827 15.8201 44.4077 15.5852C44.5365 15.3504 44.6009 15.0947 44.6009 14.8182V14.2045C44.6009 13.928 44.5402 13.6705 44.419 13.4318C44.2978 13.1932 44.0592 13.0739 43.7031 13.0739C43.3622 13.0739 43.1255 13.1932 42.9929 13.4318C42.8603 13.6705 42.794 13.928 42.794 14.2045ZM35.169 8.15909V7.54545C35.169 7.07576 35.2694 6.64583 35.4702 6.25568C35.6709 5.86174 35.9607 5.54735 36.3395 5.3125C36.7221 5.07765 37.1842 4.96023 37.7259 4.96023C38.2865 4.96023 38.7562 5.07765 39.1349 5.3125C39.5137 5.54735 39.8016 5.86174 39.9986 6.25568C40.1955 6.64583 40.294 7.07576 40.294 7.54545V8.15909C40.294 8.62879 40.1937 9.05871 39.9929 9.44886C39.7959 9.83901 39.5062 10.1515 39.1236 10.3864C38.7448 10.6174 38.2789 10.733 37.7259 10.733C37.1728 10.733 36.705 10.6155 36.3224 10.3807C35.9437 10.142 35.6558 9.82955 35.4588 9.44318C35.2656 9.05303 35.169 8.625 35.169 8.15909ZM36.8338 7.54545V8.15909C36.8338 8.43561 36.8982 8.69129 37.027 8.92614C37.1596 9.16098 37.3925 9.27841 37.7259 9.27841C38.0743 9.27841 38.3111 9.16098 38.4361 8.92614C38.5649 8.69129 38.6293 8.43561 38.6293 8.15909V7.54545C38.6293 7.26894 38.5687 7.01136 38.4474 6.77273C38.3262 6.53409 38.0857 6.41477 37.7259 6.41477C37.3887 6.41477 37.1558 6.53598 37.027 6.77841C36.8982 7.02083 36.8338 7.27651 36.8338 7.54545ZM35.919 17L43.919 5.36364H45.4077L37.4077 17H35.919Z"
    //               fill="#FF3B3B"
    //             />
    //           </svg>
    //         </div>
    //       )}

    //       <p className="text-3xl font-medium">{price}</p>
    //       {url ? (
    //         <Link to={url}>
    //           <button className="bg-[#FFCB01] w-full rounded-xl py-2 mt-4 font-medium text-xl">
    //             {buttonText}
    //           </button>
    //         </Link>
    //       ) : (
    //         <button
    //           onClick={() => window.location.href(`${whatsappLink}`)}
    //           className="bg-[#FFCB01] w-full rounded-xl py-2 mt-4 font-medium text-xl"
    //         >
    //           {buttonText}
    //         </button>
    //       )}
    //     </div>
    //   </div>
    // </div>
  );
}
