const DsaSubmissionService = require("./dsaSubmission.service");

class DsaSubmissionController {
    static async submit(req, res) {
        try {
            const { problemId } = req.validatedParams;
            const { code, language } = req.validatedBody;

            const submission = await DsaSubmissionService.submit({
                userId: req.user.id,
                problemId,
                code,
                language,
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
            const submissions = await DsaSubmissionService.mySubmissions(
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

module.exports = DsaSubmissionController;
