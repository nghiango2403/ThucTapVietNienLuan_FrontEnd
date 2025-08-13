import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const BoCucChinh = () => {
  return (
    <div className="w-full bg-[#f4f6fb] min-h-screen">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default BoCucChinh;
