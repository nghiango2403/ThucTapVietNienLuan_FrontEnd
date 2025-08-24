import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { laykhuyenmai } from "../../services/Service";
import SuaKhuyenMai from "../../components/SuaKhuyenMai";

const QuanLyKhuyenMai = () => {
  const [dsKhuyenMai, setDsKhuyenMai] = useState([]);
  const [soTrang, setSoTrang] = useState(1);
  const [trangHienTai, setTrangHienTai] = useState(0);
  const [hiensua, setHienSua] = useState(false);
  const [khuyenmai, setKhuyenmai] = useState({});

  useEffect(() => {
    layDanhSachKhuyenMai();
  }, [trangHienTai]);

  const layDanhSachKhuyenMai = async () => {
    try {
      const response = await laykhuyenmai(trangHienTai + 1);
      setDsKhuyenMai(response.data.data.danhsach);
      setSoTrang(response.data.data.sotrang);
    } catch (error) {
      console.log(error);
      toast.error("Lấy khuyến mãi thất bại");
    }
  };

  const doitrang = (event) => {
    setTrangHienTai(event.selected);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen px-36">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Quản lý khuyến mãi
      </h1>
      <div className="flex items-center space-x-3 mb-4">
        <Link
          to="/quanly/themkhuyenmai"
          className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600"
        >
          + Thêm mới
        </Link>
      </div>
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                STT
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                Tên khuyến mãi
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                Ngày bắt đầu
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                Ngày kết thúc
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                Tiền khuyến mãi
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                Điều kiện áp dụng
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                Chức năng
              </th>
            </tr>
          </thead>
          <tbody>
            {dsKhuyenMai.length > 0 ? (
              dsKhuyenMai.map((km, index) => (
                <tr
                  key={km._id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-4 py-3 text-gray-700">
                    {index + 1 + trangHienTai * 10}
                  </td>
                  <td className="px-4 py-3 text-gray-700">{km.TenKhuyenMai}</td>
                  <td className="px-4 py-3 text-gray-700">
                    {new Date(km.NgayBatDau).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {new Date(km.NgayKetThuc).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {km.TienKhuyenMai.toLocaleString("vi-VN")} ₫
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {km.DieuKien.toLocaleString("vi-VN")} ₫
                  </td>
                  <td className="px-4 py-3 space-x-3">
                    <button
                      onClick={() => {
                        setKhuyenmai(km);
                        setHienSua(true);
                      }}
                      className="text-blue-600 hover:underline"
                    >
                      Sửa
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-4 py-6 text-center text-gray-500">
                  Không có khuyến mãi nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {hiensua && (
          <SuaKhuyenMai
            khuyenmai={khuyenmai}
            dong={() => {
              setHienSua(false);
              layDanhSachKhuyenMai();
            }}
          />
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

export default QuanLyKhuyenMai;
