const McqService = require("./mcq.service");

class McqController {
    static async create(req, res) {
        try {
            console.log("Params while creating the mcq is :-> ",req.validatedParams);

            const mcq = await McqService.createMcq({
                contestId: req.validatedParams.contestId,
                creatorId: req.user.id,
                data: req.validatedBody,
            });

            return res.status(201).json({
                success: true,
                data: mcq,
                error: null,
            });
        } catch (err) {
            return res.status(400).json({
                success: false,
                data: null,
                error: err.code || "INTERNAL_SERVER_ERROR",
            });
        }
    }

    static async getContestMcqs(req, res) {
        try {
            const mcqs = await McqService.getContestMcqs(req.params.contestId);

            return res.json({
                success: true,
                data: mcqs,
                error: null,
            });
        } catch (err) {
            return res.status(400).json({
                success: false,
                data: null,
                error: err.code,
            });
        }
    }

    static async getById(req, res) {
        try {
            const mcq = await McqService.getMcqById(req.validatedParams.mcqId);

            return res.json({
                success: true,
                data: mcq,
                error: null,
            });
        } catch (err) {
            return res.status(404).json({
                success: false,
                data: null,
                error: err.code,
            });
        }
    }

    static async update(req, res) {
        try {
            console.log("Req while updating the params in update mcq  is :-> ",req)
            const mcq = await McqService.updateMcq(
                req.params.mcqId,
                req.user.id,
                req.body,
            );

            return res.json({
                success: true,
                data: mcq,
                error: null,
            });
        } catch (err) {
            return res.status(400).json({
                success: false,
                data: null,
                error: err.code,
            });
        }
    }

    static async delete(req, res) {
        try {
            const result = await McqService.deleteMcq(
                req.params.mcqId,
                req.user.id,
            );

            return res.json({
                success: true,
                data: result,
                error: null,
            });
        } catch (err) {
            return res.status(400).json({
                success: false,
                data: null,
                error: err.code,
            });
        }
    }
}

module.exports = McqController;
