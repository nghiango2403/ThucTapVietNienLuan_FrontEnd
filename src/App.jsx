import { createBrowserRouter, RouterProvider } from "react-router-dom"; // thêm RouterProvider
import BoCucChinh from "./layouts/BoCucChinh";
import Login from "./pages/chung/Login";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import QuanLyDashboard from "./pages/quanly/QuanLyDashboard";
import Quanlynhanvien from "./pages/quanly/Quanlynhanvien";
import QuanLyHoaDon from "./pages/quanly/QuanLyHoaDon";
import ThemHoaDon from "./pages/quanly/ThemHoaDon";
import ThongKe from "./pages/quanly/ThongKe";
import QuanLyNhapHang from "./pages/quanly/QuanLyNhapHang";
import ThemPhieuNhapHang from "./pages/quanly/ThemPhieuNhapHang";
import QuanLyKhuyenMai from "./pages/quanly/QuanLyKhuyenMai";
import ThemKhuyenMai from "./components/ThemKhuyenMai";
import DoiMatKhau from "./pages/chung/DoiMatKhau";
import SuaThongTinTaiKhoan from "./pages/chung/SuaThongTinTaiKhoan";
import ChuyenHuong from "./pages/chung/ChuyenHuong";
import ThemHangHoa from "./components/ThemHangHoa";
import QuanLyHangHoa from "./pages/quanly/QuanLyHangHoa";

const router = createBrowserRouter([
  {
    path: "/dangnhap",
    element: <Login />,
  },
  {
    path: "/",
    element: <ChuyenHuong />,
  },
  {
    path: "/nhanvien",
    element: <BoCucChinh />,
    children: [
      { index: true, element: <QuanLyHoaDon /> },
      { path: "doimatkhau", element: <DoiMatKhau /> },
      { path: "suathongtintaikhoan", element: <SuaThongTinTaiKhoan /> },
      {
        path: "*",
        element: <div>404 Not Found</div>,
      },
    ],
  },
  {
    path: "/quanly",
    element: <BoCucChinh />,
    children: [
      { index: true, element: <QuanLyDashboard /> },
      { path: "quanlynhanvien", element: <Quanlynhanvien /> },
      { path: "quanlysanpham", element: <QuanLyHangHoa /> },
      { path: "doimatkhau", element: <DoiMatKhau /> },
      { path: "suathongtintaikhoan", element: <SuaThongTinTaiKhoan /> },
      { path: "quanlyhoadon", element: <QuanLyHoaDon /> },
      { path: "themhoadon", element: <ThemHoaDon /> },
      { path: "thongke", element: <ThongKe /> },
      { path: "quanlynhaphang", element: <QuanLyNhapHang /> },
      { path: "themphieunhaphang", element: <ThemPhieuNhapHang /> },
      { path: "quanlykhuyenmai", element: <QuanLyKhuyenMai /> },
      { path: "themkhuyenmai", element: <ThemKhuyenMai /> },
      { path: "themhanghoa", element: <ThemHangHoa /> },

      {
        path: "*",
        element: <div>404 Not Found</div>,
      },
    ],
  },
  {
    path: "*",
    element: <div>404 Not Found</div>,
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}
