import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const taskNotificationSettingServices = {
    create: async(data) => {
        return await prisma.taskNotificationSetting.create({ data });
    },
    findOne: async(query) => {
        return await prisma.taskNotificationSetting.findFirst({ where: query })
    },
    findAll: async(query) => {
        return await prisma.taskNotificationSetting.findMany({
            where: query
        })
    },
    update: async(query, data) => {
        return await prisma.taskNotificationSetting.update({
            where: query,
            data
        })
    },
    delete: async(query) => {
        return await prisma.taskNotificationSetting.delete({
            where: query
        })
    }
}
export default taskNotificationSettingServices