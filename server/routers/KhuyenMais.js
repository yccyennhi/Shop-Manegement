import express from "express";

import {
  getKhuyenMais,
  createKhuyenMai,
  updateKhuyenMai,
} from "../controllers/KhuyenMai.js";

const router = express.Router();
//http://localhost:500-/KhuyenMais

router.get("/", getKhuyenMais);
router.post("/", createKhuyenMai);
router.post("/update", updateKhuyenMai);

export default router;