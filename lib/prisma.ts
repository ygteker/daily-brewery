import { PrismaClient } from '@prisma/client';

const prismaClientSingletion = () => {
  return new PrismaClient();
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingletion>;
}

export const prisma = global.prisma ?? prismaClientSingletion();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}
