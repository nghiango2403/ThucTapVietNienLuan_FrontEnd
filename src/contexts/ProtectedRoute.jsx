import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContextBase";

const ProtectedRoute = ({ children, roles = [] }) => {
  const context = useAuth();
  if (!context) return <div>Đang khởi tạo xác thực...</div>;

  const { user, loading } = context;

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/dangnhap" />;
  if (roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }
  return children;
};

export default ProtectedRoute;
