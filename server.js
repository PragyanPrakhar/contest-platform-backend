const app = require("./app");
const {prisma} = require("./prisma/client");
const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        // Prisma DB check
        await prisma.$connect();
        console.log("✅ Database connected");

        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("❌ Failed to start server", error);
        process.exit(1);
    }
}

startServer();
