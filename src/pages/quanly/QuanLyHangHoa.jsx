import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { layhanghoa } from "../../services/Service";
import SuaHangHoa from "../../components/SuaHangHoa";

const QuanLyHangHoa = () => {
  const [dsHangHoa, setDsHangHoa] = useState([]);
  const [hienSua, setHienSua] = useState(false);
  const [hanghoa, setHanghoa] = useState({});
  const [ten, setTen] = useState("");

  useEffect(() => {
    layDanhSachHangHoa();
  }, []);

  const layDanhSachHangHoa = async () => {
    try {
      const response = await layhanghoa(ten);
      setDsHangHoa(response.data?.data || []);
    } catch (error) {
      console.log(error);
      toast.error("Lấy hàng hoá thất bại");
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Quản lý hàng hoá</h1>
        <Link
          to="/quanly/themhanghoa"
          className="px-4 py-2 bg-green-500 text-white rounded-xl shadow hover:bg-green-600 transition"
        >
          + Thêm mới
        </Link>
      </div>

      <div className="flex items-center space-x-3 mb-6">
        <input
          type="text"
          placeholder="Nhập tên hàng hoá..."
          value={ten}
          onChange={(e) => setTen(e.target.value)}
          className="w-1/3 px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
        />
        <button
          onClick={layDanhSachHangHoa}
          className="px-4 py-2 bg-indigo-500 text-white rounded-xl shadow hover:bg-indigo-600 transition"
        >
          Tìm
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                STT
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                Tên hàng hoá
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                Giá
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                Số lượng
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                Chức năng
              </th>
            </tr>
          </thead>
          <tbody>
            {dsHangHoa.length > 0 ? (
              dsHangHoa.map((hh, index) => (
                <tr
                  key={hh._id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-4 py-3 text-gray-700">{index + 1}</td>
                  <td className="px-4 py-3 text-gray-700 font-medium">
                    {hh.Ten}
                  </td>
                  <td className="px-4 py-3 text-gray-700">{hh.Gia} đ</td>
                  <td className="px-4 py-3 text-gray-700">{hh.SoLuong}</td>
                  <td className="px-4 py-3 space-x-3">
                    <button
                      onClick={() => {
                        setHanghoa(hh);
                        setHienSua(true);
                      }}
                      className="px-3 py-1 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition"
                    >
                      Sửa
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-4 py-6 text-center text-gray-500 italic"
                >
                  Không có hàng hoá nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {hienSua && (
        <SuaHangHoa
          hanghoa={hanghoa}
          dong={() => {
            setHienSua(false);
            layDanhSachHangHoa();
          }}
        />
      )}
    </div>
  );
};

export default QuanLyHangHoa;
