import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const leadActivityServices = {
    create: async(data) => {
        return await prisma.leadActivity.create({ data });
    },
    findOne: async(query) => {
        return await prisma.leadActivity.findFirst({ where: query })
    },
    findAll: async(query) => {
        return await prisma.leadActivity.findMany({
            where: query
        })
    },
    update: async(query, data) => {
        return await prisma.leadActivity.update({
            where: query,
            data
        })
    },
    delete: async(query) => {
        return await prisma.leadActivity.delete({
            where: query
        })
    }
}
export default leadActivityServices