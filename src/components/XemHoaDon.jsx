import React, { useEffect, useState } from "react";
import {
  kiemtratrangthaithanhtoan,
  laychitiethoadon,
  laykhuyenmaibangid,
  taolaithanhtoan,
} from "../services/Service";

const XemHoaDon = ({ hoadon, dong }) => {
  const [ChiTietHD, setChiTietHD] = useState([]);
  const [khuyenmai, setKhuyenmai] = useState({});
  const [trangthaithanhtoan, settrangthaithanhtoan] = useState("");
  useEffect(() => {
    const layChiTietHoaDon = async () => {
      try {
        const response = await laychitiethoadon(hoadon._id);
        if (hoadon.HinhThucThanhToan != "Trực tiếp") {
          const a = await kiemtratrangthaithanhtoan(hoadon._id);
          settrangthaithanhtoan(a.data.data);
        }
        setChiTietHD(response.data.data);
      } catch (e) {
        console.log(e);
      }
    };
    const layKhuyenMaiBangId = async () => {
      try {
        const response = await laykhuyenmaibangid(hoadon.MaKhuyenMai);
        setKhuyenmai(response.data.data);
      } catch (e) {
        console.log(e);
      }
    };

    layChiTietHoaDon();
    if (hoadon.MaKhuyenMai) {
      layKhuyenMaiBangId();
    }
  }, []);
  const taoLaiThanhToan = async () => {
    try {
      const response = await taolaithanhtoan(hoadon._id);
      if (response.data.status == 201) {
        window.open(response.data.data.url);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { MaKhuyenMai, HinhThucThanhToan } = hoadon;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-xl font-bold text-gray-800">Chi tiết hóa đơn</h2>
          <button
            onClick={dong}
            className="text-gray-500 hover:text-gray-700 font-bold text-lg"
          >
            ✕
          </button>
        </div>

        {/* Thông tin chung */}
        <div className="mb-4">
          <p>
            <span className="font-semibold">Hình thức thanh toán:</span>{" "}
            {HinhThucThanhToan}
          </p>
          <p>
            <span className="font-semibold">Khuyến mãi:</span>{" "}
            {khuyenmai && khuyenmai.TenKhuyenMai
              ? `${khuyenmai.TenKhuyenMai} (${khuyenmai.TienKhuyenMai} đ) (hoá đơn từ ${khuyenmai.DieuKien} đ)`
              : "Không áp dụng"}
          </p>
        </div>

        {/* Bảng chi tiết */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-xl overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Tên hàng</th>
                <th className="px-4 py-2 text-center">Giá (đ)</th>
                <th className="px-4 py-2 text-center">Số lượng</th>
                <th className="px-4 py-2 text-center">Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {ChiTietHD.map((item, i) => (
                <tr key={i} className="border-t">
                  <td className="px-4 py-2">{item.MaHangHoa.Ten}</td>
                  <td className="px-4 py-2 text-center">
                    {item.DonGia?.toLocaleString()}
                  </td>
                  <td className="px-4 py-2 text-center">{item.SoLuong}</td>
                  <td className="px-4 py-2 text-center">
                    {(item.DonGia * item.SoLuong)?.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {trangthaithanhtoan == "" ? (
          ""
        ) : (
          <div className="mt-4 text-lg font-bold text-green-600">
            Trạng thái thanh toán:{" "}
            <span className="text-red-600">{trangthaithanhtoan}</span>
            {trangthaithanhtoan != "Thành công" && (
              <button
                onClick={taoLaiThanhToan}
                className="px-6 py-2 rounded-xl border ml-4 border-gray-300 bg-green-400 text-white hover:bg-green-500"
              >
                Tạo lại
              </button>
            )}
          </div>
        )}

        {/* Tổng tiền */}
        <div className="text-right mt-4 text-lg font-bold text-green-600">
          {/* Tổng cộng: {TongTien.toLocaleString()} đ */}
          Tổng cộng:{" "}
          {(
            ChiTietHD.reduce(
              (sum, item) => sum + (item.DonGia || 0) * (item.SoLuong || 0),
              0
            ) - (khuyenmai?.TienKhuyenMai || 0)
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

export default XemHoaDon;
