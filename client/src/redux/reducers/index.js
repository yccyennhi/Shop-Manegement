import { combineReducers } from "redux";
import KhachHangs from "./KhachHangs";
import NhanViens from "./NhanViens";
import SanPhams from "./SanPhams";
import TaiKhoans from "./TaiKhoans";
import HoaDons from "./HoaDons";
import KhuyenMais from './KhuyenMais'
import Modal from './Modal';
import TaoSanPhamModal from "./TaoSanPhamModal";
import UpdateSanPhamModal from "./UpdateSanPhamModal";
import PhieuBaoHanhs from "./PhieuBaoHanhs.js";
import PhieuHens from "./PhieuHens";
import PhieuDoiTras  from "./PhieuDoiTras";
import TaoHoaDonModal from "./TaoHoaDonModal";
import TaoPhieuTraHangModal  from "./TaoPhieuTraHangModal";
import TrangThaiBaoHanhCard  from "./TrangThaiBaoHanhCard";

export default combineReducers({
  KhachHangs,
  NhanViens,
  SanPhams,
  TaiKhoans,
  KhuyenMais,
  HoaDons,
  Modal,
  TaoSanPhamModal,
  UpdateSanPhamModal,
  PhieuBaoHanhs,
  PhieuHens,
  PhieuDoiTras,
  TaoHoaDonModal,
  TaoPhieuTraHangModal,
  TrangThaiBaoHanhCard,
});
