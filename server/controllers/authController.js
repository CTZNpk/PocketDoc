const userModel = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateTokens");
const setAuthCookies = require("../utils/setAuthCookies");

exports.getUserController = async (req, res) => {
  console.log(req.user);
  res
    .status(200)
    .json({
      user: {
        email: req.user.email,
        id: req.user.id,
        username: req.user.username,
      },
    });
};

exports.signupController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }

    const hashedPassword = await bcryptjs.hash(password, 8);

    const user = new userModel({
      username,
      email,
      password: hashedPassword,
      createdAt: Date.now(),
    });

    await user.save();

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    setAuthCookies(res, accessToken, refreshToken);

    const { password: _, ...userWithoutPassword } = user.toObject();
    res
      .status(201)
      .json({ user: userWithoutPassword, message: "Signup successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.signinController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const passMatch = await bcryptjs.compare(password, user.password);
    if (!passMatch) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    setAuthCookies(res, accessToken, refreshToken);

    const { password: _, ...userWithoutPassword } = user.toObject();
    res
      .status(200)
      .json({ user: userWithoutPassword, message: "Signin successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
