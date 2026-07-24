import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const taskServices = {
  create: async (data) => {
    return await prisma.task.create({ data });
  },
  findOne:async(query)=>{
    return await prisma.task.findFirst({where:query})
  },
   findAll: async ({ assignedTo, organisationId, search = "", status = "all" }) => {

    const where = {
      assignedTo,
      organisationId,
      ...(status !== "all" && {
        status
      }),
      ...(search && {
        OR: [
          {
            title: {
              contains: search,
            
            }
          },
          {
            description: {
              contains: search,
           
            }
          }
        ]
      })
    };
    // console.log(where,'=====>where')

    return await prisma.task.findMany({
      where,
      orderBy: {
        createdAt: "desc"
      }
    });
  }
};
export default taskServices;
