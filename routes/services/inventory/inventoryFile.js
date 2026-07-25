import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const inventoryFileServices = {
    create: async(data) => {
        return await prisma.inventoryFile.create({ data });
    },
    findOne: async(query) => {
        return await prisma.inventoryFile.findFirst({ where: query })
    },
    findAll: async(query) => {
        return await prisma.inventoryFile.findMany({
            where: query
        })
    },
    update: async(query, data) => {
        return await prisma.inventoryFile.update({
            where: query,
            data
        })
    },
    delete: async(query) => {
        return await prisma.inventoryFile.delete({
            where: query
        })
    }
}
export default inventoryFileServices