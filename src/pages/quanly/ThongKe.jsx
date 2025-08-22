import React, { useState } from "react";
import ThongKeNhapHang from "../../components/ThongKeNhapHang";
import ThongKeBanHang from "../../components/ThongKeBanHang";
import ThongKeTonKho from "../../components/ThongKeTonKho";
import ThongKeDoanhThu from "../../components/ThongKeDoanhThu";

const ThongKe = () => {
  const [loaiThongKe, setLoaiThongKe] = useState("nhapHang");

  const renderThongKe = () => {
    switch (loaiThongKe) {
      case "nhapHang":
        return <ThongKeNhapHang />;
      case "banHang":
        return <ThongKeBanHang />;
      case "tonKho":
        return <ThongKeTonKho />;
      case "doanhThu":
        return <ThongKeDoanhThu />;
      default:
        return null;
    }
  };

  return (
    <div className="px-36 pt-5">
      <div className="mb-6">
        <label className="mr-2 font-medium">Chọn loại thống kê:</label>
        <select
          value={loaiThongKe}
          onChange={(e) => setLoaiThongKe(e.target.value)}
          className="border px-3 py-2 rounded-lg"
        >
          <option value="nhapHang">Thống kê nhập hàng</option>
          <option value="banHang">Thống kê bán hàng</option>
          <option value="tonKho">Thống kê tồn kho</option>
          <option value="doanhThu">Thống kê doanh thu</option>
        </select>
      </div>

      {renderThongKe()}
    </div>
  );
};

export default ThongKe;
