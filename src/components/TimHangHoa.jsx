import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { timhanghoa } from "../services/Service";

const TimHangHoa = ({ chonHangHoa, dong }) => {
  const [search, setSearch] = useState("");
  const [dsHangHoa, setDsHangHoa] = useState([]);
  useEffect(() => {
    timHangHoa();
  }, []);
  const timHangHoa = async () => {
    try {
      const response = await timhanghoa(search);
      setDsHangHoa(response.data.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-3/4 max-w-3xl">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Chọn hàng hóa
        </h2>
        <div className="flex items-center gap-2 mb-4">
          <input
            type="text"
            placeholder="Tìm kiếm hàng hóa..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-10 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            onClick={() => timHangHoa()}
            className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
          >
            Tìm
          </button>
        </div>

        <div className="max-h-72 overflow-y-auto border rounded-lg">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
              <tr>
                <th className="p-2 text-left">Tên hàng hóa</th>
                <th className="p-2 text-right">Giá (đ)</th>
                <th className="p-2 text-right">Tồn kho</th>
              </tr>
            </thead>
            <tbody>
              {dsHangHoa.map((hang) => (
                <tr
                  key={hang._id}
                  onClick={() => chonHangHoa(hang)}
                  className="cursor-pointer hover:bg-blue-50 transition"
                >
                  <td className="p-2">{hang.Ten}</td>
                  <td className="p-2 text-right">
                    {hang.Gia.toLocaleString()}
                  </td>
                  <td className="p-2 text-right">{hang.SoLuong}</td>
                </tr>
              ))}
              {dsHangHoa.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="p-4 text-center text-gray-500 italic"
                  >
                    Không tìm thấy hàng hóa
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Nút đóng */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={dong}
            className="px-5 py-2 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600 transition"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimHangHoa;
