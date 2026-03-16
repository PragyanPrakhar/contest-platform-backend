const express = require("express");
const authMiddleware = require("../../middlewares/auth.middleware");
const validateBody = require("../../utils/validate");
const validateParams = require("../../utils/validateParams");
const isAuthorized=require("../../middlewares/isAuthorized.middleware.js")


const DsaController = require("./dsa.controller");
const {
    createDsaSchema,
    updateDsaSchema,
    contestIdParamSchema,
    problemIdParamSchema,
} = require("./dsa.schema");

const router = express.Router();

/* CREATE */
router.post(
    "/contests/:contestId/dsa",
    [authMiddleware,isAuthorized],
    validateParams(contestIdParamSchema),
    validateBody(createDsaSchema),
    DsaController.create
);

/* LIST */
router.get(
    "/contests/:contestId/dsa",
    authMiddleware,
    validateParams(contestIdParamSchema),
    DsaController.list
);

/* READ ONE */
router.get(
    "/dsa/:problemId",
    authMiddleware,
    validateParams(problemIdParamSchema),
    DsaController.getOne
);

/* UPDATE */
router.put(
    "/dsa/:problemId",
    [authMiddleware,isAuthorized],
    validateParams(problemIdParamSchema),
    validateBody(updateDsaSchema),
    DsaController.update
);

/* DELETE */
router.delete(
    "/dsa/:problemId",
    [authMiddleware,isAuthorized],
    validateParams(problemIdParamSchema),
    DsaController.delete
);

module.exports = router;
