import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const roleServices = {
    create: async(data) => {
        return await prisma.role.create({ data });
    },
    findOne: async(query) => {
        return await prisma.role.findFirst({ where: query })
    },
    findAll: async(query) => {
        return await prisma.role.findMany({
            where: query
        })
    },
    update: async(query, data) => {
        return await prisma.role.update({
            where: query,
            data
        })
    },
    delete: async(query) => {
        return await prisma.role.delete({
            where: query
        })
    }
}
export default roleServices