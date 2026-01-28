const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./src/modules/auth/auth.route");

const app = express();

// Middlewares
app.use(express.json());

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    }),
);

// Routes
app.use("/auth", authRoutes);

module.exports = app;
