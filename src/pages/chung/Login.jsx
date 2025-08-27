import { useState } from "react";
import { dangnhap } from "../../services/Service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [tendangnhap, setTendangnhap] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      const dn = await dangnhap(tendangnhap, password);
      localStorage.setItem("accessToken", dn.data.data.accessToken);
      localStorage.setItem("refreshToken", dn.data.data.refreshToken);
      localStorage.setItem("ChucVu", dn.data.data.ThongTin.ChucVu);
      if (dn.data.data.ThongTin.ChucVu == "Quản lý") {
        navigate("/quanly");
      } else {
        navigate("/nhanvien");
      }
    } catch (error) {
      toast.error(error.response.data.message || "Đăng nhập thất bại");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="flex bg-white rounded-lg shadow-lg max-w-2xl w-full">
        <div className="hidden md:flex items-center justify-center w-1/2 bg-blue-100 rounded-l-lg overflow-hidden">
          <img
            src="/public/Screenshot 2025-08-17 131518.png"
            alt="Illustration"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full p-8">
          <h2 className="text-3xl font-bold text-center mb-4 text-red-600">
            Tạp hóa
          </h2>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="tendangnhap"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Tên đăng nhập
              </label>
              <input
                type="text"
                id="tendangnhap"
                value={tendangnhap}
                onChange={(e) => setTendangnhap(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập email của bạn"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Mật khẩu
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập mật khẩu"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
              onClick={handleSubmit}
            >
              Đăng nhập
            </button>
          </div>

          <div className="mt-4 text-center text-sm text-gray-600">
            <p>
              Chưa có tài khoản?{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Đăng ký ngay
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
