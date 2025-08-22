import React, { useEffect, useState } from "react";
import { thongketonkho } from "../services/Service";

const ThongKeTonKho = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await thongketonkho();
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Thống kê tồn kho</h2>

      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
        <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
          <tr>
            <th className="py-3 px-4 text-left">STT</th>
            <th className="py-3 px-4 text-left">Tên hàng hóa</th>
            <th className="py-3 px-4 text-right">Số lượng</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm">
          {data.map((item, index) => (
            <tr
              key={item._id}
              className="border-b border-gray-200 hover:bg-gray-50"
            >
              <td className="py-3 px-4">{index + 1}</td>
              <td className="py-3 px-4 font-medium">{item.Ten}</td>
              <td className="py-3 px-4 text-right">{item.SoLuong}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ThongKeTonKho;
