const { z } = require("zod");

const mcqIdParamSchema = z.object({
    mcqId: z.string().uuid("INVALID_MCQ_ID"),
});

const submitMcqBodySchema = z.object({
    selectedIndex: z.number().int().nonnegative(),
});

module.exports = {
    mcqIdParamSchema,
    submitMcqBodySchema,
};
