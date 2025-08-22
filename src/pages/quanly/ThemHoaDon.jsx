import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { laymakhuyenmaiconhoatdong, themhoadon } from "../../services/Service";
import TimHangHoa from "../../components/TimHangHoa";

const ThemHoaDon = () => {
  const [maKhuyenMai, setMaKhuyenMai] = useState("");
  const [hienthem, setHienthem] = useState(false);
  const [hinhThucThanhToan, setHinhThucThanhToan] = useState("Trực tiếp");
  const [chiTietHD, setChiTietHD] = useState([]);
  const [danhSachKhuyenMai, setDanhSachKhuyenMai] = useState([]);
  const [danggui, setDanggui] = useState(false);

  useEffect(() => {
    const laykhuyenmai = async () => {
      try {
        const response = await laymakhuyenmaiconhoatdong();
        if (response.data?.status == 200) {
          setDanhSachKhuyenMai(response.data.data.danhsach);
        } else {
          toast.error(response.data.message);
        }
      } catch (e) {
        toast.error("Lấy khuyến mãi thất bại: ");
        console.log(e);
      }
    };
    laykhuyenmai();
  }, []);

  const themHangHoa = (DuLieu) => {
    setChiTietHD([
      ...chiTietHD,
      {
        id: DuLieu._id,
        Ten: DuLieu.Ten,
        Gia: DuLieu.Gia,
        SoLuong: DuLieu.SoLuong,
        Ban: 1,
      },
    ]);
    setHienthem(false);
  };

  const capNhatChiTietHD = (index, field, value) => {
    const newChiTiet = [...chiTietHD];
    newChiTiet[index][field] = value;
    setChiTietHD(newChiTiet);
  };

  const xoaHangHoa = (index) => {
    const newChiTiet = chiTietHD.filter((_, i) => i !== index);
    setChiTietHD(newChiTiet);
  };

  const handleSubmit = async () => {
    var data;
    if (maKhuyenMai == "") {
      data = {
        HinhThucThanhToan: hinhThucThanhToan,
        ChiTietHD: chiTietHD.map((item) => ({
          MaHangHoa: item.id,
          SoLuong: item.Ban,
        })),
      };
    } else {
      data = {
        MaKhuyenMai: maKhuyenMai,
        HinhThucThanhToan: hinhThucThanhToan,
        ChiTietHD: chiTietHD.map((item) => ({
          MaHangHoa: item.id,
          SoLuong: item.Ban,
        })),
      };
    }
    console.log("Hóa đơn gửi đi:", data);
    try {
      setDanggui(true);
      const response = await themhoadon(data);
      toast.success(response.data.message);
      setDanggui(false);
      if (response.data.status == 201) {
        window.open(response.data.data.url);
      }
    } catch (error) {
      setDanggui(false);
      toast.error("Thêm hóa đơn thất bại: ");
      console.log(error);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Thêm hoá đơn</h1>

      {/* Form */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 space-y-6 w-full max-w-4xl">
        {/* Mã khuyến mãi */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mã khuyến mãi
          </label>
          <select
            value={maKhuyenMai}
            onChange={(e) => setMaKhuyenMai(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none bg-white"
          >
            <option key="1" value="">
              Không áp dụng
            </option>
            {danhSachKhuyenMai.map((khuyenMai) => (
              <option key={khuyenMai._id} value={khuyenMai._id}>
                {khuyenMai.TenKhuyenMai} ({khuyenMai.TienKhuyenMai}đ) (HD từ{" "}
                {khuyenMai.DieuKien} đ)
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hình thức thanh toán
          </label>
          <select
            value={hinhThucThanhToan}
            onChange={(e) => setHinhThucThanhToan(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none bg-white"
          >
            <option value="Trực tiếp">Trực tiếp</option>
            <option value="MoMo">MoMo</option>
            <option value="ZaloPay">ZaLoPay</option>
            <option value="VnPay">VNPay</option>
          </select>
        </div>

        {/* Chi tiết hoá đơn */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Chi tiết hoá đơn
          </label>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-xl overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Tên hàng</th>
                  <th className="px-4 py-2 text-left">Giá (đ)</th>
                  <th className="px-4 py-2 text-left">Số lượng</th>
                  <th className="px-4 py-2 text-center">Bán</th>
                  <th className="px-4 py-2 text-center">Xóa</th>
                </tr>
              </thead>
              <tbody>
                {chiTietHD.map((item, index) => (
                  <tr key={item.id} className="border-t">
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        placeholder="Tên hàng hoá"
                        value={item.Ten}
                        disabled
                        onChange={(e) =>
                          capNhatChiTietHD(index, "Ten", e.target.value)
                        }
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        min="0"
                        disabled
                        value={item.Gia}
                        onChange={(e) =>
                          capNhatChiTietHD(index, "Gia", e.target.value)
                        }
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        min="1"
                        disabled
                        value={item.SoLuong}
                        onChange={(e) =>
                          capNhatChiTietHD(index, "SoLuong", e.target.value)
                        }
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                      />
                    </td>
                    <td className="px-4 py-2 text-center">
                      <input
                        type="number"
                        min="1"
                        max={item.SoLuong}
                        value={item.Ban}
                        onChange={(e) =>
                          capNhatChiTietHD(index, "Ban", e.target.value)
                        }
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
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

          {/* Thêm hàng hoá */}
          <button
            type="button"
            onClick={() => setHienthem(true)}
            className="mt-4 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl shadow"
          >
            + Thêm hàng hoá
          </button>
        </div>

        {/* Nút hành động */}
        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            className="px-6 py-2 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100"
          >
            Huỷ
          </button>
          <button
            type="button"
            disabled={danggui}
            onClick={handleSubmit}
            className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl shadow"
          >
            Lưu hoá đơn
          </button>
        </div>
      </div>
      {hienthem && (
        <TimHangHoa chonHangHoa={themHangHoa} dong={() => setHienthem(false)} />
      )}
    </div>
  );
};

export default ThemHoaDon;
