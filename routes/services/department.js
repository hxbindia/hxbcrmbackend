import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const departmentServices = {
    create: async(data) => {
        return await prisma.department.create({ data });
    },
    findOne: async(query) => {
        return await prisma.department.findFirst({ where: query })
    },
    findAll: async(query) => {
        return await prisma.department.findMany({
            where: query
        })
    },
    update: async(query, data) => {
        return await prisma.department.update({
            where: query,
            data
        })
    },
    delete: async(query) => {
        return await prisma.department.delete({
            where: query
        })
    }
}
export default departmentServices