import React, { useState } from "react";
import { Table, Input, Row } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";

const { Search } = Input;

function BanHangtable({ currentDataSource }) {
  const dataSource = currentDataSource?Array.from(currentDataSource, (HoaDon) => ({
    ...HoaDon[1],
    ThoiGian: HoaDon[0]
  })) : null;

  const columns = [
    {
      title: "Thời gian",
      dataIndex: "ThoiGian",
      key: "ThoiGian",
      render: (date) => {
        return <p>{moment(date).format("DD/MM/YYYY")}</p>;
      },
      sorter: (a, b) => a.ThoiGian - b.ThoiGian,
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <Search
            allowClear
            autoFocus
            placeholder="Nhập ngày cần tìm"
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
              confirm({ closeDropdown: false });
            }}
            onPressEnter={() => {
              confirm();
            }}
            onBlur={() => {
              confirm();
            }}
            onSearch={() => {
              confirm();
            }}
          ></Search>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.MaKM.toLowerCase().includes(value.toLowerCase());
      },
    },

    {
      title: "Số lượng đơn",
      dataIndex: "SoLuong",
      key: "SoLuong",
      sorter: (a, b) => a.SoLuong - b.SoLuong,
    },

    {
      title: "Tổng tiền hàng",
      dataIndex: "TongTienHang",
      key: "TongTienHang",
      sorter: (a, b) => a.TongTienHang - b.TongTienHang,
    },

    {
      title: "Giảm giá",
      dataIndex: "GiamGia",
      key: "GiamGia",
      sorter: (a, b) => a.GiamGia - b.GiamGia,
    },

    {
      title: "Thành tiền",
      dataIndex: "ThanhTien",
      key: "ThanhTien",
      sorter: (a, b) => a.ThanhTien - b.ThanhTien,
    },
    {
      title: "Lợi nhuận",
      dataIndex: "LoiNhuan",
      key: "LoiNhuan",
      sorter: (a, b) => a.LoiNhuan - b.LoiNhuan,
    },
  ];

  const [select, setSelect] = useState({
    selectedRowKeys: [],
    loading: false,
  });

  const { selectedRowKeys, loading } = select;

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys) => {
      setSelect({
        ...select,
        selectedRowKeys: selectedRowKeys,
      });
    },
  };

  return (
    <div>
      <Table
        tableLayout={"auto"}
        loading={false}
        pagination={true}
        //  scroll={{ x: 1500, y: 500 }}
        columns={columns}
        rowKey="ThoiGian"
        dataSource={dataSource}
      ></Table>
    </div>
  );
}

export default BanHangtable;
