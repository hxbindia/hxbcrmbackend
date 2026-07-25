import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const notificationLogServices = {
    create: async(data) => {
        return await prisma.notificationLog.create({ data });
    },
    findOne: async(query) => {
        return await prisma.notificationLog.findFirst({ where: query })
    },
    findAll: async(query) => {
        return await prisma.notificationLog.findMany({
            where: query
        })
    },
    update: async(query, data) => {
        return await prisma.notificationLog.update({
            where: query,
            data
        })
    },
    delete: async(query) => {
        return await prisma.notificationLog.delete({
            where: query
        })
    }
}
export default notificationLogServices