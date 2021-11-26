export const BACKEND_URL = "http://localhost:5000";
export const FRONTEND_URL = "http://localhost:3000";

export const INIT_STATE = {
  KhachHangs: {
    isLoading: false,
    data: [],
  },
  NhanViens: {
    isLoading: false,
    data: [],
  },
  SanPhams: {
    isLoading: false,
    data: [],
  },
  TaiKhoans: {
    isLoading: false,
    data: [],
  },
  KhuyenMais: {
    isLoading: false,
    data: [],
  },
  PhieuBaoHanhs: {
    isLoading: false,
    data: [],
  },
  PhieuHens: {
    isLoading: false,
    data: [],
  },
  Modal: {
    isShow: false,
  },
  TaoSanPhamModal: {
    isShow: false,
  },
  HoaDons: {
    isLoading: false,
    data: [],
  },
  data: null,
  PhieuDoiTras: {
    isLoading: false,
    data: [],
  },
  TaoHoaDonModal: {
    isShow: false,
  },
  TaoPhieuTraHangModal: {
    isShow: false,
  },
  TaoPhieuBaoHanhModal: {
    isShow: false,
  },
  TaoPhieuHenModal: {
    isShow: false,
  },

  CTHDs: {
    isLoading: false,
    data: [],
  },
  CTPDTs: {
    isLoading: false,
    data: [],
  },

  TongQuans: {
    isLoading: false,
    statistics: {
      hoaDonTodayCount: 0,
      doanhThuToday: 0,
      doiTraCount: 0,
      soLuongDT: 0,
    },
    rankingByDoanhThu: [],
    highestSanPhamList: [],
  },

  PhieuNhaps: {
    isLoading: false,
    data: [],
  },

  TaoPhieuNhapModal: {
    isShow: false,
  },
  
  ThemPhieuNhapPage: {
    ID: "",
  },
};
