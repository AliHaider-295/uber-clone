const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const express = require("express");
const connectToDb = require("./db/db");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.routes");

const app = express();

// ✅ Correct CORS setup (before routes)
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Connect DB
connectToDb();

// ✅ Routes
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/users", userRoutes);

module.exports = app;
