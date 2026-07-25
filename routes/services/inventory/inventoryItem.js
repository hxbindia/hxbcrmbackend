import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const inventoryItemServices = {
    create: async(data) => {
        return await prisma.inventoryItem.create({ data });
    },
    findOne: async(query) => {
        return await prisma.inventoryItem.findFirst({ where: query })
    },
    findAll: async(query) => {
        return await prisma.inventoryItem.findMany({
            where: query
        })
    },
    update: async(query, data) => {
        return await prisma.inventoryItem.update({
            where: query,
            data
        })
    },
    delete: async(query) => {
        return await prisma.inventoryItem.delete({
            where: query
        })
    }
}
export default inventoryItemServices