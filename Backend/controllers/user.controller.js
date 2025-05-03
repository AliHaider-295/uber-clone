const userModel = require("../models/user.model");

const userService = require("../services/user.service");
const hashPassword = require("../utils/hash");

const { validationResult, body } = require("express-validator");
module.exports.registerUser = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(4000).json({ error: error.array() });

    console.log(req.body);
  }
  const { fullname, email, password } = req.body;

  const hashed = await hashPassword(req.body.password);

  const user = await userService.createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashPassword,
  });

  const token = user.generateAuthToken();
  res.status(201).json({ token, user });
};
