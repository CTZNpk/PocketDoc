
const userModel = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.getHelloController = async (req, res) => {
  res.json({ message: "hello" });
};

exports.signupController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userExists = await userModel.findOne({ email: email });
    if (userExists) {
      return res.status(400).json({ data: "User with this email already exists" }); // Return here to stop execution
    }

    const hashedPassword = await bcryptjs.hash(password, 8); // Correct the spelling of "hashedPassword"

    let user = new userModel({
      username: username,
      email: email,
      password: hashedPassword,
      createdAt: Date.now(),
    });

    await user.save();
    const token = jwt.sign({ id: user._id }, 'passKey')
    const { password: _, ...userWithoutPassword } = user.toObject()
    res.status(200).json({ token, ...userWithoutPassword });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.signinController = async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body

    user = await userModel.findOne({ email })
    if (user) {
      const passMatch = await bcryptjs.compare(password, user.password);
      if (passMatch) {
        const token = jwt.sign({ id: user._id }, 'passKey')
        const { password: _, ...userWithoutPassword } = user.toObject()
        res.status(200).json({ token, ...userWithoutPassword });
      }
      else {
        res.status(400).json({ error: "Password Incorrect" });
      }
    }
    else {
      res.status(400).json({ error: "User Not Found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
