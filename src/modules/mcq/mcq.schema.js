const { z } = require("zod");

const createMcqSchema = z.object({
    question: z.string().min(5),
    options: z.array(z.string().min(1)).min(2),
    correctIndex: z.number().int().nonnegative(),
    points: z.number().int().positive().optional(),
});

const updateMcqSchema = z.object({
    question: z.string().min(5).optional(),
    options: z.array(z.string().min(1)).min(2).optional(),
    correctIndex: z.number().int().nonnegative().optional(),
    points: z.number().int().positive().optional(),
});

const mcqIdParamSchema = z.object({
    mcqId: z.string().uuid("INVALID_MCQ_ID"),
});

module.exports = {
    createMcqSchema,
    updateMcqSchema,
    mcqIdParamSchema,
};
