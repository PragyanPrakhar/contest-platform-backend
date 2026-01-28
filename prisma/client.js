// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export default prisma;


// import "dotenv/config";
// import { PrismaPg } from '@prisma/adapter-pg'
// import { PrismaClient } from '../generated/prisma/client'
require("dotenv").config();
const {PrismaPg} = require('@prisma/adapter-pg')
const {PrismaClient} = require('@prisma/client')
const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

// export { prisma }
module.exports = {prisma};