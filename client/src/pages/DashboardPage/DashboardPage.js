import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import {
  Layout,
  Space,
  PageHeader,
  Row,
  Col,
  Card,
  List,
  Avatar,
  Result,
} from "antd";
import { AuthContext } from "../../contexts/AuthContext";
import TodayReportOverall from "../../components/Dashboard/TodayReportOverall";
import DemoColumn from "../../components/chart/DashboardColumnReport";
import { Content, Header } from "antd/lib/layout/layout";
import { useDispatch, useSelector } from "react-redux";
import {
  HoaDonsState$,
  NhanViensState$,
  PhieuNhapsState$,
  isloadingTongQuansState$,
} from "../../redux/selectors";
import * as actions from "../../redux/actions";
import { HighestSanPhamList } from "../../components/Dashboard/highestSanPhamList";
import Menubar from "../../components/header/Menubar/Menubar";
import moment from "moment";
import { DollarOutlined, ImportOutlined } from "@ant-design/icons";

export default function KhuyenMaiPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const HoaDons = useSelector(HoaDonsState$);
  const PhieuNhaps = useSelector(PhieuNhapsState$);
  const NhanViens = useSelector(NhanViensState$);
  const loadingData = useSelector(isloadingTongQuansState$);
  const [HD, setHD] = useState(HoaDons);
  const [PN, setPN] = useState(PhieuNhaps);

  React.useEffect(() => {
    dispatch(actions.getPhieuNhaps.getPhieuNhapsRequest());
    dispatch(actions.getHoaDons.getHoaDonsRequest());
    dispatch(actions.getTongQuans.getDataRequest());
    dispatch(actions.getNhanViens.getNhanViensRequest());
  }, [dispatch]);

  React.useEffect(() => {
    const listHD = HoaDons.sort((a, b) =>
      moment(a.createdAt) < moment(b.createdAt) ? 1 : -1
    );
    const listPN = PhieuNhaps.sort((a, b) =>
      moment(a.createdAt) < moment(b.createdAt) ? 1 : -1
    );

    setHD(listHD);
    setPN(listPN);
  }, [dispatch, HoaDons, PhieuNhaps]);

  const {
    authState: { TaiKhoan },
  } = useContext(AuthContext);
  if (TaiKhoan.TenTK != "ADMIN") {
    history.push("/Sales");
    return (
      <Result
        className="error-page"
        status="error"
        title="Hạn chế quyền truy cập"
        subTitle="Vui lòng kiểm tra lại đường link hoặc tài khoản đăng nhập!"
      />
    );
  }
  return (
    <Layout>
      <Header>
        <Menubar />
      </Header>
      <PageHeader
        onBack={() => window.history.back()}
        className="site-page-header"
        title="Tổng quan"
      />
      <Content style={{ padding: "0px 50px" }}>
        <div className="site-layout-content-2">
          <Row>
            <Col span={18}>
              <Space
                direction="vertical"
                size="large"
                style={{ width: "100%", padding: "0px 24px 0px 0px" }}
              >
                <TodayReportOverall />
                <DemoColumn loadingData={loadingData} />
                <HighestSanPhamList loadingData={loadingData} />
              </Space>
            </Col>
            <Col span={6}>
              <Space
                direction="vertical"
                size="large"
                style={{
                  width: "100%",
                  height: "100%",
                  padding: "15px 24px 0px 0px",
                }}
              >
                <Card title="Đơn hàng gần đây">
                  <List
                    pagination={{
                      onChange: (page) => {
                        console.log(page);
                      },
                      //defaultPageSize:5,
                      showSizeChanger: false,

                      pageSize: 5,
                      size: "small",
                    }}
                    itemLayout="horizontal"
                    dataSource={HoaDons}
                    renderItem={(item) => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={
                            <Avatar
                              style={{ backgroundColor: "#87d068" }}
                              icon={<DollarOutlined />}
                            />
                          }
                          title={
                            <a>
                              {
                                NhanViens.find((data) => data.MaNV == item.MaNV)
                                  ?.TenNV
                              }{" "}
                              vừa bán đơn hàng {item.MaHD} trị giá{" "}
                              {`${item.ThanhTien}`.replace(
                                /\B(?=(\d{3})+(?!\d))/g,
                                ","
                              )}{" "}
                              VNĐ
                            </a>
                          }
                          description={
                            <>
                              Ngày {moment(item.createdAt).format("DD/MM/YYYY")}{" "}
                              lúc {moment(item.createdAt).format("HH:mm")}{" "}
                            </>
                          }
                        />
                      </List.Item>
                    )}
                  />
                </Card>
                <Card title="Nhập hàng gần đây">
                  <List
                    pagination={{
                      onChange: (page) => {
                        console.log(page);
                      },
                      showSizeChanger: false,
                      pageSize: 5,
                      size: "small",
                    }}
                    itemLayout="horizontal"
                    dataSource={PhieuNhaps.filter((data) => data != "Đã hủy")}
                    renderItem={(item) => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={
                            <Avatar
                              style={{ backgroundColor: "#f56a00" }}
                              icon={<ImportOutlined />}
                            />
                          }
                          title={
                            <a>
                              {item.NguoiTao}{" "}
                              {item.TrangThai == "Phiếu tạm"
                                ? "vừa tạo phiếu tạm"
                                : "vừa nhập đơn hàng"}{" "}
                              {item.MaPN}
                            </a>
                          }
                          description={
                            <>
                              Ngày {moment(item.createdAt).format("DD/MM/YYYY")}{" "}
                              lúc {moment(item.createdAt).format("HH:mm")}{" "}
                            </>
                          }
                        />
                      </List.Item>
                    )}
                  />
                </Card>
              </Space>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
}
