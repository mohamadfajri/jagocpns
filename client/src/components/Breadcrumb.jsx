import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();

  // Custom mapping untuk label yang lebih readable
  const routeLabels = {
    dashboard: " ",
    mytryouts: "Tryout Saya",
    mybimbel: "Bimbel Saya",
    tryoutstore: "Beli Tryout",
    bimbelstore: "Beli Bimbel",
    ranks: "Ranking",
    topup: "Top Up",
    information: "Informasi",
    profile: "Profil",
    admin: "Admin",
    questioner: "Pembuat Soal",
    crud: "Manajemen",
    user: "Pengguna",
    tryout: "Try Out",
    score: "Nilai",
    checkout: "Pembayaran",
    tryoutinformation: "Informasi Try Out",
    rankingpage: "Daftar Ranking",
  };

  // Fungsi untuk mendapatkan label dari path
  const getLabel = (path) => {
    return routeLabels[path] || path;
  };

  // Fungsi untuk mengecek apakah path adalah ID
  const isId = (path) => {
    return /^\d+$/.test(path);
  };

  // Memecah path dan filter string kosong
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Remove 'app' from pathnames if it exists
  const startIndex = pathnames[0] === "app" ? 1 : 0;
  const filteredPaths = pathnames.slice(startIndex);

  // Membuat array of breadcrumb items
  const breadcrumbPaths = filteredPaths
    .map((value, index) => {
      const pathSlice =
        pathnames[0] === "app"
          ? pathnames.slice(0, index + 2) // +2 karena kita mulai dari setelah 'app'
          : pathnames.slice(0, index + 1);

      const to = `/${pathSlice.join("/")}`;

      // Skip ID dari breadcrumb
      if (isId(value)) {
        return null;
      }

      return {
        to,
        label: getLabel(value),
      };
    })
    .filter(Boolean); // Menghapus nilai null

  // Jika di halaman utama atau bukan di dalam /app, tidak perlu menampilkan breadcrumb
  if (location.pathname === "/" || !location.pathname.startsWith("/app")) {
    return null;
  }

  return (
    <nav className="flex items-center">
      <Link
        to="/app/dashboard"
        className="flex items-center text-gray-500 hover:text-blue-600 transition-colors"
      >
        <span className="ml-1 text-lg">Home</span>
      </Link>

      {breadcrumbPaths.map((path, index) => (
        <React.Fragment key={path.to}>
          <span className="text-sm text-gray-500">
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m10 16 4-4-4-4"
              />
            </svg>
          </span>
          {index === breadcrumbPaths.length - 1 ? (
            <span className="text-lg font-medium text-gray-800">
              {path.label}
            </span>
          ) : (
            <Link
              to={path.to}
              className="text-lg text-gray-500 hover:text-blue-600 transition-colors"
            >
              {path.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
