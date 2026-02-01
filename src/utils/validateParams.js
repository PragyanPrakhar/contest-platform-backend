const validateParams = (schema) => (req, res, next) => {
    
    const result = schema.safeParse(req.params);
    console.log("request params in validateParams.js is :-> ",result);

    if (!result.success) {
        return res.status(400).json({
            success: false,
            data: null,
            error: result.error.flatten(),
        });
    }

    req.validatedParams = result.data;
    next();
};

module.exports=validateParams;