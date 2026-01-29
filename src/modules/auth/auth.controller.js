const AuthService = require("./auth.service.js");

class AuthController {
    static async signup(req, res) {
        try {
            const result = await AuthService.signup(req.validatedBody);
            console.log("Result in the Auth Controller :-> ", result);

            res.cookie("token", result.token, {
                httpOnly: true,
                sameSite: "strict",
                secure: process.env.NODE_ENV === "production",
                maxAge: 7 * 24 * 60 * 60 * 1000
            });
            res.status(201).json({
                success: true,
                data: result.user,
                error: null,
            });

            console.log("Successfully Signed up !");
        } catch (err) {
            res.status(400).json({
                success: false,
                data: null,
                error: err.message,
            });
            console.log("Error in Sign Up is :-> ",err);
        }
    }

    static async login(req, res) {
        try {
            const result = await AuthService.login(req.validatedBody);
            res.cookie("token", result.token, {
                httpOnly: true,
                sameSite: "strict",
                secure: process.env.NODE_ENV === "production",
                maxAge: 7 * 24 * 60 * 60 * 1000
            });
            res.status(200).json({
                success: true,
                data: result.user,
                error: null,
            });
            console.log("Successfully Logged In");
        } catch (err) {
            res.status(400).json({
                success: false,
                data: null,
                error: err.message,
            });
            console.log("Error in log in is :-> ",err);
        }
    }
}

module.exports = AuthController;
