const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./src/modules/auth/auth.route");
const contestRoutes = require("./src/modules/contest/contest.route");
const contestRegistrationRoutes = require("./src/modules/contestRegistration/contestRegistration.route");
const dsaQuestionRoutes = require("./src/modules/dsa/dsa.route");
const mcqQuestionRoutes = require("./src/modules/mcq/mcq.route");
const mcqSubmissionRoutes=require("./src/modules/submissions/mcqSubmission/mcqSubmission.route");
const dsaSubmissionRoutes = require("./src/modules/submissions/dsaSubmission/dsaSubmission.route");
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
app.use("/contest", contestRoutes);
app.use("/contestRegistration", contestRegistrationRoutes);
app.use("/dsa-question", dsaQuestionRoutes);
app.use("/mcq-question", mcqQuestionRoutes);
app.use("/mcq-submission",mcqSubmissionRoutes);
app.use("/dsa-submission",dsaSubmissionRoutes);
module.exports = app;
