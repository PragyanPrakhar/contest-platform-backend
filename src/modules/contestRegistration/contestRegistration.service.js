const { prisma } = require("../../../prisma/client.js");

class ContestRegistrationService {
    static async registerUser({ userId, contestId }) {
        const contest = await prisma.contest.findUnique({
            where: { id: contestId },
        });

        console.log("Contest Found while registration :-> ", contest);

        if (!contest) {
            throw new Error("CONTEST_NOT_FOUND");
        }

        const now = new Date();

        if (now >= contest.endTime) {
            throw new Error("CONTEST_ALREADY_ENDED");
        }

        //stop registration after contest starts
        if (now >= contest.startTime) {
            throw new Error("REGISTRATION_CLOSED");
        }

        try {
            const contestRegistration = await prisma.contestRegistration.create(
                {
                    data: {
                        userId,
                        contestId,
                    },
                }
            );

            console.log(
                "Created ContestRegistration :-> ",
                contestRegistration
            );

            return contestRegistration;
        } catch (err) {
            // Prisma unique constraint error
            if (err.code === "P2002") {
                throw new Error("ALREADY_REGISTERED");
            }

            console.log(
                "THis is the error while creating contestRegistration :-> ",
                err
            );
            throw err;
        }
    }

    static async getUserRegistrations(userId) {
        return prisma.contestRegistration.findMany({
            where: { userId },
            include: {
                contest: {
                    select: {
                        id: true,
                        title: true,
                        startTime: true,
                        endTime: true,
                    },
                },
            },
        });
    }
}

module.exports = ContestRegistrationService;
