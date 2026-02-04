const { prisma } = require("../../../../prisma/client");

class DsaSubmissionService {
    static async submit({ userId, problemId, code, language }) {
        const problem = await prisma.dsaProblem.findUnique({
            where: { id: problemId },
            include: { contest: true },
        });

        if (!problem) throw new Error("PROBLEM_NOT_FOUND");

        const now = new Date();

        if (now < problem.contest.startTime)
            throw new Error("CONTEST_NOT_STARTED");

        if (now > problem.contest.endTime) throw new Error("CONTEST_ENDED");

        const registration = await prisma.contestRegistration.findUnique({
            where: {
                userId_contestId: {
                    userId,
                    contestId: problem.contestId,
                },
            },
        });

        if (!registration) throw new Error("NOT_REGISTERED");

        return prisma.dsaSubmission.create({
            data: {
                userId,
                problemId,
                code,
                language,
                status: "PENDING",
                pointsEarned: 0,
                passed: 0,
                total: 0,
                execTime: 0,
            },
        });
    }

    static async mySubmissions(userId) {
        return prisma.dsaSubmission.findMany({
            where: { userId },
            include: {
                problem: {
                    select: {
                        id: true,
                        title: true,
                        difficulty: true,
                        points: true,
                    },
                },
            },
            orderBy: { submittedAt: "desc" },
        });
    }
}

module.exports = DsaSubmissionService;
