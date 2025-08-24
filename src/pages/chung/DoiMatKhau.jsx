import React, { useState } from "react";
import { toast } from "react-toastify";
import { doimatkhau } from "../../services/Service";

const DoiMatKhau = () => {
  const [MatKhauCu, setMatKhauCu] = useState("");
  const [MatKhauMoi, setMatKhauMoi] = useState("");
  const [xacnhanmatkhau, setXacNhanMatKhau] = useState("");

  const gui = async (e) => {
    e.preventDefault();
    if (MatKhauMoi !== xacnhanmatkhau) {
      toast.error("Mật khẩu mới và mật khẩu xác nhận không khớp!");
      return;
    }
    try {
      const res = await doimatkhau(MatKhauCu, MatKhauMoi);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold text-center mb-4">Đổi mật khẩu</h2>
        <form onSubmit={gui} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Mật khẩu cũ</label>
            <input
              type="password"
              value={MatKhauCu}
              onChange={(e) => setMatKhauCu(e.target.value)}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Mật khẩu mới</label>
            <input
              type="password"
              value={MatKhauMoi}
              onChange={(e) => setMatKhauMoi(e.target.value)}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Xác nhận mật khẩu</label>
            <input
              type="password"
              value={xacnhanmatkhau}
              onChange={(e) => setXacNhanMatKhau(e.target.value)}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>
          <div className="flex justify-between gap-2">
            <button
              type="submit"
              className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
            >
              Xác nhận
            </button>
            <button
              type="button"
              onClick={() => {
                setMatKhauCu("");
                setMatKhauMoi("");
                setXacNhanMatKhau("");
              }}
              className="flex-1 bg-gray-300 text-black py-2 rounded-lg hover:bg-gray-400 transition"
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoiMatKhau;
