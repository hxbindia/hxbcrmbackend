import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const inventoryCategoryServices = {
    create: async(data) => {
        return await prisma.inventoryCategory.create({ data });
    },
    findOne: async(query) => {
        return await prisma.inventoryCategory.findFirst({ where: query })
    },
    findAll: async(query) => {
        return await prisma.inventoryCategory.findMany({
            where: query
        })
    },
    update: async(query, data) => {
        return await prisma.inventoryCategory.update({
            where: query,
            data
        })
    },
    delete: async(query) => {
        return await prisma.inventoryCategory.delete({
            where: query
        })
    }
}
export default inventoryCategoryServices