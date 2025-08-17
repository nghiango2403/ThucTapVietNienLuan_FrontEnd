import React, { useEffect, useState } from "react";
import Themnhanvien from "../../components/Themnhanvien";
import Suanhanvien from "../../components/Suanhanvien";
import { laydanhsachnhanvien, mohoackhoatk } from "../../services/Service";
import { toast } from "react-toastify";
import DoimatkhauNhanVien from "../../components/DoimatkhauNhanVien";

const Quanlynhanvien = () => {
  const [search, setSearch] = useState("");
  const [dsnhanvien, setDsnhanvien] = useState([]);
  const [hienthigiaodienthem, setHienthigiaodienthem] = useState(false);
  const [hienthigiaodiendoimk, setHienthigiaodiendoimk] = useState(false);
  const [hienthigiaodiensua, setHienthigiaodiensua] = useState(false);
  const [idsua, setidsua] = useState("");

  // Hàm để lấy danh sách nhân viên từ API
  const fetchDsNhanVien = async () => {
    try {
      const response = await laydanhsachnhanvien();
      setDsnhanvien(response.data.data.danhsach);
      console.log(response.data);
    } catch (error) {
      toast.error(
        error.response.data.message || "Lấy danh sách nhân viên thất bại"
      );
    }
  };
  const mokhoatk = async (id) => {
    try {
      await mohoackhoatk(id);
      toast.success("Mở khoá tài khoản thành công");
      fetchDsNhanVien(); // Cập nhật lại danh sách nhân viên
    } catch (error) {
      toast.error("Mở khoá tài khoản thất bại: " + error.message);
    }
  };

  // useEffect để lấy dữ liệu lần đầu khi component được mount
  useEffect(() => {
    fetchDsNhanVien();
  }, []);

  return (
    <div className="container bg-white shadow-sm px-36 h-screen pt-2">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-700">
          Quản lý nhân viên
        </h1>
        <button
          onClick={() => setHienthigiaodienthem(true)}
          className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-lg shadow transition duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          <span>Thêm mới</span>
        </button>
      </div>

      <div className="flex items-center mb-6">
        <input
          type="text"
          className="border border-gray-300 rounded-lg px-4 py-2 flex-grow focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
          placeholder="Tìm kiếm nhân viên..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="ml-3 bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-lg shadow transition">
          Tìm
        </button>
      </div>

      {hienthigiaodienthem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <Themnhanvien onClose={() => setHienthigiaodienthem(false)} />
        </div>
      )}

      {hienthigiaodiensua && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <Suanhanvien
            MaNhanVien={idsua}
            onClose={() => setHienthigiaodiensua(false)}
            onUpdate={fetchDsNhanVien}
          />
        </div>
      )}
      {hienthigiaodiendoimk && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <DoimatkhauNhanVien
            MaNhanVien={idsua}
            onClose={() => setHienthigiaodiendoimk(false)}
            onUpdate={fetchDsNhanVien}
          />
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="bg-gray-50 text-gray-600">
              <th className="px-4 py-3 font-medium">STT</th>
              <th className="px-4 py-3 font-medium">Họ và tên</th>
              <th className="px-4 py-3 font-medium">Tên đăng nhập</th>
              <th className="px-4 py-3 font-medium">Chức vụ</th>
              <th className="px-4 py-3 font-medium text-center">Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {dsnhanvien.map((emp, index) => {
              const target = (
                emp.MaNhanSu?.HoTen ||
                emp.TenDangNhap ||
                ""
              ).toLowerCase();

              if (search && !target.includes(search.toLowerCase())) {
                return null;
              }

              return (
                <tr
                  key={emp._id}
                  className={`transition ${
                    index % 2 ? "bg-gray-50" : "bg-white"
                  } hover:bg-indigo-50`}
                >
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{emp.MaNhanSu?.HoTen}</td>
                  <td className="px-4 py-3">{emp.TenDangNhap}</td>
                  <td className="px-4 py-3">{emp.MaChucVu?.TenChucVu}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      className="text-indigo-600 hover:text-indigo-800 font-medium"
                      onClick={() => {
                        setidsua(emp._id);
                        setHienthigiaodiensua(true);
                      }}
                    >
                      Sửa
                    </button>
                    <button
                      className="ml-4 text-green-500 hover:text-green-600 font-medium"
                      onClick={() => {
                        setidsua(emp._id);
                        setHienthigiaodiendoimk(true);
                      }}
                    >
                      Đổi mật khẩu
                    </button>
                    <button
                      className="ml-4 text-red-500 hover:text-red-700 font-medium"
                      onClick={() => mokhoatk(emp._id)}
                    >
                      {emp.KichHoat ? "Khoá" : "Mở"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Quanlynhanvien;
