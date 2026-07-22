import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const organisationServices = {
  create: async (data) => {
    return await prisma.$transaction(async (tx) => {
    
        const existingOrg = await tx.organisation.findFirst({
          where: {
            name: data.organisationName,
          },
        });
        if (existingOrg) {
          throw new Error("Organisation name already registered");
        }
        const organisation = await tx.organisation.create({
          data: {
            name: data.organisationName,
          },
        });
        delete data.organisationName
        data.organisationId= organisation.id
        const user = await tx.user.create({data});
        return user
      
    });
  },
  findOne: async (query) => {
    return await prisma.organisation.findFirst({ where: query });
  },
};

export default organisationServices;
