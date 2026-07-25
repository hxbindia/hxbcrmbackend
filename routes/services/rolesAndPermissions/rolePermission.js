import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const rolePermissionServices = {
    create: async(data) => {
        return await prisma.rolePermission.create({ data });
    },
    findOne: async(query) => {
        return await prisma.rolePermission.findFirst({ where: query })
    },
    findAll: async(query) => {
        return await prisma.rolePermission.findMany({
            where: query
        })
    },
    update: async(query, data) => {
        return await prisma.rolePermission.update({
            where: query,
            data
        })
    },
    delete: async(query) => {
        return await prisma.rolePermission.delete({
            where: query
        })
    }
}
export default rolePermissionServices