const { z } = require("zod");

// For creating the contests all fields are mandatory
const createContestSchema = z
    .object({
        title: z.string().min(1, "TITLE_REQUIRED"),
        description: z.string().min(1, "DESCRIPTION_REQUIRED"),

        startTime: z.coerce.date({
            invalid_type_error: "INVALID_START_TIME",
        }),

        endTime: z.coerce.date({
            invalid_type_error: "INVALID_END_TIME",
        }),
    })
    .refine((data) => data.endTime > data.startTime, {
        message: "END_TIME_MUST_BE_AFTER_START_TIME",
        path: ["endTime"],
    });

// For updating the contests fields are optional.
const updateContestSchema = z
    .object({
        title: z.string().min(1, "TITLE_REQUIRED").optional(),
        description: z.string().min(1, "DESCRIPTION_REQUIRED").optional(),
        startTime: z.coerce.date().optional(),
        endTime: z.coerce.date().optional(),
    })
    .refine(
        (data) =>
            !data.startTime || !data.endTime || data.endTime > data.startTime,
        {
            message: "END_TIME_MUST_BE_AFTER_START_TIME",
            path: ["endTime"],
        },
    );
module.exports = {
    createContestSchema,
};
