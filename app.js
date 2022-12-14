import express, { json } from "express";
import mongoose from "mongoose";
import morgan from "morgan";

//for google account
import expressSession from "express-session";
import passport from "passport";
import googleRouter from "./routes/google.route.js";
import "./controllers/google.controller.js";

// import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
dotenv.config();

import userRouter from "./routes/users.route.js";
import detailsRouter from "./routes/details.route.js";
import timetableRouter from "./routes/timetable.route.js";
import newsRouter from "./routes/news.route.js";
import holidayRouter from "./routes/holiday.route.js";
import contactRouter from "./routes/contact.routes.js";
import aboutRouter from "./routes/about.routes.js";

const app = express();
const PORT = process.env.PORT || 4000;

const MONGO_URL = process.env.MONGO_URL;
mongoose.connect(MONGO_URL, () => console.log("Connecting to database"));

//connect to frontend
/* app.use(
  cors({
    origin: "http://localhost:3000",
    exposedHeaders: ["token"],
  })
); */
app.use(morgan("dev"));
app.use(express.json());

//run html file on server
app.use(express.static("views/build"));
app.get("/", (req, res) => {
  res.sendFile("./views/build/index.html", { root: "." });
});

//setting the images folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let fullPath = "./images/";
    cb(null, fullPath);
  },
  filename: function (req, file, cb) {
    let newFilename = new Date().getTime() + "_" + file.originalname;
    cb(null, newFilename);
  },
});
const upload = multer({ storage: storage });
app.use(express.static("images"));

//routes
app.use("/users", userRouter);
app.use("/details", upload.single("image"), detailsRouter);
app.use("/timetable", timetableRouter);
app.use("/news", newsRouter);
app.use("/holiday", holidayRouter);
app.use("/contact", contactRouter);
app.use("/about", aboutRouter);

//google implements
app.use(expressSession({ secret: "googlesecret" }));
app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", googleRouter);

//error handle
app.use((req, res, next) => {
  res.sendFile("./views/pageNotFound.html", { root: "." });
});
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ success: false, message: err.message });
});

//Listen to port4000
app.listen(PORT, () => console.log("server is running on port ", PORT));
