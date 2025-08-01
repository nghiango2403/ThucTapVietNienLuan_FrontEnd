import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../contexts/ProtectedRoute";
import NhanVienDashboard from "../pages/nhanvien/NhanVienDashboard";

const NhanVienRoutes = () => (
  // <ProtectedRoute roles={["nhanvien"]}>
  <Routes>
    <Route path="/nhanvien" element={<NhanVienDashboard />} />
    {/* Thêm các route nhanvien khác ở đây */}
  </Routes>
  // </ProtectedRoute>
);

export default NhanVienRoutes;
