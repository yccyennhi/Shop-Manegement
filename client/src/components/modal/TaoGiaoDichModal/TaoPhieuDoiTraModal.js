import { Modal, Form, Input, DatePicker, Button, message } from "antd";
import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import * as actions from "../../../redux/actions";
import { hideTaoPhieuTraHangModal } from "../../../redux/actions";
import { TaoPhieuTraHangState$, CTHDsState$, PhieuDoiTrasState$, HoaDonsState$ } from "../../../redux/selectors";
import { useDispatch } from "react-redux";
import moment from "moment";
import ListSPs from "./ListSPTraHangs";
import {SearchOutlined, DeleteOutlined} from "@ant-design/icons"
import SanPhamTraHang from "./SanPhamTraHang";
//import ListSPs from "./ListSPTraHangs";
const { Search } = Input;

export default function TaoPhieuTraHang() {
  const dispatch = useDispatch();
  const CTHDs = useSelector(CTHDsState$);
  const PDTs = useSelector(PhieuDoiTrasState$);
  const HoaDons = useSelector(HoaDonsState$);
  //const NVs = useSelector(NhanVienState$);
  React.useEffect(() => {
    dispatch(actions.getCTHDs.getCTHDsRequest());
    dispatch(actions.getPhieuDoiTras.getPhieuDoiTrasRequest());
    dispatch(actions.getHoaDons.getHoaDonsRequest());
  }, [dispatch]);
  const [ListSPTraHangs, setListSP] = useState([]);
  const { isShow } = useSelector(TaoPhieuTraHangState$);
  const onClosePhieuTraHang = React.useCallback(() => {
    dispatch(hideTaoPhieuTraHangModal());
  }, [dispatch]);

  const [data, setData] = React.useState({
    MaPDT: '',
    MaHD: '',
    MaNV: '',
    idNV: '61957eace198c2fe3f3f5402',
    idHD: '',
    ThoiGian: new Date(Date.now()),
    SoLuong: 0,
    TongTien: 0,
  });
  const [textInpMaHD, setDataTextMaHD] = React.useState("");
  
  const onSearch = useCallback(() => {
    if (!textInpMaHD) return;
    CTHDs.map((e) => {
      if (e.MaHD === textInpMaHD) {
        console.log(e);
        data.MaHD = textInpMaHD;
        const cthd = {
          id: ListSPTraHangs.length,
          MaPDT: "",
          MaHD: e.MaHD,
          MaSP: e.MaSP,
          TenSP: e.TenSP,
          idSP: e.idSP,
          GiaBan: e.DonGia,
          SoLuong: e.SoLuong,
          ThoiGian: data.ThoiGian,
          SLmax: e.SoLuong,
          ThanhTien: Number(e.ThanhTien),
        };
        ListSPTraHangs.push(cthd);
        data.SoLuong += e.SoLuong;
        data.TongTien += e.ThanhTien;
        setDataTextMaHD("");
        return;
      }
    });
    if (!data.MaHD)  message.error("Không tồn tại hóa đơn: #" +textInpMaHD);
    console.log(ListSPTraHangs);
  });

  const onCancel = () => {
    setListSP([]);
    setDataTextMaHD(data.MaHD);
    setData({
      MaHD: "",
      ThoiGian: new Date(Date.now()),
      SoLuong: 0,
      TongTien: 0,
    })
  };
  const setDataPDT = (SP) => {
    data.SoLuong = data.SoLuong - ListSPTraHangs[SP.id].SoLuong + SP.SoLuong;
    data.TongTien =
      data.TongTien - ListSPTraHangs[SP.id].ThanhTien + SP.ThanhTien;
    const newList = [...ListSPTraHangs];
    newList[SP.id].SoLuong = SP.SoLuong;
    newList[SP.id].ThanhTien = SP.ThanhTien;
    setListSP(newList);
  };
  const body = (
    <>
      <Form
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 50,
        }}
        layout="horizontal"
      >
        <Form.Item
          label="Mã nhân viên"
          name="MaNV"
          rules={[{ required: true }]}
        >
          <Input
            value={data.MaNV}
            placeholder="Nhập mã nhân viên"
            style={{ width: "calc(95%)" }}
            onChange={(e) => setData({ ...data, MaNV: e.target.value })}
          />
        </Form.Item>
        <Form.Item label="Mã hóa đơn:">
          <Input
            value={textInpMaHD}
            disabled={data.MaHD}
            defaultValue = {data.MaHD}
            placeholder="Nhập mã khuyến mãi"
            onPressEnter={onSearch}
            style={{ width: "calc(60%)" }}
            onChange={(e) => setDataTextMaHD(e.target.value)}
          />
          <Button
            disabled={data.MaHD}
            type="primary"
            style={{ marginLeft: "10px" }}
            onClick={onSearch}
            icon={<SearchOutlined />}
          >
            Search
          </Button>
           <Button
            danger
            disabled={!data.MaHD}
            icon={<DeleteOutlined />}
            style={{ marginLeft: "15px" }}
            onClick={onCancel}
          /> 
        </Form.Item>
        <Form.Item label="Ngày lập:">
          <DatePicker
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            defaultValue={moment(data.ThoiGian)}
            disabled={true}
          />
        </Form.Item>
        <Form.Item>
          <h4>Danh sách sản phẩm hóa đơn: {data.MaHD} </h4>
          <ListSPs setDataPDT={setDataPDT} CTHDs={ListSPTraHangs} />
          {/* {ListSPTraHangs.map((SP) => (
            <SanPhamTraHang key={SP.id} setDataPDT={setDataPDT} SP={SP} />
          ))} */}
        </Form.Item>
        <Form.Item>
          <section
            style={{ float: "right", width: "200px", marginTop: "20px" }}
          >
            <h4 style={{ float: "left", marginRight: "10px" }}>
              Tổng số lượng <span style={{ float: "right" }}> : </span> <br />
              Tổng tiền hàng trả <span style={{ float: "right" }}>: </span>{" "}
              <br />
            </h4>
            <label>
              {data.SoLuong} <br /> {data.TongTien}
            </label>
          </section>
        </Form.Item>
      </Form>
    </>
  );

  const onSubmit = ()=>{
    if (!data.MaNV) {
      message.warning("Vui lòng thêm nhân viên");
      return;
    }
    const length = PDTs.length + 1;
    if (length < 10) {
      data.MaPDT = "PDT00" + length;
    } else if (length < 100) {
      data.MaPDT = "PDT0" + length;
    } else {
      data.MaPDT = "HD" + length;
    }
    const HD = HoaDons.find(hd => hd.MaHD === data.MaHD);
    data.idHD = HD._id
    dispatch(actions.createPhieuDoiTra.createPhieuDoiTraRequest(data));
    ListSPTraHangs.map((sp) => {
      sp.MaPDT = data.MaPDT;
      if (sp.SoLuong)
        dispatch(actions.createCTPDT.createCTPDTRequest(sp));
    });
    onCancel();
  }
  return (
    <div>
      <Modal
        title="Thêm phiếu trả hàng"
        visible={isShow}
        width={600}
        onOk = {onSubmit}
        okButtonProps={{
          disabled: !(data.MaHD),
        }}
        okText="Thêm"
        onCancel={onClosePhieuTraHang}
      >
        {body}
      </Modal>
    </div>
  );
}
