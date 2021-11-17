import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        MaHD: {
            type: String,
            required: true,
        },
        MaSP: {
            type: Array,
            required: true,
        },
        MaNV: {
            type: String,
            required: true,
        },
        MaKM: {
            type: String,
            required: false,
        },
        MaKH: {
            type: String,
            required: false,
        },
        DiemTru: {
            type: Number,
            required: false,
            default: 0,
        },
        TongTienHang: {
            type: Number,
            required: true,
        },
        ThanhTien: {
            type: Number,
            required: true,
        },
        ThoiGian: {
            type: Date,
            required: true,
        }
    },
    { timestamps: true }
);
export const HoaDonModel = mongoose.model("HoaDon", schema);
