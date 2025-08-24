import React, { useEffect, useState } from "react";
import { laychitietphieunhaphang } from "../services/Service";

const XemPhieuNhapHang = ({ nhapHang, dong }) => {
  const [ChiTietPN, setChiTietPN] = useState([]);

  useEffect(() => {
    const fetchChiTiet = async () => {
      try {
        console.log(nhapHang._id);
        const response = await laychitietphieunhaphang(nhapHang._id);
        console.log(response.data.data);
        setChiTietPN(response.data.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchChiTiet();
  }, [nhapHang]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-6">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            Chi tiết phiếu nhập
          </h2>
          <button
            onClick={dong}
            className="text-gray-500 hover:text-gray-700 font-bold text-lg"
          >
            ✕
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-xl overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Tên hàng</th>
                <th className="px-4 py-2 text-center">Giá mỗi món(đ)</th>
                <th className="px-4 py-2 text-center">Số lượng</th>
                <th className="px-4 py-2 text-center">Giá nhập(đ)</th>
              </tr>
            </thead>
            <tbody>
              {ChiTietPN.map((item) => (
                <tr key={item._id} className="border-t">
                  <td className="px-4 py-2">{item.MaHangHoa?.Ten}</td>
                  <td className="px-4 py-2 text-center">
                    {item.MaHangHoa?.Gia?.toLocaleString()}
                  </td>
                  <td className="px-4 py-2 text-center">{item.SoLuong}</td>
                  <td className="px-4 py-2 text-center">
                    {item.TienHang?.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-right mt-4 text-lg font-bold text-green-600">
          Tổng cộng:{" "}
          {ChiTietPN.reduce(
            (sum, item) => sum + (item.TienHang || 0),
            0
          ).toLocaleString()}{" "}
          đ
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={dong}
            className="px-6 py-2 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default XemPhieuNhapHang;
