import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const leadInventoryItemServices = {
    create: async(data) => {
        return await prisma.leadInventoryItem.create({ data });
    },
    findOne: async(query) => {
        return await prisma.leadInventoryItem.findFirst({ where: query })
    },
    findAll: async(query) => {
        return await prisma.leadInventoryItem.findMany({
            where: query
        })
    },
    update: async(query, data) => {
        return await prisma.leadInventoryItem.update({
            where: query,
            data
        })
    },
    delete: async(query) => {
        return await prisma.leadInventoryItem.delete({
            where: query
        })
    }
}
export default leadInventoryItemServices