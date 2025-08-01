import { Routes, Route } from "react-router-dom";
import Home from "../pages/chung/Home";
import About from "../pages/chung/About";
import Login from "../pages/chung/Login";
import Unauthorized from "../pages/chung/Unauthorized";

const CommonRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/login" element={<Login />} />
    <Route path="/unauthorized" element={<Unauthorized />} />
    {/* Thêm các route chung khác ở đây */}
  </Routes>
);

export default CommonRoutes;
