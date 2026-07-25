import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const taskAssigneeServices = {
    create: async(data) => {
        return await prisma.taskAssignee.create({ data });
    },
    findOne: async(query) => {
        return await prisma.taskAssignee.findFirst({ where: query })
    },
    findAll: async(query) => {
        return await prisma.taskAssignee.findMany({
            where: query
        })
    },
    update: async(query, data) => {
        return await prisma.taskAssignee.update({
            where: query,
            data
        })
    },
    delete: async(query) => {
        return await prisma.taskAssignee.delete({
            where: query
        })
    }
}
export default taskAssigneeServices