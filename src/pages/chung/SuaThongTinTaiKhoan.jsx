import React, { useEffect, useState } from "react";
import {
  doithongtintaikhoan,
  laythongtintaikhoan,
} from "../../services/Service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SuaThongTinTaiKhoan = () => {
  const navigate = useNavigate();
  const [hoTen, setHoTen] = useState("");
  const [sdt, setSdt] = useState("");
  const [ngaySinh, setNgaySinh] = useState("");
  const [diaChi, setDiaChi] = useState("");
  const [gioiTinh, setGioiTinh] = useState("1");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const laythongtin = async () => {
      const res = await laythongtintaikhoan();
      const data = res.data.data;
      setHoTen(data.HoTen);
      setSdt(data.SDT);
      setNgaySinh(data.NgaySinh);
      setDiaChi(data.DiaChi);
      setGioiTinh(data.GioiTinh);
      setEmail(data.Email);
    };
    laythongtin();
  }, []);
  const gui = async (e) => {
    e.preventDefault();
    const data = {
      HoTen: hoTen,
      Email: email,
      SDT: sdt,
      NgaySinh: ngaySinh,
      DiaChi: diaChi,
      GioiTinh: gioiTinh,
    };
    try {
      const res = await doithongtintaikhoan(data);
      toast.success(res.data.message);
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-lg">
        <h2 className="text-xl font-semibold text-center mb-4">
          Sửa thông tin tài khoản
        </h2>
        <form onSubmit={gui} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Họ tên</label>
            <input
              type="text"
              value={hoTen}
              onChange={(e) => setHoTen(e.target.value)}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Số điện thoại</label>
            <input
              type="tel"
              value={sdt}
              onChange={(e) => setSdt(e.target.value)}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              pattern="[0-9]{10}"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Ngày sinh</label>
            <input
              type="date"
              value={ngaySinh.slice(0, 10)}
              onChange={(e) => setNgaySinh(e.target.value)}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Địa chỉ</label>
            <input
              type="text"
              value={diaChi}
              onChange={(e) => setDiaChi(e.target.value)}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Giới tính</label>
            <select
              value={gioiTinh}
              onChange={(e) => setGioiTinh(e.target.value)}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="1">Nam</option>
              <option value="0">Nữ</option>
            </select>
          </div>

          <div className="flex justify-between gap-2">
            <button
              type="submit"
              className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
            >
              Lưu
            </button>
            <button
              type="button"
              onClick={() => {
                setHoTen("");
                setSdt("");
                setNgaySinh("");
                setDiaChi("");
                setGioiTinh("1");
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

export default SuaThongTinTaiKhoan;
