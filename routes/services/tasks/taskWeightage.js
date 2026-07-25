import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const taskWeightageServices = {
    create: async(data) => {
        return await prisma.taskWeightage.create({ data });
    },
    findOne: async(query) => {
        return await prisma.taskWeightage.findFirst({ where: query })
    },
    findAll: async(query) => {
        return await prisma.taskWeightage.findMany({
            where: query
        })
    },
    update: async(query, data) => {
        return await prisma.taskWeightage.update({
            where: query,
            data
        })
    },
    delete: async(query) => {
        return await prisma.taskWeightage.delete({
            where: query
        })
    }
}
export default taskWeightageServices