import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const taskPriorityServices = {
    create: async(data) => {
        return await prisma.taskPriority.create({ data });
    },
    findOne: async(query) => {
        return await prisma.taskPriority.findFirst({ where: query })
    },
    findAll: async(query) => {
        return await prisma.taskPriority.findMany({
            where: query
        })
    },
    update: async(query, data) => {
        return await prisma.taskPriority.update({
            where: query,
            data
        })
    },
    delete: async(query) => {
        return await prisma.taskPriority.delete({
            where: query
        })
    }
}
export default taskPriorityServices