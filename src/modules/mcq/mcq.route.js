const express = require("express");
const McqController = require("./mcq.controller");
const auth = require("../../middlewares/auth.middleware");
const validate = require("../../utils/validate");
const { createMcqSchema, updateMcqSchema ,mcqIdParamSchema} = require("./mcq.schema");
const {contestIdParamSchema} = require("../dsa/dsa.schema");
const validateParams = require("../../utils/validateParams");

const router = express.Router();

router.post(
    "/contest/:contestId",
    auth,
    validateParams(contestIdParamSchema),
    validate(createMcqSchema),
    McqController.create,
);

router.get("/contest/:contestId", auth,validateParams(contestIdParamSchema), McqController.getContestMcqs);

router.get("/:mcqId", auth,validateParams(mcqIdParamSchema), McqController.getById);

router.patch("/:mcqId", auth, validate(updateMcqSchema),validateParams(mcqIdParamSchema), McqController.update);

router.delete("/:mcqId", auth,validateParams(mcqIdParamSchema), McqController.delete);

module.exports = router;
