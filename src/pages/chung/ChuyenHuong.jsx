import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ChuyenHuong = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const ChucVu = localStorage.getItem("ChucVu");
    if (!ChucVu) navigate("/dangnhap");
    else if (ChucVu === "Quản lý") navigate("/quanly");
    else navigate("/nhanvien");
  }, []);
  return <div>ChuyenHuong</div>;
};

export default ChuyenHuong;
