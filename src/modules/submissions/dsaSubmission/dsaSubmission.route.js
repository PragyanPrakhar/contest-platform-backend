const express = require("express");
const authMiddleware = require("../../../middlewares/auth.middleware");
const validateParams = require("../../../utils/validateParams");
const validateBody = require("../../../utils/validate");

const controller = require("./dsaSubmission.controller");
const {
    problemIdParamSchema,
    submitDsaBodySchema,
} = require("./dsaSubmission.schema");

const router = express.Router();

router.post(
    "/:problemId/submit",
    authMiddleware,
    validateParams(problemIdParamSchema),
    validateBody(submitDsaBodySchema),
    controller.submit,
);

router.get("/my", authMiddleware, controller.mySubmissions);

module.exports = router;
