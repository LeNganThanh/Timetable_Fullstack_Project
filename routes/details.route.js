import express from "express";
import { verifyToken } from "../middleware/verifyToken.middleWare.js";
import { adminValidation } from "../middleware/validAdmin.middleWare.js";
import {
  getAddDetails,
  getAllDetails,
  getDeleteDetail,
  getSingleDetail,
  getUpdateDetails,
} from "../controllers/details.controller.js";

const router = express.Router();

router.get("/", getAllDetails);
router.get("/:id", getSingleDetail);
router.patch("/:id", verifyToken, adminValidation, getUpdateDetails);
router.post("/", verifyToken, adminValidation, getAddDetails);
router.delete("/:id", verifyToken, adminValidation, getDeleteDetail);

export default router;
