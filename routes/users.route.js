import express from "express";
import {
  addNewUser,
  getUsersData,
  getLogin,
  getDeleteUser,
  getSingleUser,
  getUpdateUser,
  checkUserToken,
} from "../controllers/users.controller.js";
import { adminValidation } from "../middleware/validAdmin.middleWare.js";
import { verifyToken } from "../middleware/verifyToken.middleWare.js";
import { userValidation } from "../middleware/validUsers.middleWare.js";

const router = express.Router();

router.get("/", verifyToken, adminValidation, getUsersData);
router.post("/login", getLogin);
router.get("/checkusertoken", checkUserToken);
router.get("/:id", verifyToken, adminValidation, getSingleUser);
router.post("/", userValidation, addNewUser);
router.patch("/:id", verifyToken, adminValidation, getUpdateUser);
router.delete("/:id", verifyToken, adminValidation, getDeleteUser);

export default router;
