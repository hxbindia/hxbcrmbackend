import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const leadServices = {
    create: async(data) => {
        return await prisma.lead.create({ data });
    },
    findOne: async(query) => {
        return await prisma.lead.findFirst({ where: query })
    },
    findAll: async(query) => {
        return await prisma.lead.findMany({
            where: query
        })
    },
    update: async(query, data) => {
        return await prisma.lead.update({
            where: query,
            data
        })
    },
    delete: async(query) => {
        return await prisma.lead.delete({
            where: query
        })
    }
}
export default leadServices