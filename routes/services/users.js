import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const userServices = {
  create: async (data) => {
    return await prisma.user.create({ data });
  },
  findOne:async(query)=>{
    return await prisma.user.findFirst({where:query})
  },
  findAll:async(query)=>{
    return await prisma.user.findMany({where:query})
  }
};

export default userServices;
