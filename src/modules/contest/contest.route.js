const express = require("express");
const ContestController = require("./contest.controller.js");
const authMiddleware = require("../../middlewares/auth.middleware.js");
const validate = require("../../utils/validate.js");
const {
    createContestSchema,
    updateContestSchema,
} = require("./contest.schema.js");

const contestRouter = express.Router();

/**
 * PUBLIC / AUTHENTICATED ROUTES
 */

// Get all contests
contestRouter.get("/", authMiddleware, ContestController.getAllContests);

// Get contest by ID
contestRouter.get("/:contestId", authMiddleware, ContestController.getContestById);

/**
 * CREATOR ONLY ROUTES
 */

// Create contest
contestRouter.post(
    "/",
    authMiddleware,
    validate(createContestSchema),
    ContestController.createContest,
);

// Update contest
contestRouter.put(
    "/:contestId",
    authMiddleware,
    validate(updateContestSchema),
    ContestController.updateContest,
);

// Delete contest
contestRouter.delete("/:contestId", authMiddleware, ContestController.deleteContest);

module.exports = contestRouter;
