const { z } = require("zod");

/* BODY – CREATE */
const createDsaSchema = z.object({
    title: z.string().min(1, "TITLE_REQUIRED"),
    description: z.string().min(1, "DESCRIPTION_REQUIRED"),
    tags: z.array(z.string()).min(1, "AT_LEAST_ONE_TAG"),
    points: z.number().int().positive().optional(),
    timeLimit: z.number().int().positive().optional(),
    memoryLimit: z.number().int().positive().optional(),
    difficulty:z.enum(["EASY","MEDIUM","HARD"])
});

/* BODY – UPDATE */
const updateDsaSchema = createDsaSchema.partial();

/* PARAMS */
const contestIdParamSchema = z.object({
    contestId: z.string().uuid("INVALID_CONTEST_ID"),
});

const problemIdParamSchema = z.object({
    problemId: z.string().uuid("INVALID_PROBLEM_ID"),
});

module.exports = {
    createDsaSchema,
    updateDsaSchema,
    contestIdParamSchema,
    problemIdParamSchema,
};
