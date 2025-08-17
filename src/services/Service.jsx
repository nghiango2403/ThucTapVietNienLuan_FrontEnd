import api from "../utils/axios";

const dangnhap = (TenDangNhap, MatKhau) => {
  return api.post("/dangnhap", {
    TenDangNhap,
    MatKhau,
  });
};
const laydanhsachnhanvien = () => {
  return api.get("/laydanhsachnhanvien");
};
const themnhanvien = (
  HoTen,
  SDT,
  Email,
  NgaySinh,
  DiaChi,
  GioiTinh,
  MatKhau,
  MaChucVu
) => {
  return api.post("/themnhanvien", {
    HoTen,
    SDT,
    Email,
    NgaySinh,
    DiaChi,
    GioiTinh,
    MatKhau,
    MaChucVu,
  });
};
const suanhanvien = (
  MaNhanSu,
  HoTen,
  SDT,
  Email,
  NgaySinh,
  DiaChi,
  GioiTinh,
  MaChucVu
) => {
  return api.put(
    "/doithongtinnhanvien",
    {},
    {
      params: {
        MaNhanSu,
        HoTen,
        SDT,
        Email,
        NgaySinh,
        DiaChi,
        GioiTinh,
        MaChucVu,
      },
    }
  );
};

const laythongtinnhanvien = (MaNhanVien) => {
  return api.get(`/laythongtinchitietcuanhanvien`, {
    params: {
      MaTaiKhoan: MaNhanVien,
    },
  });
};
const laychucvu = () => {
  return api.get("/laychucvu");
};

export {
  dangnhap,
  laydanhsachnhanvien,
  themnhanvien,
  laychucvu,
  suanhanvien,
  laythongtinnhanvien,
};
