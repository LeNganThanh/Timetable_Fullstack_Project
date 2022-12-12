import express from "express";
import {
  addAbout,
  getAbout,
  updateAbout,
} from "../controllers/about.controller.js";
import { adminValidation } from "../middleware/validAdmin.middleWare.js";
import { verifyToken } from "../middleware/verifyToken.middleWare.js";

const route = express.Router();

route.get("/", getAbout);
route.post("/", verifyToken, adminValidation, addAbout);
route.patch("/:id", verifyToken, adminValidation, updateAbout);

export default route;
