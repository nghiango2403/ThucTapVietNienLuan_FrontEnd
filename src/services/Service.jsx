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
const mohoackhoatk = (MaTaiKhoan) => {
  return api.put(
    "/mohoackhoataikhoan",
    {},
    {
      params: {
        MaTaiKhoan,
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
const doimatkhaunv = (MaTaiKhoan, MatKhau) => {
  return api.put(
    "/doimatkhaunhanvien",
    {},
    {
      params: {
        MaTaiKhoan,
        MatKhau,
      },
    }
  );
};
const laymakhuyenmaiconhoatdong = () => {
  return api.get("/laykhuyenmaiconhoatdong");
};
const laykhuyenmaibangid = (MaKhuyenMai) => {
  return api.get("/laykhuyenmaibangid?MaKhuyenMai=" + MaKhuyenMai);
};
const timhanghoa = (Ten) => {
  return api.get("/timhanghoa?Ten=" + Ten);
};
const themhoadon = (data) => {
  return api.post("/themhoadon", data);
};
const layhoadon = (trang, thang, nam) => {
  return api.get(
    `/xemdanhsachhoadon?Trang=${trang}&Dong=10&Thang=${thang}&Nam=${nam}`
  );
};
const layhoadoncuanhanvien = (trang, thang, nam) => {
  return api.get(
    `/xemdanhsachhoadoncuanhanvien?Trang=${trang}&Dong=10&Thang=${thang}&Nam=${nam}`
  );
};
const xoahoadon = (MaHoaDon) => {
  return api.delete(`/xoahoadon`, {
    data: { MaHoaDon },
  });
};
const laychitiethoadon = (MaHoaDon) => {
  return api.get(`/xemchitiethoadon?MaHoaDon=` + MaHoaDon);
};
const kiemtratrangthaithanhtoan = (MaHoaDon) => {
  return api.get(`/kiemtratrangthaithanhtoan?MaHoaDon=` + MaHoaDon);
};
const taolaithanhtoan = (MaHoaDon) => {
  return api.post(`/taolaithanhtoan`, { MaHoaDon });
};
export {
  dangnhap,
  laydanhsachnhanvien,
  themnhanvien,
  laychucvu,
  suanhanvien,
  laythongtinnhanvien,
  mohoackhoatk,
  doimatkhaunv,
  laymakhuyenmaiconhoatdong,
  timhanghoa,
  themhoadon,
  layhoadon,
  laychitiethoadon,
  laykhuyenmaibangid,
  xoahoadon,
  kiemtratrangthaithanhtoan,
  taolaithanhtoan,
  layhoadoncuanhanvien,
};
