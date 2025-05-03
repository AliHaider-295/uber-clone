const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  fullname: {
    firstname: { type: String, required: true, minlength: 3 },
    lastname: { type: String, minlength: 3 },
  },
  email: { type: String, required: true, unique: true, minlength: 5 },
  password: { type: String, required: true, select: false },
  socketId: { type: String },
});

// Generate Auth Token
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.jwt_SECRET);
  return token;
};

// Compare Password (Hashing & Matching)
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Hash password before saving user


userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10); // hash the password
  next();
});


const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
