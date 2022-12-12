import express from "express";
import {
  getAddNews,
  getDeleteNews,
  getNews,
  getUpdateNews,
} from "../controllers/news.controller.js";
import { adminValidation } from "../middleware/validAdmin.middleWare.js";
import { verifyToken } from "../middleware/verifyToken.middleWare.js";
const router = express.Router();

router.get("/", getNews);
router.post("/", verifyToken, adminValidation, getAddNews);
router.patch("/:id", verifyToken, adminValidation, getUpdateNews);
router.delete("/:id", verifyToken, adminValidation, getDeleteNews);

export default router;
