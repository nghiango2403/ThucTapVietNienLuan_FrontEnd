import React, { useEffect, useState } from "react";
import {
  laychucvu,
  suanhanvien,
  laythongtinnhanvien,
} from "../services/Service";
import { toast } from "react-toastify";

const SuaNhanVien = ({ MaNhanVien, onClose, onUpdate }) => {
  const [chucvu, setChucvu] = useState([]);
  const [dulieu, setDulieu] = useState({
    HoTen: "",
    SDT: "",
    Email: "",
    NgaySinh: "",
    DiaChi: "",
    GioiTinh: "0",
    MaChucVu: "",
    MaNhanSu: "",
  });

  useEffect(() => {
    const layChucVu = async () => {
      try {
        const response = await laychucvu();
        setChucvu(response.data.data);
      } catch (error) {
        console.log("Lấy chức vụ thất bại: " + error.message);
      }
    };

    const layThongTinNV = async () => {
      if (MaNhanVien) {
        try {
          const response = await laythongtinnhanvien(MaNhanVien);
          const data = response.data.data;
          setDulieu({
            HoTen: data.MaNhanSu.HoTen,
            SDT: data.MaNhanSu.SDT,
            Email: data.MaNhanSu.Email,
            NgaySinh: data.MaNhanSu.NgaySinh
              ? data.MaNhanSu.NgaySinh.split("T")[0]
              : "",
            DiaChi: data.MaNhanSu.DiaChi,
            GioiTinh: data.MaNhanSu.GioiTinh.toString(),
            MaChucVu: data.MaChucVu._id,
            MaNhanSu: data.MaNhanSu._id,
          });
        } catch (error) {
          toast.error(error.response.data.message);
          console.error("Lỗi khi lấy dữ liệu nhân viên: ", error);
        }
      }
    };

    layChucVu();
    layThongTinNV();
  }, [MaNhanVien]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDulieu((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await suanhanvien(
        dulieu.MaNhanSu,
        dulieu.HoTen,
        dulieu.SDT,
        dulieu.Email,
        dulieu.NgaySinh,
        dulieu.DiaChi,
        dulieu.GioiTinh,
        // dulieu.MatKhau,
        dulieu.MaChucVu
      );
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
        className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6"
      >
        {/* Input: Họ và Tên */}
        <div className="space-y-1">
          <label
            htmlFor="hoTen"
            className="block text-sm font-medium text-gray-700"
          >
            Họ và Tên
          </label>
          <input
            type="text"
            id="hoTen"
            name="HoTen"
            value={dulieu.HoTen}
            onChange={handleChange}
            placeholder="Nguyễn Văn A"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors duration-200"
            required
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="sdt"
            className="block text-sm font-medium text-gray-700"
          >
            Số Điện Thoại
          </label>
          <input
            type="tel"
            id="sdt"
            name="SDT"
            value={dulieu.SDT}
            onChange={handleChange}
            placeholder="0909123456"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors duration-200"
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="Email"
            value={dulieu.Email}
            onChange={handleChange}
            placeholder="nguyenvana@example.com"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors duration-200"
            required
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="ngaySinh"
            className="block text-sm font-medium text-gray-700"
          >
            Ngày Sinh
          </label>
          <input
            type="date"
            id="ngaySinh"
            name="NgaySinh"
            value={dulieu.NgaySinh}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors duration-200"
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="diaChi"
            className="block text-sm font-medium text-gray-700"
          >
            Địa Chỉ
          </label>
          <input
            type="text"
            id="diaChi"
            name="DiaChi"
            value={dulieu.DiaChi}
            onChange={handleChange}
            placeholder="123 Đường Lê Lợi, Quận 1, TP.HCM"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors duration-200"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Giới Tính
          </label>
          <div className="flex items-center gap-6 mt-1">
            <label className="flex items-center space-x-2 text-gray-700">
              <input
                type="radio"
                name="GioiTinh"
                value="0"
                checked={dulieu.GioiTinh === "0"}
                onChange={handleChange}
                className="size-4 text-emerald-600 border-gray-300 focus:ring-emerald-500"
              />
              <span>Nam</span>
            </label>
            <label className="flex items-center space-x-2 text-gray-700">
              <input
                type="radio"
                name="GioiTinh"
                value="1"
                checked={dulieu.GioiTinh === "1"}
                onChange={handleChange}
                className="size-4 text-emerald-600 border-gray-300 focus:ring-emerald-500"
              />
              <span>Nữ</span>
            </label>
            <label className="flex items-center space-x-2 text-gray-700">
              <input
                type="radio"
                name="GioiTinh"
                value="2"
                checked={dulieu.GioiTinh === "2"}
                onChange={handleChange}
                className="size-4 text-emerald-600 border-gray-300 focus:ring-emerald-500"
              />
              <span>Khác</span>
            </label>
          </div>
        </div>

        <div className="space-y-1">
          <label
            htmlFor="maChucVu"
            className="block text-sm font-medium text-gray-700"
          >
            Chức Vụ
          </label>
          <select
            id="maChucVu"
            name="MaChucVu"
            value={dulieu.MaChucVu}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors duration-200"
          >
            <option value="">-- Chọn Chức Vụ --</option>
            {chucvu.map((item) => (
              <option key={item._id} value={item._id}>
                {item.TenChucVu}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2 mt-4">
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

export default SuaNhanVien;
