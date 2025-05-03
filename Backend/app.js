const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const express = require("express");
const connectToDb = require("./db/db");
const userRoutes = require("./routes/user.routes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectToDb();

app.get("/", (req, res) => {
    res.send("Hello World"); 
});

app.use('/users',userRoutes)

module.exports = app;
