import express from "express";
import {
  addContact,
  deleteContact,
  getAllContact,
  updateContact,
} from "../controllers/contact.controller.js";
import { adminValidation } from "../middleware/validAdmin.middleWare.js";
import { verifyToken } from "../middleware/verifyToken.middleWare.js";

const route = express.Router();

//get all the contact
route.get("/", getAllContact);

//add new contact
route.post("/", verifyToken, adminValidation, addContact);

//update exist contact
route.patch("/:id", verifyToken, adminValidation, updateContact);

//delete contact
route.delete("/:id", verifyToken, adminValidation, deleteContact);

export default route;
