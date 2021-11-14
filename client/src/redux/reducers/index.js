import { combineReducers } from "redux";
import KhachHangs from "./KhachHangs";
import NhanViens from "./NhanViens";
import SanPhams from "./SanPhams";
import TaiKhoans from "./TaiKhoans";
//import modal from './modal';

import KhuyenMais from './KhuyenMais'

export default combineReducers({
  KhachHangs,
  NhanViens,
  SanPhams,
  TaiKhoans,
  //  modal,
  KhuyenMais
});