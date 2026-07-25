import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const leadStatusServices = {
    create: async(data) => {
        return await prisma.leadStatus.create({ data });
    },
    findOne: async(query) => {
        return await prisma.leadStatus.findFirst({ where: query })
    },
    findAll: async(query) => {
        return await prisma.leadStatus.findMany({
            where: query
        })
    },
    update: async(query, data) => {
        return await prisma.leadStatus.update({
            where: query,
            data
        })
    },
    delete: async(query) => {
        return await prisma.leadStatus.delete({
            where: query
        })
    }
}
export default leadStatusServices