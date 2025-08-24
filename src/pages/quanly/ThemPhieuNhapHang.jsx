import React, { useState } from "react";
import { toast } from "react-toastify";
import TimHangHoa from "../../components/TimHangHoa";
import { Link, useNavigate } from "react-router-dom";
import { themphieunhaphang } from "../../services/Service";

const ThemPhieuNhapHang = () => {
  const navigate = useNavigate();
  const [chiTietNhap, setChiTietNhap] = useState([]);
  const [hienThem, setHienThem] = useState(false);
  const [dangGui, setDangGui] = useState(false);

  const themHangHoa = (DuLieu) => {
    setChiTietNhap([
      ...chiTietNhap,
      {
        id: DuLieu._id,
        Ten: DuLieu.Ten,
        Gia: DuLieu.Gia,
        SoLuong: 1,
        TienHang: 0,
        TongGia: DuLieu.Gia,
      },
    ]);
    setHienThem(false);
  };

  const capNhatChiTietNhap = (index, field, value) => {
    const newChiTiet = [...chiTietNhap];
    newChiTiet[index][field] = value;

    if (field === "SoLuong") {
      newChiTiet[index].TongGia =
        parseInt(value || 0) * parseInt(newChiTiet[index].Gia || 0);
    }
    setChiTietNhap(newChiTiet);
  };

  const xoaHangHoa = (index) => {
    const newChiTiet = chiTietNhap.filter((_, i) => i !== index);
    setChiTietNhap(newChiTiet);
  };

  const handleSubmit = async () => {
    const data = {
      DanhSach: chiTietNhap.map((item) => ({
        MaHangHoa: item.id,
        SoLuong: parseInt(item.SoLuong),
        TienHang: parseInt(item.TienHang),
      })),
    };
    console.log("Phiếu nhập gửi đi:", data);
    try {
      setDangGui(true);
      const response = await themphieunhaphang(data);
      toast.success(response.data.message);
      navigate("/quanly/quanlynhaphang");
      setDangGui(false);
    } catch (error) {
      setDangGui(false);
      toast.error("Thêm phiếu nhập thất bại");
      console.log(error);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Thêm phiếu nhập hàng
      </h1>
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 space-y-6 w-full max-w-4xl">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Danh sách nhập hàng
          </label>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-xl overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Tên hàng</th>
                  <th className="px-4 py-2 text-left">Giá bán mỗi món(đ)</th>
                  <th className="px-4 py-2 text-left">Số lượng</th>
                  <th className="px-4 py-2 text-left">Tổng giá bán (đ)</th>
                  <th className="px-4 py-2 text-left">Giá nhập (đ)</th>
                  <th className="px-4 py-2 text-center">Xóa</th>
                </tr>
              </thead>
              <tbody>
                {chiTietNhap.map((item, index) => (
                  <tr key={item.id} className="border-t">
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        value={item.Ten}
                        disabled
                        className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        value={item.Gia}
                        disabled
                        className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        min="1"
                        value={item.SoLuong}
                        onChange={(e) =>
                          capNhatChiTietNhap(index, "SoLuong", e.target.value)
                        }
                        className="w-full p-2 border border-gray-300 rounded-lg"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        value={item.TongGia}
                        disabled
                        className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        min="0"
                        value={item.TienHang}
                        onChange={(e) =>
                          capNhatChiTietNhap(index, "TienHang", e.target.value)
                        }
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg"
                      />
                    </td>

                    <td className="px-4 py-2 text-center">
                      <button
                        type="button"
                        onClick={() => xoaHangHoa(index)}
                        className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                      >
                        X
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            type="button"
            onClick={() => setHienThem(true)}
            className="mt-4 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl shadow"
          >
            + Thêm hàng hoá
          </button>
        </div>
        <div className="flex justify-end space-x-4 pt-4">
          <Link
            to="/quanly/quanlynhaphang"
            className="px-6 py-2 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100"
          >
            Huỷ
          </Link>
          <button
            type="button"
            disabled={dangGui}
            onClick={handleSubmit}
            className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl shadow"
          >
            Lưu phiếu nhập
          </button>
        </div>
      </div>

      {hienThem && (
        <TimHangHoa chonHangHoa={themHangHoa} dong={() => setHienThem(false)} />
      )}
    </div>
  );
};

export default ThemPhieuNhapHang;
