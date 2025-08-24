import React, { useState } from "react";
import { toast } from "react-toastify";
import { suakhuyenmai } from "../services/Service";

const SuaKhuyenMai = ({ khuyenmai, dong }) => {
  const [dangGui, setDangGui] = useState(false);

  const [data, setData] = useState({
    MaKhuyenMai: khuyenmai?._id || "",
    TenKhuyenMai: khuyenmai?.TenKhuyenMai || "",
    NgayBatDau: khuyenmai?.NgayBatDau?.slice(0, 10) || "",
    NgayKetThuc: khuyenmai?.NgayKetThuc?.slice(0, 10) || "",
    TienKhuyenMai: khuyenmai?.TienKhuyenMai || 0,
    DieuKien: khuyenmai?.DieuKien || 0,
  });

  const thaydoi = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const gui = async () => {
    if (data.NgayKetThuc < data.NgayBatDau) {
      return toast.error("Ngày kết thúc phải lớn hơn ngày bắt đầu");
    }

    try {
      setDangGui(true);
      console.log(data);
      const response = await suakhuyenmai(data);
      toast.success(response.data.message);
      dong();
      setDangGui(false);
    } catch (error) {
      setDangGui(false);
      toast.error("Sửa khuyến mãi thất bại");
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-xl font-bold text-gray-800">Sửa khuyến mãi</h2>
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
              Tên khuyến mãi
            </label>
            <input
              type="text"
              name="TenKhuyenMai"
              value={data.TenKhuyenMai}
              onChange={thaydoi}
              required
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ngày bắt đầu
            </label>
            <input
              type="date"
              name="NgayBatDau"
              value={data.NgayBatDau}
              onChange={thaydoi}
              required
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ngày kết thúc
            </label>
            <input
              type="date"
              name="NgayKetThuc"
              value={data.NgayKetThuc}
              onChange={thaydoi}
              required
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tiền khuyến mãi (đ)
            </label>
            <input
              type="number"
              name="TienKhuyenMai"
              value={data.TienKhuyenMai}
              onChange={thaydoi}
              required
              min="0"
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hoá đơn áp dụng trên (đ)
            </label>
            <input
              type="number"
              name="DieuKien"
              value={data.DieuKien}
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

export default SuaKhuyenMai;
