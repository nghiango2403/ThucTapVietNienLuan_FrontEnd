import { BrowserRouter } from "react-router-dom";
import CommonRoutes from "./routers/CommonRoutes";
import NhanVienRoutes from "./routers/NhanVienRoutes";
import QuanLyRouter from "./routers/QuanLyRouter";

function App() {
  return (
    <BrowserRouter>
      <CommonRoutes />
      <NhanVienRoutes />
      <QuanLyRouter />
    </BrowserRouter>
  );
}

export default App;
