export const SaldoCard = (props) => {
  const { saldo } = props;
  return (
    <>
      <div>
        <div className="bg-[#6B46D5] w-full rounded-xl p-4">
          <div className="flex items-center gap-3">
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.8333 7.29167V5.20833C20.8333 4.05937 19.899 3.125 18.75 3.125H5.20833C3.48541 3.125 2.08333 4.52708 2.08333 6.25V18.75C2.08333 21.0427 3.95208 21.875 5.20833 21.875H20.8333C21.9823 21.875 22.9167 20.9406 22.9167 19.7917V9.375C22.9167 8.22604 21.9823 7.29167 20.8333 7.29167ZM18.75 16.6667H16.6667V12.5H18.75V16.6667ZM5.20833 7.29167C4.94012 7.27967 4.68688 7.16468 4.50132 6.97064C4.31577 6.77661 4.21222 6.51848 4.21222 6.25C4.21222 5.98152 4.31577 5.72339 4.50132 5.52936C4.68688 5.33532 4.94012 5.22033 5.20833 5.20833H18.75V7.29167H5.20833Z"
                fill="white"
              />
            </svg>

            <p className="text-white font-medium text-2xl">Saldo Saya</p>
          </div>
          <div className="flex justify-end mt-20">
            <p className="text-white font-medium text-2xl">{saldo}</p>
          </div>
        </div>
      </div>
    </>
  );
};
