import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const taskServices = {
  create: async (data) => {
    return await prisma.task.create({ data });
  },
  findOne:async(query)=>{
    return await prisma.task.findFirst({where:query})
  },
  findAll:async(query)=>{
    return await prisma.task.findMany({where:query})
  }
};

export default taskServices;
