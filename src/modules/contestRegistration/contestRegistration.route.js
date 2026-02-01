const express=require("express");
const contestController = require("./contestRegistration.controller.js");
const authMiddleware = require("../../middlewares/auth.middleware.js");
const validateParams=require("../../utils/validateParams.js");
const {registerContestParamsSchema}=require("./contestRegistration.schema.js")
const contestRegistrationRouter=express.Router();
contestRegistrationRouter.post("/:contestId/register",authMiddleware,validateParams(registerContestParamsSchema),contestController.register);
contestRegistrationRouter.get("/my/registrations",authMiddleware,contestController.myRegistrations);



module.exports=contestRegistrationRouter;