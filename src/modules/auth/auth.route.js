const { Router } = require("express");
const AuthController = require("./auth.controller.js");
const { signupSchema, loginSchema } = require("./auth.schema.js");
const validate = require("../../utils/validate.js");

const authRouter = Router();

authRouter.post("/signup", validate(signupSchema), AuthController.signup);
authRouter.post("/login", validate(loginSchema), AuthController.login);

module.exports = authRouter;
