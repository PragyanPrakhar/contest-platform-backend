// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import prisma from "../../../prisma/client.js";

const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");
const {prisma} = require("../../../prisma/client.js");

const JWT_SECRET = process.env.JWT_SECRET;

class AuthService {
    static async signup({ name, email, password, role }) {
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            throw new Error("USER_ALREADY_EXISTS");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role,
            },
        });

        const token = jwt.sign(
            { userId: user.id, role: user.role },
            JWT_SECRET,
            { expiresIn: "7d" },
        );

        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token,
        };
    }

    static async login({ email, password }) {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            throw new Error("INVALID_CREDENTIALS");
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            throw new Error("INVALID_CREDENTIALS");
        }

        const token = jwt.sign(
            { userId: user.id, role: user.role },
            JWT_SECRET,
            { expiresIn: "7d" },
        );

        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token,
        };
    }
}

// export default AuthService;
module.exports=AuthService;
