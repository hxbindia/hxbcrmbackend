import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const taskStatusServices = {
    create: async(data) => {
        return await prisma.taskStatus.create({ data });
    },
    findOne: async(query) => {
        return await prisma.taskStatus.findFirst({ where: query })
    },
    findAll: async(query) => {
        return await prisma.taskStatus.findMany({
            where: query
        })
    },
    update: async(query, data) => {
        return await prisma.taskStatus.update({
            where: query,
            data
        })
    },
    delete: async(query) => {
        return await prisma.taskStatus.delete({
            where: query
        })
    }
}
export default taskStatusServices