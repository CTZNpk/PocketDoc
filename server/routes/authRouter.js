const express = require("express");
const {
  signupController,
  signinController,
  getUserController,
} = require("../controllers/authController");
const auth = require("../middlewares/auth");

const authRouter = express.Router();
authRouter.get("/", auth, getUserController);
authRouter.post("/signup", signupController);
authRouter.post("/signin", signinController);
authRouter.post("/logout", (req, res) => {
  res.clearCookie("access_token", { httpOnly: true, secure: true });
  res.clearCookie("refresh_token", { httpOnly: true, secure: true });
  return res.status(200).json({ message: "Logged out" });
});
//TODO Forget Password
module.exports = authRouter;
