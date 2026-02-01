const ContestRegistrationService = require("./contestRegistration.service");

class ContestRegistrationController {
    static async register(req, res) {
        try {
            const contestId = req.validatedParams.contestId;
            const userId = req.user.id;

            const registration = await ContestRegistrationService.registerUser({
                userId,
                contestId,
            });

            res.status(201).json({
                success: true,
                data: registration,
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

    static async myRegistrations(req, res) {
        try {
            const registrations =
                await ContestRegistrationService.getUserRegistrations(
                    req.user.id
                );

            res.json({
                success: true,
                data: registrations,
                error: null,
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                data: null,
                error: "INTERNAL_SERVER_ERROR",
            });
        }
    }
}

module.exports = ContestRegistrationController;
