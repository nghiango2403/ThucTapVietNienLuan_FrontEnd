import React, { useEffect, useState } from "react";
import { thongkedoanhthu } from "../services/Service";

const ThongKeDoanhThu = () => {
  const [data, setData] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const fetchData = async (from, to) => {
    try {
      const response = await thongkedoanhthu(from, to);
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFilter = () => {
    if (fromDate && toDate && new Date(toDate) < new Date(fromDate)) {
      alert("Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu");
      return;
    }
    fetchData(fromDate, toDate);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Thống kê tồn kho</h2>

      {/* Bộ lọc ngày */}
      <div className="flex flex-wrap items-end gap-4 mb-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Từ ngày</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Đến ngày</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          onClick={handleFilter}
          className="bg-blue-500 text-white px-5 py-2 rounded-lg text-sm font-medium shadow hover:bg-blue-600 transition"
        >
          Lọc
        </button>
      </div>

      {/* Bảng thống kê */}
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
        <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
          <tr>
            <th className="py-3 px-4 text-left">STT</th>
            <th className="py-3 px-4 text-left">Ngày</th>
            <th className="py-3 px-4 text-right">Tổng doanh thu</th>
            <th className="py-3 px-4 text-right">Tổng tiền hàng</th>
            <th className="py-3 px-4 text-right">Tổng tiền khuyến mãi</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm">
          {data.map((item, index) => (
            <tr
              key={item._id}
              className="border-b border-gray-200 hover:bg-gray-50"
            >
              <td className="py-3 px-4">{index + 1}</td>
              <td className="py-3 px-4 font-medium">{item._id}</td>
              <td className="py-3 px-4 text-right">{item.TongDoanhThu} đ</td>
              <td className="py-3 px-4 text-right">{item.TongTienHang} đ</td>
              <td className="py-3 px-4 text-right">
                {item.TongTienKhuyenMai} đ
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ThongKeDoanhThu;
