import express from "express";
import {
  addHoliday,
  getHoliday,
  updateHoliday,
} from "../controllers/holiday.controller.js";
import { adminValidation } from "../middleware/validAdmin.middleWare.js";
import { verifyToken } from "../middleware/verifyToken.middleWare.js";

const route = express.Router();

//get all the holiday info
route.get("/", getHoliday);

//add holiday info
route.post("/", verifyToken, adminValidation, addHoliday);

//update existed holiday
route.patch("/:id", verifyToken, adminValidation, updateHoliday);

export default route;
