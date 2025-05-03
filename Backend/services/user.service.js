const userModel = require("../models/user.model");

module.exports.createUser = async ({
  firstname,
  lastname,
  email,
  password,
}) => {
  if (!firstname || !email || !password) {
    throw new Error("All fields are required");
  }

  // Check if the user already exists
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists with this email");
  }

  // Create the new user
  const user = await userModel.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
  });

  return user;
};
