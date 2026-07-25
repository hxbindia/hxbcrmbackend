import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const taskServices = {
    create: async(data) => {
        return await prisma.task.create({ data });
    },
    findOne: async(query) => {
        return await prisma.task.findFirst({ where: query })
    },
    findAll: async({ assigneeId, organisationId, search = "", status = "all" }) => {

        const where = {
            organisationId,
            ...(assigneeId && {
                assignees: {
                    some: {
                        userId: assigneeId
                    }
                }
            }),
            ...(status !== "all" && {
                statusId: status // pass the TaskStatus id here, not a string like "pending"
            }),
            ...(search && {
                OR: [
                    { title: { contains: search } },
                    { description: { contains: search } }
                ]
            })
        };

        return await prisma.task.findMany({
            where,
            include: {
                assignees: { include: { user: true } },
                status: true,
                priority: true,
                weightage: true,
                lead: true,
            },
            orderBy: {
                createdAt: "desc"
            }
        });
    }
};
export default taskServices;