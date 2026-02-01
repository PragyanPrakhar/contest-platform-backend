const DsaService = require("./dsa.service");

class DsaController {
    static async create(req, res) {
        try {
            const { contestId } = req.validatedParams;
            const problem = await DsaService.createProblem({
                contestId,
                creatorId: req.user.id,
                data: req.validatedBody,
            });

            res.status(201).json({
                success: true,
                data: problem,
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

    static async list(req, res) {
        try {
            const { contestId } = req.validatedParams;

            const problems = await DsaService.getContestProblems(contestId);

            res.json({
                success: true,
                data: problems,
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

    static async getOne(req, res) {
        try {
            const { problemId } = req.validatedParams;

            const problem = await DsaService.getProblemById(problemId);

            res.json({
                success: true,
                data: problem,
                error: null,
            });
        } catch (err) {
            res.status(404).json({
                success: false,
                data: null,
                error: err.message,
            });
        }
    }

    static async update(req, res) {
        try {
            const { problemId } = req.validatedParams;

            const updated = await DsaService.updateProblem(
                problemId,
                req.user.id,
                req.validatedBody
            );

            res.json({
                success: true,
                data: updated,
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

    static async delete(req, res) {
        try {
            const { problemId } = req.validatedParams;

            const result = await DsaService.deleteProblem(
                problemId,
                req.user.id
            );

            res.json({
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

module.exports = DsaController;
