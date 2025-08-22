import { createBrowserRouter, RouterProvider } from "react-router-dom"; // thêm RouterProvider
import BoCucChinh from "./layouts/BoCucChinh";
import Login from "./pages/chung/Login";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import QuanLyDashboard from "./pages/quanly/QuanLyDashboard";
import Quanlynhanvien from "./pages/quanly/Quanlynhanvien";
import QuanLyHoaDon from "./pages/quanly/QuanLyHoaDon";
import ThemHoaDon from "./pages/quanly/ThemHoaDon";

const router = createBrowserRouter([
  {
    path: "/dangnhap",
    element: <Login />,
  },
  {
    path: "/nhanvien",
    element: <BoCucChinh />,
    children: [
      { index: true, element: <QuanLyHoaDon /> },
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
      { index: true, element: <QuanLyDashboard /> }, // index route
      { path: "nhacungcap", element: <div>Nhà cung cấp</div> },
      { path: "quanlynhanvien", element: <Quanlynhanvien /> },
      { path: "quanlysanpham", element: <div>sản phẩm</div> },
      { path: "khuyenmai", element: <div>Khuyến mãi</div> },
      { path: "quanlyhoadon", element: <QuanLyHoaDon /> },
      { path: "themhoadon", element: <ThemHoaDon /> },
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
