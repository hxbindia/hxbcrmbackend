import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const taskFileServices = {
    create: async(data) => {
        return await prisma.taskFile.create({ data });
    },
    findOne: async(query) => {
        return await prisma.taskFile.findFirst({ where: query })
    },
    findAll: async(query) => {
        return await prisma.taskFile.findMany({
            where: query
        })
    },
    update: async(query, data) => {
        return await prisma.taskFile.update({
            where: query,
            data
        })
    },
    delete: async(query) => {
        return await prisma.taskFile.delete({
            where: query
        })
    }
}
export default taskFileServices