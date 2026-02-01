const { z } = require("zod");

const registerContestParamsSchema = z.object({
    contestId: z.string().uuid("INVALID_CONTEST_ID"),
});

module.exports = {
    registerContestParamsSchema,
};
