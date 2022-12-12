import express from "express";
import { verifyToken } from "../middleware/verifyToken.middleWare.js";
import { adminValidation } from "../middleware/validAdmin.middleWare.js";
import {
  getAddTimetable,
  getDeleteTimetable,
  getTimetableData,
  getUpdateTimetable,
} from "../controllers/timetable.controller.js";

const router = express.Router();

router.get("/", getTimetableData);
router.patch("/:id", verifyToken, adminValidation, getUpdateTimetable);
router.post("/", verifyToken, adminValidation, getAddTimetable);
router.delete("/:id", verifyToken, adminValidation, getDeleteTimetable);

export default router;
