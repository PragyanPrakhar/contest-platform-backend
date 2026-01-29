// const { prisma } = require("../../../prisma/client.js");
const {prisma} = require("../../../prisma/client.js");

class ContestService {
    static async createContest({
        title,
        description,
        startTime,
        endTime,
        creatorId,
    }) {
        // Already done in ZOD but still here for the extra saftey
        if (startTime >= endTime) {
            throw new Error("INVALID_CONTEST_TIME");
        }

        const contest = await prisma.contest.create({
            data: {
                title,
                description,
                startTime,
                endTime,
                creatorId,
            },
        });

        return contest;
    }

    static async getAllContests() {
        const contests = await prisma.contest.findMany({
            orderBy: {
                createdAt: "desc",
            },
            select: {
                id: true,
                title: true,
                description: true,
                startTime: true,
                endTime: true,
                createdAt: true,
                creator: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });

        return contests;
    }

    static async getContestById(contestId) {
        const contest = await prisma.contest.findUnique({
            where: { id: contestId },
            include: {
                mcqs: true,
                dsaProblems: true,
            },
        });

        if (!contest) {
            throw new Error("CONTEST_NOT_FOUND");
        }

        return contest;
    }

    static async updateContest(contestId, creatorId, updateData) {
        const contest = await prisma.contest.findUnique({
            where: { id: contestId },
        });

        if (!contest) {
            throw new Error("CONTEST_NOT_FOUND");
        }

        if (contest.creatorId !== creatorId) {
            throw new Error("FORBIDDEN");
        }

        // Contest already started → cannot edit
        if (new Date() >= contest.startTime) {
            throw new Error("CONTEST_ALREADY_STARTED");
        }

        const updatedContest = await prisma.contest.update({
            where: { id: contestId },
            data: updateData,
        });

        return updatedContest;
    }

    static async deleteContest(contestId, creatorId) {
        const contest = await prisma.contest.findUnique({
            where: { id: contestId },
        });

        if (!contest) {
            throw new Error("CONTEST_NOT_FOUND");
        }

        if (contest.creatorId !== creatorId) {
            throw new Error("FORBIDDEN");
        }

        if (new Date() >= contest.startTime) {
            throw new Error("CONTEST_ALREADY_STARTED");
        }

        await prisma.contest.delete({
            where: { id: contestId },
        });

        return { deleted: true };
    }
}

module.exports = ContestService;
