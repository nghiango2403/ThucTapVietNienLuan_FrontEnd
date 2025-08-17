import React, { useState } from "react";
import { doimatkhaunv } from "../services/Service";
import { toast } from "react-toastify";

const DoimatkhauNhanVien = ({ MaNhanVien, onClose, onUpdate }) => {
  const [matkhau, setmatkhau] = useState("");

  const handleChange = (e) => {
    const { value } = e.target;
    setmatkhau(value);
  };

  const handleSubmit = async () => {
    try {
      await doimatkhaunv(MaNhanVien, matkhau);
      onClose();
      if (onUpdate) onUpdate();
      toast.success("Sửa thông tin nhân viên thành công");
    } catch (error) {
      toast.error("Sửa thông tin nhân viên thất bại: " + error.message);
    }
  };

  return (
    <div className="relative bg-white p-8 rounded-2xl shadow-2xl w-full max-w-2xl mx-auto font-sans">
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-all duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>

      <h2 className="text-3xl font-bold text-navy-blue mb-8 text-center">
        Sửa Thông Tin Nhân Viên
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-x-8 gap-y-6"
      >
        <div className="space-y-2">
          <label
            htmlFor="hoTen"
            className="block text-sm font-medium text-gray-700"
          >
            Mật khẩu mới
          </label>
          <input
            type="text"
            id="hoTen"
            name="HoTen"
            onChange={handleChange}
            placeholder="Mật khẩu"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors duration-200"
            required
          />
        </div>

        <div className="col-span-2 mt-4">
          <button
            type="submit"
            className="w-full bg-amber-100 text-black py-3 rounded-lg shadow-md hover:bg-opacity-90 transition-all duration-300 font-semibold text-lg"
          >
            Lưu Thay Đổi
          </button>
        </div>
      </form>
    </div>
  );
};

export default DoimatkhauNhanVien;
