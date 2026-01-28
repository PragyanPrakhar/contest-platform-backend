// import AuthService from "./auth.service.js";

const AuthService=require("./auth.service.js");

class AuthController {
    static async signup(req, res) {
        try {
            const result = await AuthService.signup(req.validatedBody);
            res.status(201).json({
                success: true,
                data: result,
                error: null,
            });
        } catch (err) {
            res.status(400).json({
                success: false,
                data: null,
                error: err.message,
            });
        }
    }

    static async login(req, res) {
        try {
            const result = await AuthService.login(req.validatedBody);
            res.status(200).json({
                success: true,
                data: result,
                error: null,
            });
        } catch (err) {
            res.status(400).json({
                success: false,
                data: null,
                error: err.message,
            });
        }
    }
}

// export default AuthController;
module.exports=AuthController;
