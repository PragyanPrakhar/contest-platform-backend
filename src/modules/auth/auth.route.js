// import { Router } from "express";
// import AuthController from "./auth.controller.js";
// import { signupSchema, loginSchema } from "./auth.schema.js";
// import validate from "../../utils/validate.js";

const {Router} = require("express");
const AuthController = require("./auth.controller.js");
const {signupSchema,loginSchema}= require("./auth.schema.js");
const validate=require("../../utils/validate.js")

const authRouter = Router();

authRouter.post("/signup", validate(signupSchema), AuthController.signup);
authRouter.post("/login", validate(loginSchema), AuthController.login);

// export default authRouter;  
module.exports=authRouter;
