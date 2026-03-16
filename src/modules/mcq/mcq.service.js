const { prisma } = require("../../../prisma/client");
const AppError = require("../../utils/AppError");

class McqService {
    static async createMcq({ contestId, creatorId, data }) {
        try {
            const contest = await prisma.contest.findUnique({
                where: { id: contestId },
            });

            if (!contest) throw new AppError("CONTEST_NOT_FOUND");
            if (contest.creatorId !== creatorId)
                throw new AppError("FORBIDDEN");
            if (new Date() >= contest.startTime)
                throw new AppError("CONTEST_ALREADY_STARTED");

            if (data.correctIndex >= data.options.length)
                throw new AppError("INVALID_CORRECT_INDEX");

            return await prisma.mcqQuestion.create({
                data: {
                    contestId,
                    question: data.question,
                    options: data.options,
                    correctIndex: data.correctIndex,
                    points: data.points ?? 1,
                },
            });
        } catch (err) {
            throw err;
        }
    }

    static async getContestMcqs(contestId) {
        try {
            return await prisma.mcqQuestion.findMany({
                where: { contestId },
                select: {
                    id: true,
                    question: true,
                    options: true,
                    points: true,
                    createdAt: true,
                },
                orderBy: { createdAt: "asc" },
            });
        } catch (err) {
            throw err;
        }
    }

    static async getMcqById(mcqId) {
        try {
            const mcq = await prisma.mcqQuestion.findUnique({
                where: { id: mcqId },
                select: {
                    id: true,
                    question: true,
                    options: true,
                    points: true,
                },
            });

            if (!mcq) throw new AppError("MCQ_NOT_FOUND");
            return mcq;
        } catch (err) {
            throw err;
        }
    }

    static async updateMcq(mcqId, creatorId, data) {
        try {
            const mcq = await prisma.mcqQuestion.findUnique({
                where: { id: mcqId },
                include: { contest: true },
            });

            if (!mcq) throw new AppError("MCQ_NOT_FOUND");
            if (mcq.contest.creatorId !== creatorId)
                throw new AppError("FORBIDDEN");
            if (new Date() >= mcq.contest.startTime)
                throw new AppError("CONTEST_ALREADY_STARTED");

            if (
                data.correctIndex !== undefined &&
                data.options &&
                data.correctIndex >= data.options.length
            ) {
                throw new AppError("INVALID_CORRECT_INDEX");
            }

            return await prisma.mcqQuestion.update({
                where: { id: mcqId },
                data,
            });
        } catch (err) {
            console.log("Error while updating the mcq question is :-> ",err)
            throw err;
        }
    }

    static async deleteMcq(mcqId, creatorId) {
        try {
            const mcq = await prisma.mcqQuestion.findUnique({
                where: { id: mcqId },
                include: { contest: true },
            });

            if (!mcq) throw new AppError("MCQ_NOT_FOUND");
            if (mcq.contest.creatorId !== creatorId)
                throw new AppError("FORBIDDEN");
            if (new Date() >= mcq.contest.startTime)
                throw new AppError("CONTEST_ALREADY_STARTED");

            await prisma.mcqQuestion.delete({
                where: { id: mcqId },
            });

            return { deleted: true };
        } catch (err) {
            throw err;
        }
    }
}

module.exports = McqService;
