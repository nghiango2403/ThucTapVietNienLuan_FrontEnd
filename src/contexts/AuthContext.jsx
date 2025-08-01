import { useState } from "react";
import { AuthContext } from "./AuthContextBase";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = (data) => {
    setLoading(true);
    // Giả lập xử lý bất đồng bộ, ví dụ gọi API
    setTimeout(() => {
      setUser(data);
      setLoading(false);
    }, 500);
  };

  const logout = () => {
    setLoading(true);
    setTimeout(() => {
      setUser(null);
      setLoading(false);
    }, 300);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
