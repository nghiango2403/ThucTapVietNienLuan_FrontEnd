import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../contexts/ProtectedRoute";
import QuanLyDashboard from "../pages/quanly/QuanLyDashboard";

const QuanLyRouter = () => (
  //   <ProtectedRoute roles={["quanly"]}>
  <Routes>
    <Route path="/quanly" element={<QuanLyDashboard />} />
    {/* Thêm các route quản lý khác ở đây */}
  </Routes>
  //   </ProtectedRoute>
);

export default QuanLyRouter;
