import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { themkhuyenmai } from "../services/Service";

const ThemKhuyenMai = () => {
  const navigate = useNavigate();
  const [dangGui, setDangGui] = useState(false);

  const [data, setData] = useState({
    TenKhuyenMai: "",
    NgayBatDau: "",
    NgayKetThuc: "",
    TienKhuyenMai: 0,
    DieuKien: 0,
  });

  const thaydoi = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const gui = async () => {
    if (data.NgayKetThuc < data.NgayBatDau)
      return toast.error("Ngày kết thúc phải lớn hơn ngày bắt đầu");
    try {
      setDangGui(true);
      const response = await themkhuyenmai(data);
      toast.success(response.data.message);
      navigate("/quanly/quanlykhuyenmai");
      setDangGui(false);
    } catch (error) {
      setDangGui(false);
      toast.error("Thêm khuyến mãi thất bại");
      console.log(error);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Thêm khuyến mãi</h1>

      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 space-y-6 w-full max-w-2xl">
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

        <div className="flex justify-end space-x-4 pt-4">
          <Link
            to="/quanly/quanlykhuyenmai"
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
            Lưu khuyến mãi
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThemKhuyenMai;
