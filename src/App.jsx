import { createBrowserRouter, RouterProvider } from "react-router-dom"; // thêm RouterProvider
import BoCucChinh from "./layouts/BoCucChinh";
import Login from "./pages/chung/Login";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter([
  {
    path: "/dangnhap",
    element: <Login />,
  },
  {
    path: "/nhanvien",
    element: <BoCucChinh />,
    children: [
      { index: true, element: <div>Home</div> }, // index route
      { path: "nhacungcap", element: <div>Nhà cung cấp</div> },
      { path: "nhanvien", element: <div>Nhân viên</div> },
      { path: "sach", element: <div>Sách</div> },
      { path: "khuyenmai", element: <div>Khuyến mãi</div> },
      { path: "hoadon", element: <div>Hoá đơn</div> },
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
      { index: true, element: <div>Home</div> }, // index route
      { path: "nhacungcap", element: <div>Nhà cung cấp</div> },
      { path: "nhanvien", element: <div>Nhân viên</div> },
      { path: "sach", element: <div>Sách</div> },
      { path: "khuyenmai", element: <div>Khuyến mãi</div> },
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
