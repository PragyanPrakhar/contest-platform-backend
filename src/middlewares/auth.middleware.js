const jwt = require("jsonwebtoken");
const prisma = require("../prisma/client");

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                data: null,
                error: "UNAUTHORIZED",
            });
        }

        const token = authHeader.split(" ")[1];

        let payload;
        try {
            payload = jwt.verify(token, process.env.JWT_SECRET);
        } catch {
            return res.status(401).json({
                success: false,
                data: null,
                error: "INVALID_TOKEN",
            });
        }

        const user = await prisma.user.findUnique({
            where: { id: payload.userId },
            select: {
                id: true,
                role: true,
            },
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                data: null,
                error: "USER_NOT_FOUND",
            });
        }

        req.user = user; // { id, role }
        next();
    } catch (err) {
        return res.status(500).json({
            success: false,
            data: null,
            error: "INTERNAL_SERVER_ERROR",
        });
    }
};


module.exports = authMiddleware;
