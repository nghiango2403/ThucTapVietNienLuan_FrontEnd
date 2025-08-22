import React, { useEffect, useState } from "react";
import { thongkenhaphang } from "../services/Service";

const ThongKeNhapHang = () => {
  const [data, setData] = useState([]);
  const [thang, setThang] = useState(new Date().getMonth() + 1);
  const [nam, setNam] = useState(new Date().getFullYear());

  const LayThongKeNhapHang = async (m, y) => {
    try {
      const response = await thongkenhaphang(m, y);
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    LayThongKeNhapHang(thang, nam);
  }, []);

  const Tim = (e) => {
    e.preventDefault();
    LayThongKeNhapHang(thang, nam);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Thống kê nhập hàng</h2>

      <form onSubmit={Tim} className="flex items-center gap-4 mb-6">
        <div>
          <label className="mr-2">Tháng:</label>
          <select
            value={thang}
            onChange={(e) => setThang(Number(e.target.value))}
            className="border rounded px-2 py-1"
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mr-2">Năm:</label>
          <input
            type="number"
            value={nam}
            onChange={(e) => setNam(Number(e.target.value))}
            className="border rounded px-2 py-1 w-24"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
        >
          Xem
        </button>
      </form>

      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
        <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
          <tr>
            <th className="py-3 px-4 text-left">STT</th>
            <th className="py-3 px-4 text-left">Tên hàng hóa</th>
            <th className="py-3 px-4 text-center">Số lượng</th>
            <th className="py-3 px-4 text-right">Tổng tiền</th>
            <th className="py-3 px-4 text-left">Mã hàng hóa</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm">
          {data.map((item, index) => (
            <tr
              key={item.MaHangHoa}
              className="border-b border-gray-200 hover:bg-gray-50"
            >
              <td className="py-3 px-4">{index + 1}</td>
              <td className="py-3 px-4 font-medium">{item.TenHangHoa}</td>
              <td className="py-3 px-4 text-center">{item.TongSoLuong}</td>
              <td className="py-3 px-4 text-right">
                {item.TongTien.toLocaleString("vi-VN")} ₫
              </td>
              <td className="py-3 px-4 text-gray-500">{item.MaHangHoa}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ThongKeNhapHang;
