const isAuthorized = (req, res, next) => {
    if (req.user.role !== "CREATOR") {
        return res.status(403).json({
            success: false,
            error: "FORBIDDEN",
        });
    }
    next();
};

module.exports=isAuthorized;