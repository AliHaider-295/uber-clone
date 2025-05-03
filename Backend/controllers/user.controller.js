const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");

module.exports.registerUser = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  const { fullname, email, password } = req.body;

  try {
    const user = await userService.createUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password,
    });

    const token = user.generateAuthToken();
    res.status(201).json({ token, user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


module.exports.loginUser = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  const { email, password } = req.body;
  console.log("Login attempt - Email:", email);

  try {
    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      console.log("User not found with email:", email);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);
    console.log("Password match result:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = user.generateAuthToken();
    res
      .status(200)
      .json({ token, user: { email: user.email, fullname: user.fullname } });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
