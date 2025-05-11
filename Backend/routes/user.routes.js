const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First Name must be at least 3 character long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  userController.registerUser
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isLength({ min: 6 }).withMessage("Password is required"),
  ],
  userController.loginUser
);

router.get(
  "/profile",
  authMiddleware.authUser,
  userController.getUserProfile,
  (req, res) => {
    res.json(req.user);
  }
);
router.get(
  "/logout",
  authMiddleware.authUser,
  userController.logoutUser,
  (req, res) => {
    res.json({ message: "Logged out successfully" });
  }
);

module.exports = router;
