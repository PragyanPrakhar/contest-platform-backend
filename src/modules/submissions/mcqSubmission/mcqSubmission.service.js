const { prisma } = require("../../../../prisma/client");

class McqSubmissionService {
    static async submit({ userId, mcqId, selectedIndex }) {
        const mcq = await prisma.mcqQuestion.findUnique({
            where: { id: mcqId },
            include: { contest: true },
        });

        if (!mcq) throw new Error("MCQ_NOT_FOUND");

        const now = new Date();
        console.log("Now's time is :-> " + now);

        if (now < mcq.contest.startTime) throw new Error("CONTEST_NOT_STARTED");

        console.log("Start Time of the Contest is :-> " + mcq.contest.startTime);

        if (now > mcq.contest.endTime) throw new Error("CONTEST_ENDED");

        console.log("End time of the contest is :-> " + mcq.contest.startTime)

        const registration = await prisma.contestRegistration.findUnique({
            where: {
                userId_contestId: {
                    userId,
                    contestId: mcq.contestId,
                },
            },
        });

        if (!registration) throw new Error("NOT_REGISTERED");

        const isCorrect = selectedIndex === mcq.correctIndex;
        const pointsEarned = isCorrect ? mcq.points : 0;

        try {
            return await prisma.mcqSubmission.create({
                data: {
                    userId,
                    questionId: mcqId,
                    selectedIndex,
                    isCorrect,
                    pointsEarned,
                },
            });
        } catch (err) {
            if (err.code === "P2002") {
                throw new Error("ALREADY_SUBMITTED");
            }
            throw err;
        }
    }

    static async mySubmissions(userId) {
        return prisma.mcqSubmission.findMany({
            where: { userId },
            include: {
                question: {
                    select: {
                        id: true,
                        question: true,
                        points: true,
                    },
                },
            },
            orderBy: { submittedAt: "desc" },
        });
    }
}

module.exports = McqSubmissionService;
