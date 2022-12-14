import express from "express";
import passport from "passport";

const router = express.Router();

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "success",
      user: req.user,
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  req.logout(err => {
    if (err) {
      return res.send(err.message);
    } else {
      res.redirect("/");
    }
  });
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  if (req.user) {
    // res.json({ success: "OK", user: req.user });
    res.redirect("/");
  }
});

export default router;
