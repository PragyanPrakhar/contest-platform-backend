const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./src/modules/auth/auth.route");
const contestRoutes=require("./src/modules/contest/contest.route");
const cookieParser = require("cookie-parser");

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    }),
);

// Routes
app.use("/auth", authRoutes);
app.use("/contest",contestRoutes);

module.exports = app;
