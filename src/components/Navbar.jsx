import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <nav className="bg-gray-900 text-white py-4 shadow-md flex justify-between items-center px-36">
      <Link to="/" className="text-xl font-bold hover:text-yellow-400">
        Tạp hoá
      </Link>

      <div className="relative bg-gray-600 rounded-full">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="rounded-circle rounded-md p-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white text-gray-900 rounded shadow-lg z-50">
            <Link
              to={
                localStorage.getItem("ChucVu") === "Quản lý"
                  ? "/quanly/suathongtintaikhoan"
                  : "/nhanvien/suathongtintaikhoan"
              }
              className="block px-4 py-2 hover:bg-gray-200"
              onClick={() => setDropdownOpen(false)}
            >
              Sữa thông tin
            </Link>

            <Link
              to={
                localStorage.getItem("ChucVu") == "Quản lý"
                  ? "/quanly/doimatkhau"
                  : "/nhanvien/doimatkhau"
              }
              className="block px-4 py-2 hover:bg-gray-200"
              onClick={() => setDropdownOpen(false)}
            >
              Đổi mật khẩu
            </Link>

            <button
              className="block px-4 py-2 hover:bg-gray-200"
              onClick={() => {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("ChucVu");
                navigate("/dangnhap");
              }}
            >
              Đăng xuất
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
