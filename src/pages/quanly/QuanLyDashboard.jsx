import { useState } from "react";
import { Link } from "react-router-dom";

function QuanLyDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-gradient-to-tr from-blue-50 via-white to-purple-50 min-h-screen flex flex-col">
      {/* Main content */}
      <main className="container mx-auto px-6 py-10 flex-grow">
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto place-items-stretch">
          <Link to="/quanly/quanlynhanvien" className="card group">
            <div className="p-6 bg-white rounded-xl shadow-lg transform transition hover:scale-105 hover:shadow-xl flex flex-col justify-center items-center">
              <div
                className={`w-16 h-16 mb-4 rounded-full bg-indigo-100 text-indigor}-700 flex justify-center items-center group-hover:bg-indigo-200 transition`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14v7m0 0h3m-3 0H9m4-7a4 4 0 016 4v4H6v-4a4 4 0 016-4z"
                  />
                </svg>
              </div>
              <h2
                className={`text-lg font-semibold text-gray-800 group-hover:text-indigo-700 transition`}
              >
                Nhân viên
              </h2>
            </div>
          </Link>
          <Link to="/quanly/quanlysanpham" className="card group">
            <div className="p-6 bg-white rounded-xl shadow-lg transform transition hover:scale-105 hover:shadow-xl flex flex-col justify-center items-center">
              <div
                className={`w-16 h-16 mb-4 rounded-full bg-green-100 text-green-700 flex justify-center items-center group-hover:bg-green-200 transition`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20 13V7a2 2 0 00-2-2H6a2 2 0 00-2 2v6m0 0v6a2 2 0 002 2h8a2 2 0 002-2v-6m-6 0h6"
                  />
                </svg>
              </div>
              <h2
                className={`text-lg font-semibold text-gray-800 group-hover:text-green-700 transition`}
              >
                Sản phẩm
              </h2>
            </div>
          </Link>
          <a href="#" className="card group">
            <div className="p-6 bg-white rounded-xl shadow-lg transform transition hover:scale-105 hover:shadow-xl flex flex-col justify-center items-center">
              <div
                className={`w-16 h-16 mb-4 rounded-full bg-blue-100 text-blue-700 flex justify-center items-center group-hover:bg-blue-200 transition`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.121 17.804A4.002 4.002 0 015 14V9a4 4 0 118 0v5a4.002 4.002 0 01-.121 3.804M15 19h6M3 19h6"
                  />
                </svg>
              </div>
              <h2
                className={`text-lg font-semibold text-gray-800 group-hover:text-blue-700 transition`}
              >
                Nhập hàng
              </h2>
            </div>
          </a>
          <a href="#" className="card group">
            <div className="p-6 bg-white rounded-xl shadow-lg transform transition hover:scale-105 hover:shadow-xl flex flex-col justify-center items-center">
              <div
                className={`w-16 h-16 mb-4 rounded-full bg-pink-100 text-pink-700 flex justify-center items-center group-hover:bg-pink-200 transition`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7V3m8 4V3m-9 8h10l2 7H7l2-7zM12 11v6"
                  />
                </svg>
              </div>
              <h2
                className={`text-lg font-semibold text-gray-800 group-hover:text-pink-700 transition`}
              >
                Khuyến mãi
              </h2>
            </div>
          </a>
          <Link to="quanlyhoadon" className="card group">
            <div className="p-6 bg-white rounded-xl shadow-lg transform transition hover:scale-105 hover:shadow-xl flex flex-col justify-center items-center">
              <div
                className={`w-16 h-16 mb-4 rounded-full bg-yellow-100 text-yellow-700 flex justify-center items-center group-hover:bg-yellow-200 transition`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.121 17.804A4.002 4.002 0 015 14V9a4 4 0 118 0v5a4.002 4.002 0 01-.121 3.804M15 19h6M3 19h6"
                  />
                </svg>
              </div>
              <h2
                className={`text-lg font-semibold text-gray-800 group-hover:text-yellow-700 transition`}
              >
                Hoá đơn
              </h2>
            </div>
          </Link>
          <a href="#" className="card group">
            <div className="p-6 bg-white rounded-xl shadow-lg transform transition hover:scale-105 hover:shadow-xl flex flex-col justify-center items-center">
              <div
                className={`w-16 h-16 mb-4 rounded-full bg-red-100 text-red-700 flex justify-center items-center group-hover:bg-red-200 transition`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.121 17.804A4.002 4.002 0 015 14V9a4 4 0 118 0v5a4.002 4.002 0 01-.121 3.804M15 19h6M3 19h6"
                  />
                </svg>
              </div>
              <h2
                className={`text-lg font-semibold text-gray-800 group-hover:text-red-700 transition`}
              >
                Thanh toán
              </h2>
            </div>
          </a>
          <a href="#" className="card group">
            <div className="p-6 bg-white rounded-xl shadow-lg transform transition hover:scale-105 hover:shadow-xl flex flex-col justify-center items-center">
              <div
                className={`w-16 h-16 mb-4 rounded-full bg-teal-100 text-teal-700 flex justify-center items-center group-hover:bg-teal-200 transition`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.121 17.804A4.002 4.002 0 015 14V9a4 4 0 118 0v5a4.002 4.002 0 01-.121 3.804M15 19h6M3 19h6"
                  />
                </svg>
              </div>
              <h2
                className={`text-lg font-semibold text-gray-800 group-hover:text-teal-700 transition`}
              >
                Hoá đơn
              </h2>
            </div>
          </a>
        </section>
      </main>

      {/* Login Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-2xl font-bold mb-4 text-center">Đăng Nhập</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700">
                  Tên đăng nhập
                </label>
                <input
                  type="text"
                  id="username"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  placeholder="Nhập tên đăng nhập"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  id="password"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  placeholder="Nhập mật khẩu"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 transition"
              >
                Đăng Nhập
              </button>
            </form>
            <button
              className="mt-4 text-gray-500 hover:text-gray-700"
              onClick={() => setIsModalOpen(false)}
            >
              Đóng
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white shadow-inner mt-auto py-6">
        <div className="container mx-auto px-6 text-center text-gray-600 text-sm select-none">
          © 2024 Fahasa.com - Trang Quản Lý Được Tạo Bởi Chuyên Gia HTML & CSS
        </div>
      </footer>
    </div>
  );
}

export default QuanLyDashboard;
