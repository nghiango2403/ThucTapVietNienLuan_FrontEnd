import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import {
  layhoadon,
  layhoadoncuanhanvien,
  xoahoadon,
} from "../../services/Service";
import XemHoaDon from "../../components/XemHoaDon";

const QuanLyHoaDon = () => {
  const location = useLocation();
  const [dsHoaDon, setDsHoaDon] = useState([]);
  const [soTrang, setSoTrang] = useState(1);
  const [trangHienTai, setTrangHienTai] = useState(0); // react-paginate tính từ 0
  const [thang, setThang] = useState(() => new Date().getMonth() + 1);
  const [nam, setNam] = useState(new Date().getFullYear());
  const [hienXem, setHienXem] = useState(false);

  const [hoadonchon, setHoadonchon] = useState({});

  useEffect(() => {
    layHoaDon();
  }, [trangHienTai]);
  const layHoaDon = async () => {
    try {
      if (location.pathname === "/nhanvien") {
        const response = await layhoadoncuanhanvien(
          trangHienTai + 1,
          thang,
          nam
        );
        setDsHoaDon(response.data.data.danhsach);
        setSoTrang(response.data.data.soTrang);
      } else {
        const response = await layhoadon(trangHienTai + 1, thang, nam);
        setDsHoaDon(response.data.data.danhsach);
        setSoTrang(response.data.data.soTrang);
      }
    } catch (error) {
      console.log(error);
      toast.error("Lấy hoá đơn thất bại");
    }
  };
  const xoaHoaDon = async (id) => {
    try {
      const response = await xoahoadon(id);
      layHoaDon();
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error("Xóa hoá đơn thất bại");
    }
  };

  const doitrang = (event) => {
    setTrangHienTai(event.selected);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen px-36">
      {/* Tiêu đề */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Quản lý hoá đơn</h1>

      {/* Thanh lọc theo tháng năm + nút */}
      <div className="flex items-center space-x-3 mb-4">
        <input
          type="number"
          placeholder="Tháng"
          value={thang}
          onChange={(e) => setThang(e.target.value)}
          className="w-28 px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
          min="1"
          max="12"
        />
        <input
          type="number"
          placeholder="Năm"
          value={nam}
          onChange={(e) => setNam(e.target.value)}
          className="w-32 px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
          min="2000"
          max="3000"
        />
        <button
          onClick={layHoaDon}
          className="px-4 py-2 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600"
        >
          Tìm
        </button>
        <Link
          to="/quanly/themhoadon"
          className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600"
        >
          + Thêm mới
        </Link>
      </div>

      {/* Bảng hoá đơn */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                STT
              </th>
              {location.pathname === "/nhanvien" ? (
                ""
              ) : (
                <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                  Nhân viên lập
                </th>
              )}

              <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                Ngày lập
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                Mã khuyến mãi
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                Hình thức thanh toán
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                Chức năng
              </th>
            </tr>
          </thead>
          <tbody>
            {dsHoaDon.length > 0 ? (
              dsHoaDon.map((hd, index) => (
                <tr
                  key={hd._id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-4 py-3 text-gray-700">
                    {index + 1 + trangHienTai * 10}
                  </td>
                  {location.pathname === "/nhanvien" ? (
                    ""
                  ) : (
                    <td className="px-4 py-3 text-blue-600 hover:underline cursor-pointer">
                      {hd.MaNhanVien.HoTen}
                    </td>
                  )}

                  <td className="px-4 py-3 text-gray-700">
                    {new Date(hd.NgayLap).toLocaleString("vi-VN")}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {hd.MaKhuyenMai || ""}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {hd.HinhThucThanhToan}
                  </td>
                  <td className="px-4 py-3 space-x-3">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => {
                        setHienXem(true);
                        setHoadonchon(hd);
                      }}
                    >
                      Xem
                    </button>
                    {!location.pathname === "/nhanvien" && (
                      <button
                        className="text-red-600 hover:underline"
                        onClick={() => xoaHoaDon(hd._id)}
                      ></button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-4 py-6 text-center text-gray-500">
                  Không có hoá đơn nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {hienXem && (
          <XemHoaDon dong={() => setHienXem(false)} hoadon={hoadonchon} />
        )}
      </div>

      <div className="flex justify-center mt-6">
        <ReactPaginate
          previousLabel={"← Trước"}
          nextLabel={"Sau →"}
          breakLabel={"..."}
          pageCount={soTrang}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={doitrang}
          containerClassName="flex items-center space-x-2"
          pageClassName="px-3 py-1 rounded-md border border-gray-300 cursor-pointer"
          activeClassName="bg-indigo-500 text-white border-indigo-500"
          previousClassName="px-3 py-1 rounded-md border border-gray-300 cursor-pointer"
          nextClassName="px-3 py-1 rounded-md border border-gray-300 cursor-pointer"
          disabledClassName="opacity-50 cursor-not-allowed"
        />
      </div>
    </div>
  );
};

export default QuanLyHoaDon;
