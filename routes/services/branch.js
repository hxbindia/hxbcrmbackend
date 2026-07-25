import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const branchServices = {
    create: async(data) => {
        return await prisma.branch.create({ data });
    },
    findOne: async(query) => {
        return await prisma.branch.findFirst({ where: query })
    },
    findAll: async(query) => {
        return await prisma.branch.findMany({
            where: query
        })
    },
    update: async(query, data) => {
        return await prisma.branch.update({
            where: query,
            data
        })
    },
    delete: async(query) => {
        return await prisma.branch.delete({
            where: query
        })
    }
}
export default branchServices