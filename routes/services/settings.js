import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const settingsServices = {
    create: async(data) => {
        return await prisma.settings.create({ data });
    },
    findOne: async(query) => {
        return await prisma.settings.findFirst({ where: query })
    },
    findAll: async(query) => {
        return await prisma.settings.findMany({
            where: query
        })
    },
    update: async(query, data) => {
        return await prisma.settings.update({
            where: query,
            data
        })
    },
    delete: async(query) => {
        return await prisma.settings.delete({
            where: query
        })
    }
}
export default settingsServices