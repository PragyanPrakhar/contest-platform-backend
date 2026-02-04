const { z } = require("zod");

const problemIdParamSchema = z.object({
    problemId: z.string().uuid("INVALID_PROBLEM_ID"),
});

const submitDsaBodySchema = z.object({
    code: z.string().min(1, "CODE_REQUIRED"),
    language: z.enum(["cpp", "java", "python", "javascript"]),
});

module.exports = {
    problemIdParamSchema,
    submitDsaBodySchema,
};
