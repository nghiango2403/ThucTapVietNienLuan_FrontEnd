import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { themhanghoa } from "../services/Service";

const ThemHangHoa = () => {
  const navigate = useNavigate();
  const [dangGui, setDangGui] = useState(false);

  const [data, setData] = useState({
    Ten: "",
    Gia: 0,
  });

  const thaydoi = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const gui = async () => {
    try {
      setDangGui(true);
      const response = await themhanghoa(data);
      toast.success(response.data.message);
      navigate("/quanly/quanlysanpham");
    } catch (error) {
      toast.error("Thêm hàng hoá thất bại");
      console.error(error);
    } finally {
      setDangGui(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Thêm hàng hoá</h1>

      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 space-y-6 w-full max-w-2xl">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tên hàng hoá
          </label>
          <input
            type="text"
            name="Ten"
            value={data.Ten}
            onChange={thaydoi}
            required
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Giá */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Giá (đ)
          </label>
          <input
            type="number"
            name="Gia"
            value={data.Gia}
            onChange={thaydoi}
            required
            min="0"
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <Link
            to="/quanly/quanlyhanghoa"
            className="px-6 py-2 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100"
          >
            Huỷ
          </Link>
          <button
            type="button"
            disabled={dangGui}
            onClick={gui}
            className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl shadow"
          >
            Lưu hàng hoá
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThemHangHoa;
