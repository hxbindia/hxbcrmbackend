import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const leadSourceServices = {
    create: async(data) => {
        return await prisma.leadSource.create({ data });
    },
    findOne: async(query) => {
        return await prisma.leadSource.findFirst({ where: query })
    },
    findAll: async(query) => {
        return await prisma.leadSource.findMany({
            where: query
        })
    },
    update: async(query, data) => {
        return await prisma.leadSource.update({
            where: query,
            data
        })
    },
    delete: async(query) => {
        return await prisma.leadSource.delete({
            where: query
        })
    }
}
export default leadSourceServices