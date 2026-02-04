const express = require("express");
const authMiddleware = require("../../../middlewares/auth.middleware");
const validateParams = require("../../../utils/validateParams");
const validateBody = require("../../../utils/validate");

const mcqSubmissionController = require("./mcqSubmission.controller");
const {
    mcqIdParamSchema,
    submitMcqBodySchema,
} = require("./mcqSubmission.schema");

const router = express.Router();

router.post(
    "/:mcqId/submit",
    authMiddleware,
    validateParams(mcqIdParamSchema),
    validateBody(submitMcqBodySchema),
    mcqSubmissionController.submit,
);

router.get("/my", authMiddleware, mcqSubmissionController.mySubmissions);

module.exports = router;
