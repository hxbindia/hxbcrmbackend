import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()


export async function seedDefaultTaskStatuses(organisationId) {



    await prisma.taskStatus.createMany({
        data: [
            { organisationId, name: "Pending", order: 1, isDefault: true },
            { organisationId, name: "In Progress", order: 2 },
            { organisationId, name: "Completed", order: 3, isCompleted: true },
            { organisationId, name: "Deleted", order: 4 },
        ]
    });
}