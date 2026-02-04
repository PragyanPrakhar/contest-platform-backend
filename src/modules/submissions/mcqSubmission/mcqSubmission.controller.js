const McqSubmissionService = require("./mcqSubmission.service");

class McqSubmissionController {
    static async submit(req, res) {
        try {
            const { mcqId } = req.validatedParams;
            const { selectedIndex } = req.validatedBody;
            const userId = req.user.id;

            const submission = await McqSubmissionService.submit({
                userId,
                mcqId,
                selectedIndex,
            });

            res.status(201).json({
                success: true,
                data: submission,
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

    static async mySubmissions(req, res) {
        try {
            const submissions = await McqSubmissionService.mySubmissions(
                req.user.id,
            );

            res.json({
                success: true,
                data: submissions,
                error: null,
            });
        } catch {
            res.status(500).json({
                success: false,
                data: null,
                error: "INTERNAL_SERVER_ERROR",
            });
        }
    }
}

module.exports = McqSubmissionController;
