import React, { useState } from "react";
import { toast } from "react-toastify";
import { suahanghoa } from "../services/Service";

const SuaHangHoa = ({ hanghoa, dong }) => {
  const [dangGui, setDangGui] = useState(false);

  const [data, setData] = useState({
    MaHangHoa: hanghoa?._id || "",
    Ten: hanghoa?.Ten || "",
    Gia: hanghoa?.Gia || 0,
  });

  const thaydoi = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const gui = async () => {
    try {
      setDangGui(true);
      const response = await suahanghoa(data);
      toast.success(response.data.message);
      dong();
    } catch (error) {
      toast.error("Sửa hàng hoá thất bại");
      console.error(error);
    } finally {
      setDangGui(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-xl font-bold text-gray-800">Sửa hàng hoá</h2>
          <button
            onClick={dong}
            className="text-gray-500 hover:text-gray-700 font-bold text-lg"
          >
            ✕
          </button>
        </div>
        <div className="space-y-4">
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
        </div>

        <div className="flex justify-end mt-6 space-x-4">
          <button
            onClick={dong}
            className="px-6 py-2 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100"
          >
            Huỷ
          </button>
          <button
            type="button"
            disabled={dangGui}
            onClick={gui}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl shadow"
          >
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuaHangHoa;
