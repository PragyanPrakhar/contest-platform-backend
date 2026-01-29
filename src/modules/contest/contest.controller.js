const ContestService = require("./contest.service.js");

class ContestController {
    // CREATE CONTEST
    static async createContest(req, res) {
        try {
            const contest = await ContestService.createContest({
                ...req.validatedBody,
                creatorId: req.user.id, // injected from token
            });

            return res.status(201).json({
                success: true,
                data: contest,
                error: null,
            });
        } catch (err) {
            return res.status(400).json({
                success: false,
                data: null,
                error: err.message,
            });
        }
    }

    // GET ALL CONTESTS
    static async getAllContests(req, res) {
        try {
            const contests = await ContestService.getAllContests();

            return res.status(200).json({
                success: true,
                data: contests,
                error: null,
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                data: null,
                error: err.message,
            });
        }
    }

    // GET CONTEST BY ID
    static async getContestById(req, res) {
        try {
            const { contestId } = req.params;

            const contest = await ContestService.getContestById(contestId);

            return res.status(200).json({
                success: true,
                data: contest,
                error: null,
            });
        } catch (err) {
            const status = err.message === "CONTEST_NOT_FOUND" ? 404 : 400;

            return res.status(status).json({
                success: false,
                data: null,
                error: err.message,
            });
        }
    }

    // UPDATE CONTEST
    static async updateContest(req, res) {
        try {
            const { contestId } = req.params;

            const updatedContest = await ContestService.updateContest(
                contestId,
                req.user.id, // auth check
                req.validatedBody,
            );

            return res.status(200).json({
                success: true,
                data: updatedContest,
                error: null,
            });
        } catch (err) {
            let status = 400;

            if (err.message === "CONTEST_NOT_FOUND") status = 404;
            if (err.message === "FORBIDDEN") status = 403;

            return res.status(status).json({
                success: false,
                data: null,
                error: err.message,
            });
        }
    }

    // DELETE CONTEST
    static async deleteContest(req, res) {
        try {
            const { contestId } = req.params;

            const result = await ContestService.deleteContest(
                contestId,
                req.user.id, // 🔐 auth check
            );

            return res.status(200).json({
                success: true,
                data: result,
                error: null,
            });
        } catch (err) {
            let status = 400;

            if (err.message === "CONTEST_NOT_FOUND") status = 404;
            if (err.message === "FORBIDDEN") status = 403;

            return res.status(status).json({
                success: false,
                data: null,
                error: err.message,
            });
        }
    }
}

module.exports = ContestController;
