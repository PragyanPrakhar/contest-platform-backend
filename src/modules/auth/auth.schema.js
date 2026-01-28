const { z } = require("zod");

const signupSchema = z.object({
    name: z.string().min(1, "NAME_REQUIRED"),
    email: z.string().email("INVALID_EMAIL"),
    password: z.string().min(8, "WEAK_PASSWORD"),
    role: z.enum(["creator", "contestee"]),
});

const loginSchema = z.object({
    email: z.string().email("INVALID_EMAIL"),
    password: z.string().min(1, "PASSWORD_REQUIRED"),
});

module.exports = {
    signupSchema,
    loginSchema,
};
