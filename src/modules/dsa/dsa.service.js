const { prisma } = require("../../../prisma/client");
const AppError = require("../../utils/AppError");

class DsaService {
    static async createProblem({ contestId, creatorId, data }) {
        try {
            const contest = await prisma.contest.findUnique({
                where: { id: contestId },
            });

            if (!contest) throw new AppError("CONTEST_NOT_FOUND");
            if (contest.creatorId !== creatorId)
                throw new AppError("FORBIDDEN");
            if (new Date() >= contest.startTime)
                throw new AppError("CONTEST_ALREADY_STARTED");

            return await prisma.dsaProblem.create({
                data: {
                    ...data,
                    contestId,
                },
            });
        } catch (err) {
            if (err instanceof AppError) throw err;
            // throw new AppError("DSA_PROBLEM_CREATE_FAILED");
            console.log("Error while creating the dsa question :-> ",err)
            throw err;
        }
    }

    static async getContestProblems(contestId) {
        try {
            return await prisma.dsaProblem.findMany({
                where: { contestId },
                select: {
                    id: true,
                    title: true,
                    tags: true,
                    points: true,
                    timeLimit: true,
                    memoryLimit: true,
                    createdAt: true,
                },
                orderBy: { createdAt: "asc" },
            });
        } catch (err) {
            throw new AppError("FETCH_DSA_PROBLEMS_FAILED");
        }
    }

    static async getProblemById(problemId) {
        try {
            const problem = await prisma.dsaProblem.findUnique({
                where: { id: problemId },
                include: {
                    testCases: {
                        where: { isHidden: false },
                        select: {
                            id: true,
                            input: true,
                            output: true,
                        },
                    },
                },
            });

            if (!problem) throw new AppError("PROBLEM_NOT_FOUND");
            return problem;
        } catch (err) {
            if (err instanceof AppError) throw err;
            throw new AppError("FETCH_DSA_PROBLEM_FAILED");
        }
    }

    static async updateProblem(problemId, creatorId, data) {
        try {
            const problem = await prisma.dsaProblem.findUnique({
                where: { id: problemId },
                include: { contest: true },
            });

            if (!problem) throw new AppError("PROBLEM_NOT_FOUND");
            if (problem.contest.creatorId !== creatorId)
                throw new AppError("FORBIDDEN");
            if (new Date() >= problem.contest.startTime)
                throw new AppError("CONTEST_ALREADY_STARTED");

            return await prisma.dsaProblem.update({
                where: { id: problemId },
                data,
            });
        } catch (err) {
            if (err instanceof AppError) throw err;
            throw new AppError("UPDATE_DSA_PROBLEM_FAILED");
        }
    }

    static async deleteProblem(problemId, creatorId) {
        try {
            const problem = await prisma.dsaProblem.findUnique({
                where: { id: problemId },
                include: { contest: true },
            });

            if (!problem) throw new AppError("PROBLEM_NOT_FOUND");
            if (problem.contest.creatorId !== creatorId)
                throw new AppError("FORBIDDEN");
            if (new Date() >= problem.contest.startTime)
                throw new AppError("CONTEST_ALREADY_STARTED");

            await prisma.dsaProblem.delete({
                where: { id: problemId },
            });

            return { deleted: true };
        } catch (err) {
            if (err instanceof AppError) throw err;
            throw new AppError("DELETE_DSA_PROBLEM_FAILED");
        }
    }
}

module.exports = DsaService;
