import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const permissionServices = {
    create: async(data) => {
        return await prisma.permission.create({ data });
    },
    findOne: async(query) => {
        return await prisma.permission.findFirst({ where: query })
    },
    findAll: async(query) => {
        return await prisma.permission.findMany({
            where: query
        })
    },
    update: async(query, data) => {
        return await prisma.permission.update({
            where: query,
            data
        })
    },
    delete: async(query) => {
        return await prisma.permission.delete({
            where: query
        })
    }
}
export default permissionServices