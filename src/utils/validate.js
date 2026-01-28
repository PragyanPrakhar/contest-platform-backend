const validate = (schema) => (req, res, next) => {
    console.log("Request Body is :-> ",req.body);
    const result = schema.safeParse(req.body);

    console.log("Resulted Data in the Validation is :-> ", result);

    if (!result.success) {
        return res.status(400).json({
            success: false,
            data: null,
            error: "INVALID_REQUEST_BODY",
        });
    }

    req.validatedBody = result.data;
    next();
};

module.exports = validate;
